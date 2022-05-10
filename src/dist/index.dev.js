"use strict";

var path = require('path');

var fs = require('fs');

var superagent = require('superagent');

var cheerio = require('cheerio');

var db = require('./db/index');
/**
 * http://search.jumei.com/?filter=0-11-1&search=%E5%8F%A3%E7%BA%A2&from=&cat=
 */


superagent.get('http://search.jumei.com/').query({
  filter: 0 - 11 - 1,
  search: '口红',
  from: '',
  cat: ''
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
  // console.log("data",res.text);
  var goodsList = [];
  var $ = cheerio.load(res.text);
  $('.products_wrap li').each(function (i, el) {
    var $el = $(el);
    var goods = {
      slpicImg: $el.find('.item_wrap .s_l_pic img').attr('src'),
      slName: $el.find('.s_l_name a').text().slice(5, 17),
      newPrice: $el.find('.item_wrap .search_list_price span').text(),
      oldPrice: $el.find('.item_wrap .search_list_price del').text(),
      searchDeal: $el.find('.item_wrap .search_deal_buttom_bg div span').eq(1).text(),
      listButton: $el.find('.item_wrap .search_list_button a').attr('title') // leftListImg:$el.find('.item_wrap_left .cs_list li img').eq(0).attr('src')

    };
    goodsList.push(goods);
  });
  console.log("goodsList", goodsList);
})["catch"](function (err) {
  console.log(err);
});