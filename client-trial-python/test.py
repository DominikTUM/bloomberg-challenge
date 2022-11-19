import json
import requests
import random

a= ["IBM","Reply", "Bloomberg","Algorand"]
b=random.randint(10,30)
c=random.randint(1,10)
d=["buy","sell"]
e=["add","delete"]
result=json.dumps({"security":random.choice(a),"qty":b,"price":c, "side":random.choice(d), "operation":random.choice(e)})
print (result)
url='http://131.159.211.63:5500'
requests.post(url,json=result)