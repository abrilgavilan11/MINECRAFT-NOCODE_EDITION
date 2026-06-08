const express = require("express");
const router = express.Router();
const mobController = require("../controllers/mob.controller.js");
const { mobValidator } = require("../middlewares/validator.middleware.js");

router.get("/", mobController.getAllMobs);
router.get("/:id", mobController.getMobById);
router.post("/", mobValidator, mobController.createMob);
router.put("/:id", mobValidator, mobController.updateMob);
router.delete("/:id", mobController.deleteMob);

module.exports = router;