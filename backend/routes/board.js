const express = require("express");
const router = express.Router();
const BoardController = require("../controllers/board");
const multiparty = require("connect-multiparty");
const mult = multiparty();

router.post("/saveTask", BoardController.saveTask);
router.post("/saveTaskImg", mult, BoardController.saveTaskImg);
router.get("/listTask", BoardController.listTask);
router.put("/updateTask", BoardController.updateTask);
router.delete("/deleteTask/:_id", BoardController.deleteTask);

module.exports = router;
