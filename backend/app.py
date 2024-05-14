import os
import re
import json
import uuid
import boto3
import requests
import psycopg2


from groq import Groq
from io import BytesIO
from psycopg2 import pool
from flask_cors import CORS
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from botocore.client import Config
from werkzeug.security import generate_password_hash, check_password_hash


load_dotenv()
app = Flask(__name__)
CORS(app)

#CONFIG
BUCKET = "demo"
ALLOWED_EXTENSIONS = {"pas", "dfm", "cob", "cbl", "vb", "vbs"}
DATABASE_URL = "postgres://default:xr4Mlmbi8RzI@ep-autumn-sea-a1loat7s.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require"
ACCOUNTID = os.environ["ACCOUNTID"]
CLIENTACCESSKEY = os.environ["CLIENTACCESSKEY"]
CLIENTSECRET = os.environ["CLIENTSECRET"]
CONNECTIONURL = f"https://{ACCOUNTID}.r2.cloudflarestorage.com"


conn = psycopg2.connect(DATABASE_URL, sslmode="require")
connection_pool = pool.SimpleConnectionPool(
    1, 10, DATABASE_URL, sslmode="require")
client = Groq(
    api_key=os.environ["MISTRAL_API_KEY"],
)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_to_r2(filename, filecontent):
    s3 = boto3.client(
    service_name ='s3',
    endpoint_url=CONNECTIONURL,
    aws_access_key_id=CLIENTACCESSKEY,
    aws_secret_access_key=CLIENTSECRET,
    region_name='us-east-1'
)
    UploadObject = filecontent
    UploadObjectBytes = UploadObject.encode('utf-8')
    UploadObjectFile = BytesIO(UploadObjectBytes)
    try:
        s3.upload_fileobj(UploadObjectFile, Bucket="demo", Key=f"{filename}.json")
        return True
    except:
        return False


@app.route("/", methods=["GET"])
def home():
    con_id = str(uuid.uuid4())
    return "Running on Python with Postgres ", 200


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"status": 400, "error": "Email and password are required"}, 200

    hashed_password = generate_password_hash(password)

    conn = connection_pool.getconn()
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO users (email, password) VALUES (%s, %s) RETURNING id",
            (email, hashed_password),
        )
        user_id = cur.fetchone()[0]
    conn.commit()
    connection_pool.putconn(conn)

    return {"status": 200, "email": email, "id": user_id, "message": "User created successfully"}, 200


@app.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"status": 400, "error": "Email and password are required"}, 200

    conn = connection_pool.getconn()
    with conn.cursor() as cur:
        cur.execute(
            "SELECT id, password FROM users WHERE email = %s",
            (email,),
        )
        result = cur.fetchone()
        if result is None:
            return {"status": 400, "error": "User not found"}, 200

        user_id, hashed_password = result
        if not check_password_hash(hashed_password, password):
            return {"status": 400, "error": "Invalid password"}, 200
    connection_pool.putconn(conn)

    return {"status": 200, "email": email, "id": user_id, "message": "Signed in successfully"}, 200


@app.route("/convert", methods=["POST"])
def convert():
    if "file" not in request.files:
        return {"status": 400, "error": "No file part"}, 200

    file = request.files["file"]
    if file.filename == "":
        return {"status": 400, "error": "No selected file"}, 200

    if file and allowed_file(file.filename):
        code = file.read().decode("utf-8")
        from_code = request.form.get("from")
        to_code = request.form.get("to")
        user_id = request.form.get("userid")
        con_title = f"from {from_code} to {to_code} - {file.filename}"

        if not user_id:
            return {"status": 400, "error": "User ID is required"}, 200

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"""{code}
                    covert the above {from_code} program to {to_code}, give the code first and then documentations
                    """,
                }
            ],
            model="llama3-70b-8192",
        )

        con_id = str(uuid.uuid4())
        conn = connection_pool.getconn()
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO history (con_id, user_id, title) VALUES (%s, %s, %s)",
                (con_id, user_id, con_title),
            )
        conn.commit()
        connection_pool.putconn(conn)
        content = chat_completion.choices[0].message.content
        code_match = re.search(r"```(.*?)```", content, re.DOTALL)
        code = code_match.group(1).strip()
        lines = code.split('\n')
        lines = lines[1:]
        code = '\n'.join(lines)
        if upload_to_r2(filename=con_id,filecontent=code):
            return code, 200
        else:
            return {"status": 400, "error": "Invalid file extension"}, 400

    return {"status": 400, "error": "Invalid file extension"}, 400

@app.route("/chatid/get", methods=["GET"])
def get_chat_ids():
    user_id = request.args.get('userid')
    conn = connection_pool.getconn()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT con_id,title FROM history WHERE user_id = %s", (user_id,))
            records = cur.fetchall()
        conn.commit()
    except Exception as e:
        connection_pool.putconn(conn)
        return {"status": 500, "error": str(e)}, 200
    connection_pool.putconn(conn)
    return jsonify(records), 200

if __name__ == "__main__":
    app.run(debug=True)