from flask import Flask, render_template, jsonify
import sqlite3 

app = Flask(__name__)

DATABASE = 'app.db'

def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row  
    return db

@app.route('/students')
def get_students():
    db = get_db()
    students = db.execute('SELECT * FROM Students').fetchall()
    db.close()
    return render_template('students.html', students=students)

if __name__ == '__main__':
    app.run(debug=True)

