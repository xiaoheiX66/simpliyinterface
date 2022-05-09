const superagent = require('superagent');
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const db = require('./db')

// 口红内容
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
superagent.get('https://www.muke800.com/')
    .set({
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        Connection: 'keep-alive',
        'Content-Length': '426',
        Host: 'collect-v6.51.la',
        Origin: 'https://www.muke800.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
    })

   
    .then((res) => {
        // console.log('res',res.text);
        // 通过cheerio筛选数据

        const $ = cheerio.load(res.text);

        let goodsList = []

        // $('.products_wrap li').each((i, el) => {
        //     const $el = $(el);
        //     const goods = {
        //         id:$el.attr('pid'),
        //         shopType: $el.find('.s_l_pic .icon_wrap strong').text(),
        //         slpicImg: $el.find('.s_l_pic img').attr('src'),
        //         slName: $el.find('.s_l_name a').text().replace(/\s*/g,"").replace(/\'*/g,""),
        //         newPrice: $el.find('.s_l_view_bg .search_list_price span').text(),
        //         oldPrice: $el.find('.s_l_view_bg .search_list_price del').text(),
        //         searchDeal: $el.find('.search_deal_buttom_bg div').text().replace(/\s*/g, ""),
        //         listButton: $el.find('.search_list_button a').attr('title')
        //         // leftListImg:$el.find('.item_wrap_left .cs_list li img').eq(0).attr('src')
        //     }
        //     goodsList.push(goods)
        // })

        // 爬取图片
        const insertSql = []
        goodsList = goodsList.map(item => {
            // console.log("itemimg",item);
            // if(typeof(item.slpicImg) === 'undefined' || typeof(item.id)==='undefined'){
            //     item.id='xxx'
            //     item.shopType = '【非自营】'
            //     item.slpicImg ='http:' + '//p4.jmstatic.com/product/005/196/5196964_std/5196964_350_350.jpg'
            //     item.slName = '纽西之谜 【品牌旗舰】纽西之谜美白淡斑面膜补水保湿烟酰胺提亮焕白面膜'
            //     item.newPrice = '34.5'
            //     item.oldPrice = '¥99'
            //     item.searchDeal = '距离结束还剩3天以上'
            //     item.listButton = '加入购物车'
            // }
            // if(typeof(item.searchDeal) === "string" && item.searchDeal.length === 0){
            //     item.searchDeal=item.searchDeal = '新品上线'
            // }
            // if(typeof(item.oldPrice) === "string" && item.searchDeal.length === 0){
            //     item.oldPrice=item.oldPrice = '¥199'
            // }
            item.slpicImg = item.slpicImg.substring(5,item.slpicImg.length)
            // console.log("itemimg",item.slpicImg);
            const imgurl = 'http:' + item.slpicImg;
            // console.log("imgUrl",imgurl);
            // 请求图片
            superagent.get(imgurl).then(res=>{
                // console.log('img',res.body)
                // 提取文件名
                const {pathname} = new URL(imgurl)
                const filename = path.basename(pathname)
                // console.log('filename',filename)
                fs.writeFile('./img/'+filename,res.body,function(err){
                    console.log('err',err);
                })
            })

            const { pathname } = new URL(imgurl)
            const filename = path.basename(pathname)
            const filePath = './img/' + filename

            // 创建写入文件流
            const writeFileStream = fs.createWriteStream(filePath)

            superagent.get(imgurl).pipe(writeFileStream)

            item.slpicImg = filename;

            insertSql.push(`('${item.id}','${item.shopType}','${filename}','${item.slName}','${item.newPrice}','${item.oldPrice}','${item.searchDeal}','${item.listButton}')`)
            // console.log("slname",item.id);
            return item
        })
        console.log("新的goodList",goodsList);
        // 写入数据库
        // insertSql=['()','()']
        // let sql = 'insert into spierdata(id,shopType,slpicImg,slName,newPrice,oldPrice,searchDeal,listButton) values' + insertSql.join(',');

        // console.log('sql',sql);
        // db.query(sql).then(()=>{
        //     console.log('数据写入成功')
        // })
    }).catch(err=>console.log(err))