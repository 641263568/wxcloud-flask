// download.js
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const stream = require("stream");
const util = require("util");
// const LocalStorage = require("node-localstorage").LocalStorage;
// const localStorage = new LocalStorage("./scratch");

const pipeline = util.promisify(stream.pipeline);
const imagePath = "image.jpg";

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

async function upload() {
  console.log(4444);

  const url = "https://api.weixin.qq.com/cgi-bin/material/add_material";
  const formData = new FormData();
  formData.append("media", fs.createReadStream(imagePath));
  formData.append("type", "image");

  try {
    const response = await axios.post(url, formData, {
      headers: formData.getHeaders(),
    });

    if (response.data.errcode) {
      throw new Error(`WeChat API error: ${response.data.errmsg}`);
    }

    console.log(5555, response.data);
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
