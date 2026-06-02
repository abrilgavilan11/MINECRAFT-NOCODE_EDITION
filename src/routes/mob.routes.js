const express = require("express");
const router = express.Router();

const mobController = require("../controllers/mob.controller.js");

router.get("/", mobController.getAllMobs);
router.get("/:id", mobController.getMobById);
router.post("/", mobController.createMob);
router.put("/:id", mobController.updateMob);
router.delete("/:id", mobController.deleteMob);

module.exports = router;
