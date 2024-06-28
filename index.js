const express = require("express");
const ItemController = require("./controllers/ItemController");

const app = express()
const PORT = 4000;


app.use(express.json());

const itemcontroller = new ItemController();

// Web App Routes
app.get("/", (req, res) => {
res.sendFile(__dirname + "/public/index.html");
});


// REST API Routes

app.get("/items", itemcontroller.getItems);

app.get("/item/:id", itemcontroller.getItem);

app.post("/items", itemcontroller.addItem);

app.put("/items", itemcontroller.updateItem);

app.delete("/items", itemcontroller.deleteItem);

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);

});