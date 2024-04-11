import sqlite3
import random

class prospect:
    def __init__(self, db_name):
        self.db_name =  db_name
        self.table_name = "prospects"

    def initialize_prospects_table(self):
        db_connection=sqlite3.connect(self.db_name)
        cursor = db_connection.cursor()
        schema=f"""
                CREATE TABLE {self.table_name} (
                    id INTEGER PRIMARY KEY UNIQUE,
                    email TEXT UNIQUE,
                    prospectname TEXT UNIQUE,
                    password TEXT

                )
                """
        cursor.execute(f"DROP TABLE IF EXISTS {self.table_name};")
        results=cursor.execute(schema)
        db_connection.close()
    


    def create_prospect(self, prospect_details):
        try: 
            db_connection = sqlite3.connect(self.db_name)
            cursor = db_connection.cursor()




            prospect_id = random.randint(0, 92233720368547) #non-negative range of SQLITE3 INTEGER
            # check to see if exists already!!\





            prospect_data = (prospect_id, prospect_details["email"], prospect_details["prospectname"], prospect_details["password"])
            #are you sure you have all data in the correct format?
            

            prospect_data_final = self.to_dict(prospect_data)

            if "@" not in prospect_data_final["email"] or prospect_data_final["email"][len(prospect_data_final["email"])-4] != "." or "!" in prospect_data_final["prospectname"] or "@" in prospect_data_final["prospectname"]:
                return {"result":"error", "message":"Incorrect Details"}
            

            

            cursor.execute(f"INSERT INTO {self.table_name} VALUES (?, ?, ?, ?);", prospect_data)
            db_connection.commit()

            prospects = cursor.fetchall()

            print(prospect_data)


            return {"result": "success",
                    "message": prospect_data_final
                    

                  

                    
                    }

        
        except sqlite3.Error as error:
            return {"result":"error",
                    "message":error}
        
        finally:
            db_connection.close()

    def exists(self, prospectname = None, id = None):
       
        db_connection = sqlite3.connect(self.db_name)
        cursor = db_connection.cursor()

        try:
            if prospectname:
                cursor.execute(f"SELECT * FROM {self.table_name} WHERE prospectname = ?", (prospectname,))

            elif id:
                cursor.execute(f"SELECT * FROM {self.table_name} WHERE id = ?", (id,))

            prospect = cursor.fetchone()
            if prospect:
                return {"result": "success", "message": True}
            else:
                return {"result":"success", "message": False}
        
        except sqlite3.Error as error:
            return {"result":"error",
                    "message":error}

            
        finally:

            db_connection.close()





        


                
        


    
    
    def get_prospect(self, prospectname=None, id=None):
        if self.exists(prospectname,id)["message"] == False:
            return {"result": "error", "message": {}}
        db_connection = sqlite3.connect(self.db_name)
        cursor = db_connection.cursor()


        try: 





            if prospectname:
                cursor.execute(f"SELECT * FROM {self.table_name} WHERE prospectname = ?", (prospectname,))

            elif id:
                cursor.execute(f"SELECT * FROM {self.table_name} WHERE id = ?", (id,))


            prospect = cursor.fetchone()

            return {"result":"success", "message": self.to_dict(prospect)}
  
        except sqlite3.Error as error:
            return {"result":"error",
                    "message":error}
        finally:
            db_connection.close()


    def to_dict(self, prospect_tuple):

        return {

            "id":prospect_tuple[0],
            "email":prospect_tuple[1],
            "prospectname":prospect_tuple[2],
            "password":prospect_tuple[3],


        }


  

    def remove_prospect(self, prospectname=None):
            prospect_data_final = self.get_prospect(prospectname,id)
            if prospect_data_final["result"] == "error":
                return {"result": "error", "message": {}}
            try:
                db_connection = sqlite3.connect(self.db_name)
                cursor = db_connection.cursor()
                if prospectname:
                    cursor.execute(f"DELETE FROM {self.table_name} WHERE prospectname = ?", (prospectname,))
                
                db_connection.commit()
                return {"result": "success", "message": prospect_data_final["message"]}
            
            except sqlite3.Error as error:
                return {"result": "error", "message": str(error)}
            
            finally:
                db_connection.close()
        

    
    def get_prospects(self):

        try:
            db_connection = sqlite3.connect(self.db_name)
            cursor = db_connection.cursor()

            


            cursor.execute( f"SELECT * FROM {self.table_name} ")
            prospects = cursor.fetchall()

            if prospects == []:
                return {"result":"success", "message": []}

            return{"result": "success", "message":[self.to_dict(prospect) for prospect in prospects]}
        
        except sqlite3.Error as error:
            return {"result": "error", "message" : str(error)}
        finally:
            db_connection.close()

    def update_prospect(self, prospect_data):
        if self.exists( id = prospect_data["id"])["message"] == False:
            return {"result": "error", "message": {}}

        """""
        if "id" not in prospect_data or "prospectname" not in prospect_data or "email" not in prospect_data or "password" not in prospect_data:
            return {"result": "error", "message": "One or more necessary prospect details does not exist"}
        """
        try:
            db_connection = sqlite3.connect(self.db_name)
            cursor = db_connection.cursor()
            cursor.execute(f"UPDATE prospects SET email=?, prospectname=?, password=? WHERE id=?", (prospect_data["email"], prospect_data["prospectname"], prospect_data["password"], prospect_data["id"]))
            db_connection.commit()

            
            return {"result": "success", "message": prospect_data}
        
        
        finally:
            db_connection.close()

