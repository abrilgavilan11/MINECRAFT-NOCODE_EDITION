const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller.js");
const { itemValidator } = require("../middlewares/validator.middleware.js");

router.get("/", itemController.getAllItems);
router.get("/:id", itemController.getItemById);
router.post("/", itemValidator, itemController.createItem);
router.put("/:id", itemValidator, itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;