// download.js
const wxapi = require("./wxapi");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const stream = require("stream");
const util = require("util");

const pipeline = util.promisify(stream.pipeline);
const imagePath = "image.jpg";

async function download() {
  const url = "http://source.unsplash.com/random/900x383?wallpaper";
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      timeout: 6000,
    });
    const writer = fs.createWriteStream(imagePath);
    await pipeline(response.data, writer);
  } catch (error) {
    console.error("Error in download():", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

async function upload() {
  const url = "http://api.weixin.qq.com/cgi-bin/material/add_material";
  const formData = new FormData();
  formData.append("media", fs.createReadStream(imagePath));
  formData.append("type", "image");

  try {
    const response = await wxapi.call(url, formData);

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

async function uploadFmImg() {
  await download();
  const { media_id } = await upload();
  return media_id;
}

module.exports = uploadFmImg;
