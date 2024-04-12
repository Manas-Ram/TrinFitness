from flask import jsonify
import json
from flask import request
import os
from Models.ProspectsModel import prospect
import sys

yahtzee_db_name=f"{os.getcwd()}/Models/yahtzeeDB.db"
prospects = prospect(yahtzee_db_name)


def first():
    if request.method == "GET":
        prospect = prospects.get_prospects()
        return prospect['message']
    
    elif request.method == "POST":
        content_type = request.headers.get('Content-Type')
        if content_type == 'application/json':
            details = request.json
            prospect = prospects.create_prospect(details)
            return jsonify(prospect["message"])
        else:
            return {}
    else:
        return {"error:" "Invalid request"}

def second(prospect_name):
    if request.method == "GET":
        prospect = prospects.get_prospect(prospect_name)
        if prospect["message"] == {}:
            return {}
        return jsonify(prospect["message"])
    
    elif request.method == "PUT":
        details = request.json
        prospect = prospects.update_prospect(details)
        if prospect["message"] == {}:
            return {}
        return jsonify(prospect["message"])

    elif request.method == "DELETE":
        prospect = prospects.remove_prospect(prospectname = prospect_name)
        if prospect["message"] == {}:
            return {}
        return jsonify(prospect["message"])
    else:
        return {"error:" "no request"}