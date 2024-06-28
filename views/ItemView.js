class ItemView {
  showItems(items) {
    return {
      success: true,
      message: "Query Success",
      data: items,
      error: false,
    };
  }

  showItem(item) {
    return {
      success: true,
      message: "Query Success",
      data: item,
      error: false,
    };
  }
  addedItem(item) {
    return {
      success: true,
      message: "Item has been added successfully",
      data: item,
      error: false,
    };
  }

  updateItem(item) {
    return {
      sucess: true,
      message: "Item has been updated successfully",
      data: item,
      error: false,
    };
  }

  deleteItem() {
    return {
      sucess: true,
      message: "Item has been deleted successfully",
      error: false,
    };
  }

  showError(errorMessage) {
    return {
      success: false,
      message: errorMessage,
      error: true,
    };
  }
}

module.exports = ItemView;
