"use strict";
const Controller = require("egg").Controller;
const fs = require("fs"),
  path = require("path");
const Error501 = function(result, message = "操作异常") {
  return {
    code: 501,
    message,
    result
  };
};
const Success200 = function(result, message = "操作成功") {
  return {
    code: 200,
    message,
    result
  };
};
class ThemeController extends Controller {
  // commonObj = new Common()
  async create() {
    const obj = this.ctx.request.body;
    try {
      const result = await this.ctx.service.theme.create(obj);
      this.createCssFile(obj.themestring, obj.cssFilePath);
      this.ctx.body = Success200({
        id: result.insertId
      });
    } catch (e) {
      this.ctx.body = Error501(e);
    }
  }
  // // 创建Css 文件
  createCssFile(data, filePath = "") {
    var w_data = new Buffer(this.formateCss(data));
    if (!filePath) return;
    // 判断文件是否
    fs.stat(filePath),
      (err, stats) => {
        //
        if (err) {
        }
      };
    fs.unlink(filePath, err => {
      if (err) {
        this.writeToFile(filePath, w_data);
      } else {
        this.writeToFile(filePath, w_data);
      }
    });
  }
  // 写入文件
  writeToFile(filePath, w_data) {
    fs.writeFile(filePath, w_data, { flag: "a" }, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("写入成功");
      }
    });
  }
  // json 转 scss
  formateCss(data) {
    let str =
      data
        .substring(1, data.length - 1)
        .replace(/,/g, ";")
        .replace(/"/g, "") + ";";
    return str;
  }
}
module.exports = ThemeController;
