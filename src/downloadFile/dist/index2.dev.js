"use strict";

var path = require('path');

var fs = require('fs');

var superagent = require('superagent');

var cheerio = require('cheerio');

var db = require('./db');
/**
 * http://search.jumei.com/?filter=0-11-1&search=%E5%8F%A3%E7%BA%A2&from=&cat=
 */


superagent.get('https://sale.vmall.com/huaweizone.html').then(function (res) {
  // console.log("data",res.text);
  var goodsList = [];
  var $ = cheerio.load(res.text);
  $('.grid2 .grid-list li').each(function (i, el) {
    var $arr = $(el);
    var goods = {
      imgurl: $arr.find("a .pic img").attr("src"),
      //图片
      title: $arr.find("a .title").text(),
      //标题
      desc: $arr.find("a .desc").text(),
      //简介
      sale: $arr.find("a .sale").text(),
      //现价
      price: $arr.find("a .price .price-amount").text() //原价

    };
    goodsList.push(goods);
  });
  console.log("goodsList", goodsList); // let sql = `insert into goods(shopType,slpicImg,slName,newPrice,oldPrice,searchDeal,listButton) values`

  var insertSql = [];
  goodsList = goodsList.map(function (item) {
    var slpicImg = String(item.slpicImg); // superagent.get(slpicImg).then((res)=>{
    //    let {pathname} = new URL(slpicImg)
    // let filename = path.basename(pathname)
    // // console.log("filename",filename);
    // fs.writeFile("./img2/"+filename,res.body,function(err){
    //     console.log("err",err);
    // })
    // })

    item.slpicImg = filename;
    insertSql.push("".concat(item.shopType));

    var _ref = new URL(slpicImg),
        pathname = _ref.pathname;

    var filename = path.basename(pathname);
    var filePath = './img2/' + filename;
    var createFileSteam = fs.createWriteStream(filePath);
    superagent.get(slpicImg).pipe(createFileSteam);
    return item;
  }); // 写入数据库
});