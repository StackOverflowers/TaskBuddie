const express = require("express");
const router = express.Router();
const BoardController = require("../controllers/board");
const multiparty = require("connect-multiparty");
const mult = multiparty();

router.post("/registerBoard", BoardController.registerBoard);
router.get("/listBoard", BoardController.listBoard);
router.put("/addMember", BoardController.addMember);
router.put("/deleteMember", BoardController.deleteMember);
router.delete("/deleteTask/:_id", BoardController.deleteBoard);

module.exports = router;
