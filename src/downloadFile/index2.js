let path = require('path')
let fs = require('fs')
let superagent = require('superagent')
let cheerio = require('cheerio')
let db = require('./db')

/**
 * http://search.jumei.com/?filter=0-11-1&search=%E5%8F%A3%E7%BA%A2&from=&cat=
 */
superagent.get('https://www.muke800.com/')
    .then((res)=>{
        // console.log("data",res.text);
        let goodsList = [];
        let $ = cheerio.load(res.text);
        $('.module-items .module-item').each((i,el)=>{
            let $arr = $(el);
            let goods = {
                imgurl:$arr.find(".module-item .module-item-cover .module-item-pic img").attr("data-src"), //图片
                covers:$arr.find(".module-item .module-item-cover .module-item-caption span").text(),// cover
                title:$arr.find(".module-item .module-item-cover .module-item-pic a").attr("title"),//标题
                actors:$arr.find(".module-item .module-item-cover .module-item-content .video-text").text(),//详情
                sequel:$arr.find(".module-item .module-item-text").text()// 更新集数
            }
            goodsList.push(goods)
        })
        // let sql = `insert into goods(shopType,slpicImg,slName,newPrice,oldPrice,searchDeal,listButton) values`
        let insertSql =[];
        let id=1;
        let baseurl="https://www.muke800.com/";
        goodsList = goodsList.map((item)=>{
            // let slpicImg = String(item.imgurl);
            // superagent.get(slpicImg).then((res)=>{
            //    let {pathname} = new URL(slpicImg)
            // let filename = path.basename(pathname)
            // // console.log("filename",filename);
            // fs.writeFile("./img2/"+filename,res.body,function(err){
            //     console.log("err",err);
            // })
            // })
            // item.imgurl = filename;
            // insertSql.push(`${item.title}`)
            // console.log("path",path);

            // let {pathname} = new URL(slpicImg)
            // const filename = path.basename(pathname)
            // let filePath = './img/'+filename
            // let createFileSteam = fs.createWriteStream(filePath)
            // superagent.get(slpicImg).pipe(createFileSteam)
            // if(!/((http)|(https))?/.test(item.imgurl)){
            //     item.imgurl = baseurl+item.imgurl
            // }
            // if(/^((http)|(https))?/.test(item.imgurl)){
            //     item.imgurl = item.imgurl.slice(13,item.imgurl.length)
            // }
            // console.log("goodsList",goodsList);
            insertSql.push(`('${item.imgurl}','${item.covers}','${item.title}','${item.actors}','${item.sequel}')`)
            return item;
        })
        // 写入数据库
        let sql ='insert into eightyends(imgurl,covers,title,actors,sequel) values'+insertSql.join(',');
        db.query(sql).then(()=>{console.log("数据写入成功")})

    }).catch(err=>console.log(err))