"use strict";

var superagent = require('superagent');

var cheerio = require('cheerio');

var fs = require('fs');

var path = require('path');

var db = require('./db'); // 口红内容
// http://search.jumei.com/?filter=0-11-1&search=%E5%8F%A3%E7%BA%A2
// 保湿内容
// http://search.jumei.com/?filter=0-11-1&search=保湿&from=search_toplist_保湿_word_pos_1&cat=
// 面膜内容
// http://search.jumei.com/?filter=0-11-1&search=%E9%9D%A2%E8%86%9C
// 洗面奶
// http://search.jumei.com/?filter=0-11-1&search=洗面奶
// 补水
// http://search.jumei.com/?filter=0-11-1&search=补水
// 香水
// http://search.jumei.com/?filter=0-11-1&search=香水
// 眼霜
// http://search.jumei.com/?filter=0-11-1&search=眼霜
// 护肤套装
// http://search.jumei.com/?filter=0-11-1&search=护肤套装
// BB霜
// http://search.jumei.com/?filter=0-11-1&search=BB霜


superagent.get('http://search.jumei.com/').query({
  filter: 0 - 11 - 1,
  search: 'BB霜'
}).set({
  Accept: 'application/json, text/javascript, */*',
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  Connection: 'keep-alive',
  Cookie: 'default_site_25=gz; first_visit=1; first_visit_time=1640595848; jml14=2; jmdl14=2; IsCookieUid_USER_CS_COOKIE_UID_=FALSE; cookie_uid=16405958791620523095; referer_site=www.sogou.com; abt52=new; abt62=old; PHPSESSID=7bkngd92pkejr88an4dkbvgcq4; route=6a03261bb7a5032f78fcbc3b5c5cba6a; __utmc=1; __utmz=1.1640595880.1.1.utmcsr=sogou.com|utmccn=(referral)|utmcmd=referral|utmcct=/link; _pykey_=60b17a4f-413b-57c4-9038-8fdf34546c4f; Hm_lvt_884477732c15fb2f2416fb892282394b=1640595882,1640595887; IsCookieUid_USER_CS_COOKIE_UID_16405958791620523095=FALSE; newCash=1; __utma=1.1103570139.1640595880.1640595880.1640602882.2; __xsptplusUT_428=1; __xsptplus428=428.2.1640602881.1640607054.10%233%7Cwww.sogou.com%7C%7C%7C%7C%23%23kgzwxE2Cd8H7mpWCC8sCD61gUEi8aB9S%23; search_user_status=0; b5164fbdf0a4526876438e688f5e4130=1; search_start_time=1640607083365; __utmb=1.12.10.1640602882; Hm_lpvt_884477732c15fb2f2416fb892282394b=1640607084',
  Host: 'search.jumei.com',
  Referer: 'http://search.jumei.com/?filter=0-11-1&search=%E5%8F%A3%E7%BA%A2&from=&cat=',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
  'X-Requested-With': 'XMLHttpRequest'
}).then(function (res) {
  // console.log('res',res.text);
  // 通过cheerio筛选数据
  var $ = cheerio.load(res.text);
  var goodsList = [];
  $('.products_wrap li').each(function (i, el) {
    var $el = $(el);
    var goods = {
      id: $el.attr('pid'),
      shopType: $el.find('.s_l_pic .icon_wrap strong').text(),
      slpicImg: $el.find('.s_l_pic img').attr('src'),
      slName: $el.find('.s_l_name a').text().replace(/\s*/g, "").replace(/\'*/g, ""),
      newPrice: $el.find('.s_l_view_bg .search_list_price span').text(),
      oldPrice: $el.find('.s_l_view_bg .search_list_price del').text(),
      searchDeal: $el.find('.search_deal_buttom_bg div').text().replace(/\s*/g, ""),
      listButton: $el.find('.search_list_button a').attr('title') // leftListImg:$el.find('.item_wrap_left .cs_list li img').eq(0).attr('src')

    };
    goodsList.push(goods);
  }); // 爬取图片

  var insertSql = [];
  goodsList = goodsList.map(function (item) {
    // console.log("itemimg",item);
    if (typeof item.slpicImg === 'undefined' || typeof item.id === 'undefined') {
      item.id = 'xxx';
      item.shopType = '【非自营】';
      item.slpicImg = 'http:' + '//p4.jmstatic.com/product/005/196/5196964_std/5196964_350_350.jpg';
      item.slName = '纽西之谜 【品牌旗舰】纽西之谜美白淡斑面膜补水保湿烟酰胺提亮焕白面膜';
      item.newPrice = '34.5';
      item.oldPrice = '¥99';
      item.searchDeal = '距离结束还剩3天以上';
      item.listButton = '加入购物车';
    }

    if (typeof item.searchDeal === "string" && item.searchDeal.length === 0) {
      item.searchDeal = item.searchDeal = '新品上线';
    }

    if (typeof item.oldPrice === "string" && item.searchDeal.length === 0) {
      item.oldPrice = item.oldPrice = '¥199';
    }

    item.slpicImg = item.slpicImg.substring(5, item.slpicImg.length); // console.log("itemimg",item.slpicImg);

    var imgurl = 'http:' + item.slpicImg; // console.log("imgUrl",imgurl);
    // 请求图片
    // superagent.get(imgurl).then(res=>{
    //     // console.log('img',res.body)
    //     // 提取文件名
    //     const {pathname} = new URL(imgurl)
    //     const filename = path.basename(pathname)
    //     // console.log('filename',filename)
    //     fs.writeFile('./img/'+filename,res.body,function(err){
    //         console.log('err',err);
    //     })
    // })

    var _ref = new URL(imgurl),
        pathname = _ref.pathname;

    var filename = path.basename(pathname);
    var filePath = './img2/' + filename; // 创建写入文件流

    var writeFileStream = fs.createWriteStream(filePath);
    superagent.get(imgurl).pipe(writeFileStream);
    item.slpicImg = filename;
    insertSql.push("('".concat(item.id, "','").concat(item.shopType, "','").concat(filename, "','").concat(item.slName, "','").concat(item.newPrice, "','").concat(item.oldPrice, "','").concat(item.searchDeal, "','").concat(item.listButton, "')")); // console.log("slname",item.id);

    return item;
  }); // console.log("新的goodList",goodsList);
  // 写入数据库
  // insertSql=['()','()']

  var sql = 'insert into spierdata(id,shopType,slpicImg,slName,newPrice,oldPrice,searchDeal,listButton) values' + insertSql.join(','); // console.log('sql',sql);

  db.query(sql).then(function () {
    console.log('数据写入成功');
  });
})["catch"](function (err) {
  return console.log(err);
});