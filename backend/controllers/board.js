const Board = require("../models/board");
const User = require("../models/user");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

// Registra board
const registerBoard = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete Data");

  let user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("User cannot find");

  let data = [];
  data.push({
    id: user._id,
    name: user.name,
    role: "Owner",
    ranking: "0",
  });

  let imageUrl = "";
  if (req.files.image) {
    if (req.files.image.type != null) {
      const url = req.protocol + "://" + req.get("host") + "/";
      const serverImg =
        "./uploads/" + moment().unix() + path.extname(req.files.image.path);
      fs.createReadStream(req.files.image.path).pipe(
        fs.createWriteStream(serverImg)
      );
      imageUrl =
        url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
    }
  }

  const board = new Board({
    userId: req.user._id,
    members: data,
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
    imageUrl: imageUrl,
  });

  let result = await board.save();
  if (!result) return res.status(400).send("Error registering board");
  return res.status(200).send({ result });
};

// Agrega miembro a un board específico ( recibe userId y boardId)
const addMember = async (req, res) => {
  if (!req.body.boardId || !req.body.userId)
    return res.status(400).send("Incomplete data");

  let user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("User doesn't exist");

  let member = await Board.findById(req.body.boardId);
  if (!member) return res.status(400).send("Board doesn't exist");

  if (member.userId.toString() !== req.user._id.toString())
    return res.status(400).send("You have no permisiion");

  let newMember = member.members;
  let data = {
    id: user._id,
    name: user.name,
    role: "Guest",
    ranking: "0",
  };

  for (var i = 0; i < newMember.length; i++) {
    if (newMember[i].id.toString() === user._id.toString()) {
      return res
        .status(400)
        .send("the user is currently a member of the board");
    }
  }

  newMember.push(data);
  let board = await Board.findByIdAndUpdate(req.body.boardId, {
    members: newMember,
  });

  if (!board) return res.status(400).send("Board not found");
  return res.status(200).send({ board });
};

// Borra un miembro de un board
const deleteMember = async (req, res) => {
  if (!req.body.boardId || !req.body.userId)
    return res.status(400).send("Incomplete data");

  let user = await User.findById(req.body.userId);
  z;
  if (!user) return res.status(400).send("User doesn't exist");

  let member = await Board.findById(req.body.boardId);
  if (!member) return res.status(400).send("Board doesn't exist");

  if (member.userId.toString() !== req.user._id.toString())
    return res.status(400).send("You have no permisiion");

  let delMember = member.members;

  for (var i = 0; i < delMember.length; i++) {
    if (delMember[i].id.toString() === user._id.toString()) {
      if (delMember[i].role === "Owner")
        return res.status(400).send("Cannot delete Owner");
      delMember.splice(i, 1);
    }
  }

  let board = await Board.findByIdAndUpdate(req.body.boardId, {
    members: delMember,
  });

  if (!board) return res.status(400).send("Board not found");
  return res.status(200).send("Member remove");
};

//Lista todos los board de un usuario en los que es propietario
const listBoard = async (req, res) => {
  let board = await Board.find({ userId: req.user._id });
  if (!board || board.length === 0)
    return res.status(400).send("You have no assigned tasks");
  return res.status(200).send({ board });
};

// Lista los board de un usuario en los que es invitado y porpietario
const listBoardMember = async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("User not found");

  let board = await Board.find({ "members.id": user._id });
  if (!board || board.length === 0)
    return res.status(400).send("You have no assigned tasks");
  return res.status(200).send({ board });
};

//Borra un board
const deleteBoard = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(400).send("Invalid id");

  let boardImg = await Board.findById(req.params._id);
  if (!boardImg) return res.status(400).send("Board not found");

  if (boardImg.userId.toString() !== req.user._id.toString())
    return res.status(400).send("You have no permisiion");

  boardImg = boardImg.imageUrl;
  boardImg = boardImg.split("/")[4];
  let serverImg = "./uploads/" + boardImg;

  let board = await Board.findByIdAndDelete(req.params._id);
  if (!board) return res.status(400).send("Board not found");

  try {
    fs.unlinkSync(serverImg);
  } catch (error) {
    console.log("Image no found in server");
  }
  return res.status(200).send({ message: "deleted board" });
};

//Actualiza un board
const updateBoard = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");

  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");

  const memberInfo = await Board.findById(req.body._id);
  if (!memberInfo) return res.status(400).send("Board not found");

  if (memberInfo.userId.toString() !== req.user._id.toString())
    return res.status(400).send("You have no permisiion");

  const board = await Board.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });
  if (!board) return res.status(400).send("Board not found");
  return res.status(200).send({ board });
};

//Lista los miembrios de un board
const listMember = async (req, res) => {
  let board = await Board.findById(req.body.boardId);
  if (!board) return res.status(400).send("Board doesn't exist");

  let members = board.members;
  return res.status(200).send({ members });
};

module.exports = {
  registerBoard,
  listBoard,
  listBoardMember,
  addMember,
  deleteMember,
  deleteBoard,
  updateBoard,
  listMember,
};
