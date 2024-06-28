const ItemView = require("../views/ItemView");
const ItemModel = require("../models/ItemModel");

class ItemController {
  view;
  model;

  constructor() {
    this.view = new ItemView();
    this.model = new ItemModel();
  }

  getItems = (req, res) => {
    const item = this.model.getItems();
    const view = this.view.showItems(item);
    res.send(view);
  };

  addItem = (req, res) => {
    const item = req.body; // Getting the user input

    if (!item.name) {
      res.status(400).send(this.view.showError("Please enter the name")); // Validating the input
    } else if (!item.quantity) {
      res.status(400).send(this.view.showError("Please enter the quantity")); // Validating the input
    } else {
      item.id =
        "IT" +
        Math.round(Math.random() * 1000)
          .toString()
          .padStart(4, "0"); // Process the input
      // Assuming you want to save the item using the model and then respond
      // this.model.save(item, (err) => {
      //     if (err) {
      //         res.send(this.view.showError("Failed to add item"));
      //     } else {
      //         res.send(this.view.showSuccess("Item added successfully"));
      //     }
      // });
      this.model.addItem(item); // Pass to the model
      const items = this.model.getItems();
      const view = this.view.addedItem(item);
      res.status(201).send(view);

      // Process input
      // Pass the processed input to the model and/or get from the model
      // Generate the view
      // Send the view as a response to the client
    }
  };

  deleteItem = (req, res) => {
    const item = req.body;

    if (!item.id) {
      const view = this.view.showError("Please enter the item 'id' ");
      return res.status(400).send(view);
    }

    const exists = this.model.getItem(item.id);

    if (!exists) {
      const view = this.view.showError("Please enter a valid item 'id' ");
      return res.status(400).send(view);
    }

    const deleted = this.model.deleteItem(item.id);

    if (deleted) {
      const view = this.view.deleteItem();
      res.send(view);
    } else {
      const view = this.view.showError("Item could not be deleted");
      res.status(500).send(view);
    }
  };

  getItem = (req, res) => {
    const itemId = req.params.id;

    if (!itemId) {
      const view = this.view.showError("Please enter the item 'id' ");
      return res.status(200).send(view);
    }

    const exists = this.model.getItem(itemId);

    if(!exists) {
      const view = this.view.showError("Please enter a valid item 'id' ")
      return res.status(400).send(view);
    }
    const Item = this.model.getItem(itemId);

    if (Item) {
      const view = this.view.showItem(Item);
      res.send(view);
    } else {
      const view = this.view.showError("Item could not be viewed")
      res.status(500).send(view);
    }
 };

  updateItem = (req, res) => {
    const item = req.body;

    if (!item.id) {
      const view = this.view.showError("Please enter the item 'id'");
      return res.status(400).send(view);
    }

    const exists = this.model.getItem(item.id);

    if (!exists) {
      const view = this.view.showError("Please enter a valid item 'id'");
      return res.status(400).send(view);
    }

    if (!item.name && !item.quantity) {
      const view = this.view.showError(
        "Please enter a new 'quantity' or 'name'"
      );
      return res.status(400).send(view);
    }

    const newItem = {};

    if (item.quantity) {
      newItem.quantity = item.quantity;
    }

    if (item.name) {
      newItem.name = item.name;
    }

    this.model.updateItem(item.id, newItem);

    const updatedItem = this.model.getItem(item.id);

    const view = this.view.updateItem(updatedItem);

    res.send(view);
  };
}

module.exports = ItemController;
