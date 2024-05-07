import os
from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATABASE_URL = "postgres://default:xr4Mlmbi8RzI@ep-autumn-sea-a1loat7s.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require"
conn = psycopg2.connect(DATABASE_URL, sslmode='require')


@app.route("/", methods=["GET"])
def home():
    return "Running on Python with Supabase"


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return {"status":400,"error": "Email and password are required"}, 200

    hashed_password = generate_password_hash(password)

    with conn.cursor() as cur:
        cur.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, hashed_password))
    conn.commit()

    return {"status":200, "email":email, "message": "User created successfully"}, 200


@app.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return {"status":400,"error": "Email and password are required"}, 200

    with conn.cursor() as cur:
        cur.execute("SELECT password FROM users WHERE email = %s", (email,))
        result = cur.fetchone()

    if result is None:
        return {"status":404,"error": "User not found"}, 200

    hashed_password = result[0]

    if not check_password_hash(hashed_password, password):
        return {"status":400,"error": "Invalid password"}, 200

    return {"status":200,"email":email,"message": "Signed in successfully"}, 200


if __name__ == '__main__':
    app.run(debug=False, port=8181)
