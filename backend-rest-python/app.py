from flask import Flask # importing the flask class
app = Flask(__name__) # creating an instance of the Flask class

@app.route('/') # The primary url for our application
def welcome():
    return "Welcome to SecEx!"

@app.route('/order/<orderID>') # The primary url for our application
def process(orderID): # This method returns 'Flask Dockerized', which is displayed in our browser.
    import mysql.connector
    mydb = mysql.connector.connect(
        host = "localhost",
        port = "3308",
        user = "root",
        password = "root"
    )
    # Creating an instance of 'cursor' class
    # which is used to execute the 'SQL'
    # statements in 'Python'
    cursor = mydb.cursor()
    # Show database
    cursor.execute("SELECT * FROM `Bookkeeping` Where OrderID=" + str(orderID))
    output = ""
    for x in cursor:
        output = output + str(x)
    if (cursor["task"] == "add"):
        security = cursor["security"]
        if (cursor["side"] == "buy"):
            buyingPrice = cursor["price"]
            buyingQty = cursor["qty"]
            buyingID = cursor["ExchangeID"]
            buyerID = cursor["userID"]
            # find matching seller
            cursor.execute("SELECT * FROM `Exchange` WHERE Security=" + str(security) + " AND Side='sell' AND Price<=" + str(buyingPrice) + "ORDER BY ExchangeID asc LIMIT 1")
            if (cursor == None):
                #if no seller found, save entry into exchange table
                cursor.execute(
                    "INSERT INTO 'Exchange' (Security, userID, price, qty, side) VALUES(" + str(security) + ", " + str(
                        buyerID) + ", " + str(buyingPrice) + ", " + str(buyingQty) + ", 'buy')")
                return
            sellingPrice = cursor["price"]
            sellingQty = cursor["qty"]
            sellingID = cursor["ExchangeID"]
            sellerID = cursor["userID"]
        if (cursor["side"] == "sell"):
            sellingPrice = cursor["price"]
            sellingQty = cursor["qty"]
            sellingID = cursor["ExchangeID"]
            sellerID = cursor["userID"]
            cursor.execute("SELECT * FROM `Exchange` WHERE Security=" + str(security) + " AND Side='sell' AND Price=>" + str(sellingPrice) + "ORDER BY ExchangeID asc LIMIT 1")
            if (cursor == None):
                # if no buyer found, save entry into exchange table
                cursor.execute(
                    "INSERT INTO 'Exchange' (Security, userID, price, qty, side) VALUES(" + str(security) + ", " + str(
                        sellerID) + ", " + str(sellingPrice) + ", " + str(sellingQty) + ", 'sell')")
                return
            buyingPrice = cursor["price"]
            buyingQty = cursor["qty"]
            security = cursor["security"]
            buyingID = cursor["ExchangeID"]
            buyerID = cursor["userID"]
        output = ""
        for x in cursor:
            output = output + str(x)
        newQty = sellingQty - buyingQty
        if (sellingQty < buyingQty):
            #seller sells everything
            cursor.execute("INSERT INTO 'Matches' (Security, Seller, Buyer, Price, Qty) VALUES(" + str(sellerID) + ", " + str(buyerID) + ", " + str(buyingPrice) + ", " + str(sellingQty) + ")")
            cursor.execute("DELETE FROM `Exchange` WHERE ExchangeID =" + str(sellingID))
            cursor.execute("UPDATE `Exchange` SET qty = " + str(buyingQty - sellingQty) + "WHERE userID = " + str(buyingID))
            # call function recurs to see, if rest can be also allocated
            return process(orderID)
        if (sellingQty == buyingQty):
            # seller and buyer match
            cursor.execute("INSERT INTO 'Matches' (Security, Seller, Buyer, Price, Qty) VALUES(" + str(sellerID) + ", " + str(buyerID) + ", " + str(buyingPrice) + ", " + str(sellingQty) + ")")
            cursor.execute("DELETE FROM `Exchange` WHERE ExchangeID =" + str(buyingID))
            cursor.execute("DELETE FROM `Exchange` WHERE ExchangeID =" + str(sellingID))
        if (sellingQty > buyingQty):
            # buyer buys everything
            cursor.execute("INSERT INTO 'Matches' (Security, Seller, Buyer, Price, Qty) VALUES(" + str(sellerID) + ", " + str(buyerID) + ", " + str(buyingPrice) + ", " + str(buyingQty) + ")")
            cursor.execute("DELETE FROM `Exchange` WHERE ExchangeID =" + str(buyingID))
            cursor.execute("UPDATE `Exchange` SET qty = " + str(sellingQty - buyingQty) + "WHERE userID = " + str(sellingID))
            #call function recurs to see, if rest can be also allocated
            return process(orderID)
    return "operation executed"
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8090) # This statement starts the server on your local machine.