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
  // const token =
  //   "68_ISglNeGOPzcka6AK3WpbWcL7-qRPWD323TUl5iRBPCcUJE8yQR4DYPb4Q0rNsvJKKh9y-GsstGLNdoz5X6JYRI1cs5iHkw-mKSe_g5j1GhbtsDfBfwEarwGXP0MSUYeAJAZBF";
  const formData = new FormData();
  formData.append("media", fs.createReadStream(imagePath));
  try {
    const response = await axios.post(
      `https://api.weixin.qq.com/cgi-bin/media/upload?access_token=${token}&type=image`,
      formData,
      { headers: formData.getHeaders() } // 添加这行代码
    );
    return response.data; // 返回响应的数据
  } catch (error) {
    console.log(error);
  }
}

async function uploadFmImg(token) {
  await download();
  const { media_id } = await upload(token);
  console.log("上传封面成功", media_id);
  return media_id;
}

module.exports = uploadFmImg;
