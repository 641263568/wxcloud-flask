const express = require("express");
const router = express.Router();

const { verifyToken } = require("./controllers/verifyToken");
const { handleCallback } = require("./controllers/handleCallback");

router.get("/", verifyToken);
router.post("/", handleCallback);

module.exports = router;
