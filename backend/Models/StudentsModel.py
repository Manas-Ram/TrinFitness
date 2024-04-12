import sqlite3
import random

class student:
    def __init__(self, db_name):
        self.db_name =  db_name
        self.table_name = "students"

    def initialize_students_table(self):
        db_connection=sqlite3.connect(self.db_name)
        cursor = db_connection.cursor()
        schema=f"""
                CREATE TABLE {self.table_name} (
                    id INTEGER PRIMARY KEY UNIQUE,
                    email TEXT UNIQUE,
                    studentname TEXT UNIQUE,
                    password TEXT

                )
                """
        cursor.execute(f"DROP TABLE IF EXISTS {self.table_name};")
        results=cursor.execute(schema)
        db_connection.close()
    


    def create_student(self, student_details):
        try: 
            db_connection = sqlite3.connect(self.db_name)
            cursor = db_connection.cursor()




            student_id = random.randint(0, 92233720368547) #non-negative range of SQLITE3 INTEGER
            # check to see if exists already!!\





            student_data = (student_id, student_details["email"], student_details["studentname"], student_details["password"])
            #are you sure you have all data in the correct format?
            

            student_data_final = self.to_dict(student_data)

            if "@" not in student_data_final["email"] or student_data_final["email"][len(student_data_final["email"])-4] != "." or "!" in student_data_final["studentname"] or "@" in student_data_final["studentname"]:
                return {"result":"error", "message":"Incorrect Details"}
            

            

            cursor.execute(f"INSERT INTO {self.table_name} VALUES (?, ?, ?, ?);", student_data)
            db_connection.commit()

            students = cursor.fetchall()

            print(student_data)


            return {"result": "success",
                    "message": student_data_final
                    

                  

                    
                    }

        
        except sqlite3.Error as error:
            return {"result":"error",
                    "message":error}
        
        finally:
            db_connection.close()

    def exists(self, studentname = None, id = None):
       
        db_connection = sqlite3.connect(self.db_name)
        cursor = db_connection.cursor()

        try:
            if studentname:
                cursor.execute(f"SELECT * FROM {self.table_name} WHERE studentname = ?", (studentname,))

            elif id:
                cursor.execute(f"SELECT * FROM {self.table_name} WHERE id = ?", (id,))

            student = cursor.fetchone()
            if student:
                return {"result": "success", "message": True}
            else:
                return {"result":"success", "message": False}
        
        except sqlite3.Error as error:
            return {"result":"error",
                    "message":error}

            
        finally:

            db_connection.close()





        


                
        


    
    
    def get_student(self, studentname=None, id=None):
        if self.exists(studentname,id)["message"] == False:
            return {"result": "error", "message": {}}
        db_connection = sqlite3.connect(self.db_name)
        cursor = db_connection.cursor()


        try: 





            if studentname:
                cursor.execute(f"SELECT * FROM {self.table_name} WHERE studentname = ?", (studentname,))

            elif id:
                cursor.execute(f"SELECT * FROM {self.table_name} WHERE id = ?", (id,))


            student = cursor.fetchone()

            return {"result":"success", "message": self.to_dict(student)}
  
        except sqlite3.Error as error:
            return {"result":"error",
                    "message":error}
        finally:
            db_connection.close()


    def to_dict(self, student_tuple):

        return {

            "id":student_tuple[0],
            "email":student_tuple[1],
            "studentname":student_tuple[2],
            "password":student_tuple[3],


        }


  

    def remove_student(self, studentname=None):
            student_data_final = self.get_student(studentname,id)
            if student_data_final["result"] == "error":
                return {"result": "error", "message": {}}
            try:
                db_connection = sqlite3.connect(self.db_name)
                cursor = db_connection.cursor()
                if studentname:
                    cursor.execute(f"DELETE FROM {self.table_name} WHERE studentname = ?", (studentname,))
                
                db_connection.commit()
                return {"result": "success", "message": student_data_final["message"]}
            
            except sqlite3.Error as error:
                return {"result": "error", "message": str(error)}
            
            finally:
                db_connection.close()
        

    
    def get_students(self):

        try:
            db_connection = sqlite3.connect(self.db_name)
            cursor = db_connection.cursor()

            


            cursor.execute( f"SELECT * FROM {self.table_name} ")
            students = cursor.fetchall()

            if students == []:
                return {"result":"success", "message": []}

            return{"result": "success", "message":[self.to_dict(student) for student in students]}
        
        except sqlite3.Error as error:
            return {"result": "error", "message" : str(error)}
        finally:
            db_connection.close()

    def update_student(self, student_data):
        if self.exists( id = student_data["id"])["message"] == False:
            return {"result": "error", "message": {}}

        """""
        if "id" not in student_data or "studentname" not in student_data or "email" not in student_data or "password" not in student_data:
            return {"result": "error", "message": "One or more necessary student details does not exist"}
        """
        try:
            db_connection = sqlite3.connect(self.db_name)
            cursor = db_connection.cursor()
            cursor.execute(f"UPDATE students SET email=?, studentname=?, password=? WHERE id=?", (student_data["email"], student_data["studentname"], student_data["password"], student_data["id"]))
            db_connection.commit()

            
            return {"result": "success", "message": student_data}
        
        
        finally:
            db_connection.close()

