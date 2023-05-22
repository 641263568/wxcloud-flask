// download.js
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const stream = require("stream");
const util = require("util");
const path = require("path");

const pipeline = util.promisify(stream.pipeline);
const parentDir = path.resolve(__dirname, "..");
const imagePath = path.join(parentDir, "image.jpg");

async function download() {
  const url = "https://source.unsplash.com/random/900x383?wallpaper";
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  const writer = fs.createWriteStream(imagePath);
  await pipeline(response.data, writer);
}

async function upload(token) {
  console.log("token111", token);
  const url = `http://api.weixin.qq.com/cgi-bin/material/add_material`;
  const formData = new FormData();
  formData.append("media", fs.createReadStream(imagePath));
  formData.append("type", "image");

  try {
    const response = await axios.post(url, formData, {
      params: {
        access_token: token,
      },
      headers: formData.getHeaders(),
    });

    if (response.data.errcode) {
      throw new Error(`WeChat API error: ${response.data.errmsg}`);
    }
    return response.data;
  } catch (error) {
    // Handle the error
    console.error("Error in upload():", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

async function uploadFmImg(token) {
  await download();
  const { media_id } = await upload(token);
  return media_id;
}

module.exports = uploadFmImg;
