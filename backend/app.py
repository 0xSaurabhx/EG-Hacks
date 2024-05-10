import os
import uuid
from werkzeug.security import generate_password_hash,check_password_hash
import psycopg2
from psycopg2 import pool
from flask import Flask, request
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv


load_dotenv()
app = Flask(__name__)
CORS(app)

DATABASE_URL = "postgres://default:xr4Mlmbi8RzI@ep-autumn-sea-a1loat7s.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require"
conn = psycopg2.connect(DATABASE_URL, sslmode="require")
connection_pool = pool.SimpleConnectionPool(1, 10, DATABASE_URL, sslmode="require")

client = Groq(
    api_key=os.environ["MISTRAL_API_KEY"],
)


ALLOWED_EXTENSIONS = {"pas", "dfm", "cob", "cbl", "vb", "vbs"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/", methods=["GET"])
def home():
    con_id = str(uuid.uuid4())
    return "Running on Python with Postgres ",200


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
            "INSERT INTO users (email, password) VALUES (%s, %s)",
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


        if not user_id:
            return {"status": 400, "error": "User ID is required"}, 200
        
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"""{code}
                    covert the above {from_code} program to {to_code}
                    """,
                }
            ],
            model="mixtral-8x7b-32768",
        )

        con_id = str(uuid.uuid4())
        conn = connection_pool.getconn()
        with conn.cursor() as cur:
            cur.execute(
            "INSERT INTO history (con_id, user_id) VALUES (%s, %s)",
            (con_id, user_id),
            )
        conn.commit()
        connection_pool.putconn(conn)
        return chat_completion.choices[0].message.content, 200

    return {"status": 400, "error": "Invalid file extension"}, 400


if __name__ == "__main__":
    app.run(debug=True)
