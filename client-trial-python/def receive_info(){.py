import string
import requests
import json
import mysql.connector
def receive_info():
    a =input("Pls enter the desired security:")
    while True:
        try:
            b =int(input("Pls enter the price:"))
            break;
        except ValueError:
            print("price must be a number")
            continue
            
    while True:
        try:
            c =int(input("Please enter Quantity:"))
            break;
        except ValueError:
            print("Quantity must be a number")
            continue 
    while True:
        d = (input("Pls enter buy or sell:")).lower()
        if d!="buy" and d!="sell":
            print("Please type buy or sell")
        else:
            break; 
    while True:
        e =input("Would you like to add or delete:").lower()
        if e!="add" and e!="delete":
            print("Please type add or delete")
        else:
            break;  
    

    summary={"security":a,"qty":b,"price":c, "side":d, "operation":e}
    return summary

info=receive_info()
print(info)
result=json.dumps(info)
url='http://127.0.0.1:8081'
requests.post(url,json=result)



'''mycursor = mydb.cursor()
mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  password="yourpassword",
  database="mydatabase"
)
sql = "(security,qty,price,side,operation ) VALUES (%s,%i,%i,%s, %s)"
val=[info["security"],info["qty"],info["price"],info["side"],info["operation"]]'''



