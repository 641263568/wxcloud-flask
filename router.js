const express = require("express");
const router = express.Router();

const {
  verifyToken,
  handleCallback,
} = require("./controllers/wechatController");

router.get("/", verifyToken);
router.post("/", handleCallback);

module.exports = router;
