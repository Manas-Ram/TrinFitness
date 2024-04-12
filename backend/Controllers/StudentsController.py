from flask import jsonify
import json
from flask import request
import os
from Models.StudentsModel import student
import sys

yahtzee_db_name=f"{os.getcwd()}/Models/yahtzeeDB.db"
students = student(yahtzee_db_name)


def first():
    if request.method == "GET":
        student = students.get_students()
        return student['message']
    
    elif request.method == "POST":
        content_type = request.headers.get('Content-Type')
        if content_type == 'application/json':
            details = request.json
            student = students.create_student(details)
            return jsonify(student["message"])
        else:
            return {}
    else:
        return {"error:" "Invalid request"}

def second(student_name):
    if request.method == "GET":
        student = students.get_student(student_name)
        if student["message"] == {}:
            return {}
        return jsonify(student["message"])
    
    elif request.method == "PUT":
        details = request.json
        student = students.update_student(details)
        if student["message"] == {}:
            return {}
        return jsonify(student["message"])

    elif request.method == "DELETE":
        student = students.remove_student(studentname = student_name)
        if student["message"] == {}:
            return {}
        return jsonify(student["message"])
    else:
        return {"error:" "no request"}