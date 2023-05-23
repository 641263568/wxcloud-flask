const express = require("express");
const router = express.Router();

const { verifyToken } = require("./controllers/verifyToken");
const { handleGzhMessage } = require("./controllers/handleGzhMessage");
const { handleGptMessage } = require("./controllers/handleGptMessage");

router.get("/", verifyToken);
router.post("/", handleGzhMessage);
router.post("/gpt", handleGptMessage);

module.exports = router;
