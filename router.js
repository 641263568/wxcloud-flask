const express = require("express");
const router = express.Router();

const { verifyToken } = require("./controllers/verifyToken");
const { handleMessage } = require("./controllers/handleMessage");

router.get("/", verifyToken);
router.post("/", handleMessage);

module.exports = router;
