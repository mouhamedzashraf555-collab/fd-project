  import Flask, request
import sqlite3

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend running"

@app.route("/save", methods=["POST"])
def save():
    db = sqlite3.connect("project.db")
    db.execute("CREATE TABLE IF NOT EXISTS messages (info TEXT)")
    db.execute("INSERT INTO messages VALUES (?)", (request.json["info"],))
    db.commit()
    return "Saved"

app.run()
