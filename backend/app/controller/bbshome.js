'use strict';

const Controller = require('egg').Controller;

class BbsHomeController extends Controller {
  async index() {
    this.sctx.body = 'hi, bbs';
  }
}

module.exports = BbsHomeController;
