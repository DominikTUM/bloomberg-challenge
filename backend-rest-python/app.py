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
        password = "root",
        database="test_db"
    )
    # Creating an instance of 'cursor' class
    # which is used to execute the 'SQL'
    # statements in 'Python'
    cursor = mydb.cursor()
    # Show database
    cursor.execute("SELECT * FROM `Bookkeeping` Where OrderID=" + str(orderID))
    result = cursor.fetchone();
    return processOrder(cursor, mydb, result)
def processOrder(cursor, mydb, orderResult):
    if (orderResult[4] == "add"):
        security = orderResult[1]
        side = orderResult[5]
        orderID = orderResult[0]
        sellingOrderID = None
        buyingOrderID = None
        if (side == "buy"):
            buyingOrderID = orderID
            buyingPrice = orderResult[3]
            buyingQty = orderResult[2]
            buyerID = orderResult[6]
            # find matching seller
            cursor.execute("SELECT * FROM Exchange WHERE Security='" + str(security) + "' AND Side='sell' AND Price<=" + str(buyingPrice) + " ORDER BY ExchangeID asc LIMIT 1")
            result = cursor.fetchone();
            if (result == None):
                #if no seller found, save entry into exchange table
                sqlStatement = "INSERT INTO Exchange (Security, UserID, Price, Qty, Side) VALUES('" + str(security) + "', " + str(
                        buyerID) + ", " + str(buyingPrice) + ", " + str(buyingQty) + ", 'buy')"
                print(sqlStatement)
                cursor.execute(sqlStatement)
                mydb.commit()
                cursor.close()
                return "Looking for sellers"
            sellingPrice = result[3]
            sellingQty = result[4]
            exchangeID = result[0]
            sellingOrderID = exchangeID
            sellerID = result[2]
        if (side == "sell"):
            sellingPrice = orderResult[3]
            sellingQty = orderResult[2]
            sellerID = orderResult[6]
            sellingOrderID = orderID
            cursor.execute("SELECT * FROM `Exchange` WHERE Security='" + str(security) + "' AND Side='buy' AND Price>=" + str(sellingPrice) + " ORDER BY ExchangeID asc LIMIT 1")
            result = cursor.fetchone();
            if (result == None):
                # if no buyer found, save entry into exchange table
                cursor.execute(
                    "INSERT INTO Exchange (Security, UserID, Price, Qty, Side) VALUES('" + str(security) + "', " + str(
                        sellerID) + ", " + str(sellingPrice) + ", " + str(sellingQty) + ", 'sell')")
                mydb.commit()
                cursor.close()
                return "Looking for buyers"
            buyingPrice = result[3]
            buyingQty = result[4]
            exchangeID = result[0]
            buyingOrderID = exchangeID
            buyerID = result[2]
        if (sellingQty < buyingQty):
            # seller sells everything
            cursor.execute(
                "INSERT INTO Matches (Security, Seller, SellerOrderID, Buyer, BuyerOrderID, Price, Qty) VALUES ('" + str(security) + "', " + str(sellerID) + ", " + str(sellingOrderID) + ", " + str(
                    buyerID) + ", " + str(buyingOrderID) + ", " + str(buyingPrice) + ", " + str(sellingQty) + ")")
            if side == "sell":
                # if calling order is sell, then order can be consumed and matched buy order must be reduced
                cursor.execute(
                    "UPDATE `Exchange` SET qty = " + str(buyingQty - sellingQty) + " WHERE ExchangeID = " + str(
                        exchangeID))
                mydb.commit()
            if side == "buy":
                # consumed the sell offer and continue
                cursor.execute("DELETE FROM `Exchange` WHERE ExchangeID =" + str(exchangeID))
                y = list(orderResult)
                y[2] = buyingQty - sellingQty
                orderResult = tuple(y)
                mydb.commit()
                return processOrder(cursor, mydb, orderResult)
        #Check if even or uneven match
        if (sellingQty == buyingQty):
            # seller and buyer match
            cursor.execute(
                "INSERT INTO Matches (Security, Seller, SellerOrderID, Buyer, BuyerOrderID, Price, Qty) VALUES('" + str(security) + "', " + str(
                    sellerID) + ", " + str(sellingOrderID) + ", " + str(buyerID) + ", " + str(buyingOrderID) + ", " + str(buyingPrice) + ", " + str(sellingQty) + ")")
            cursor.execute("DELETE FROM `Exchange` WHERE ExchangeID =" + str(exchangeID))
            mydb.commit()
        if (sellingQty > buyingQty):
            # buyer buys everything
            cursor.execute(
                "INSERT INTO Matches (Security, Seller, SellerOrderID, Buyer, BuyerOrderID, Price, Qty) VALUES('" + str(security) + "', " + str(
                    sellerID) + str(sellingOrderID) + ", " + str(buyerID) + ", " + str(buyingOrderID) + ", " + str(buyingPrice) + ", " + str(buyingQty) + ")")
            if side == "buy":
                # if calling order is buy, then order can be consumed and matched sell order must be reduced
                cursor.execute(
                    "UPDATE `Exchange` SET qty = " + str(sellingQty - buyingQty) + " WHERE ExchangeID = " + str(
                        exchangeID))
                mydb.commit()
            if side == "sell":
                #consumed the buy offer and continue
                cursor.execute("DELETE FROM `Exchange` WHERE ExchangeID =" + str(exchangeID))
                y = list(orderResult)
                y[2] = sellingQty - buyingQty
                orderResult = tuple(y)
                mydb.commit()
                return processOrder(cursor, mydb, orderResult)
    return "operation executed"
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8090) # This statement starts the server on your local machine.