from flask import Flask, render_template, jsonify
import sqlite3 

app = Flask(__name__)

DATABASE = 'app.db'

def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row  
    return db

@app.route('/api/students')
def get_students():
    # Assuming you have a function to get students from your database
    students = get_db_students()  
    return jsonify(students)

# Function to fetch students from the database
def get_db_students():
    db = get_db()
    students = db.execute('SELECT * FROM Students').fetchall()
    db.close()
    # Convert the rows to a list of dicts to jsonify
    return [dict(row) for row in students]

if __name__ == '__main__':
    app.run(debug=True)

