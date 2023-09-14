// import React from "react";

// const {text} = require('express');
// const axios = require("axios");
// const cheerio = require("cheerio");

// let html="";

// async function getHtml(){
//     try{
//         return await axios.get(
//             "https://www.kku.ac.kr/user/boardList.do?boardId=1489&siteId=wwwkr&id=wwwkr_070102000000"
//         );
//     }catch(error){
//         console.error(error);
//     }
// }

// async function getData(){
//     if(!html){
//         html = await getHtml();
//     }

//     const noticeList = [];
//     const dataPath = "./product.json";
//     const $ = cheerio.load(html.data);

//     $(".newcx-container .newcx-body .newcx-main .newcx-list ul li")
//         .each(async function (index, item) {
//                 var b_num = $(item).find("td").find("b_num").attr("")
//                 var src ='http:'+ $(item).find("dl").find("img").attr("src");
//                 var title = $(item).find("dl").find("img").attr("alt");
//                 var date = $(item).find("dl").find("dd").find(".sale")
//                     .find(".price-value").first().text();
//                 var writer = $(item).find("dl").find("dd").find(".sale")
//                     .find(".price-value").first().text();
//                 var a ='https://www.coupang.com/'+$(item).find("a").attr("href");

//                 var data = {
//                     b_num: b_num,
//                     title: title,
//                     date: date,
//                     writer: writer,
//                     a:a
//                 };
//                 if (index > 7) {
//                     noticeList.push(data);
//                     fs.writeFileSync(dataPath, JSON.stringify(noticeList));
//                     console.log("product on json file");
//                 }
//             }
//         );
// }
// module.exports = { getData };

//크롤링한 데이터를 node에서 받아오게
const express = require('express')
const app=express()
const cors=require('cors')

//크롤러 경로 지정
const path=require('path')
const pyPath=path.join(__dirname, '/crawler.py')

app.listen(3000,function(){
    console.log(pyPath)
})

//콜백함수 이용, http get 요청 -> 지정 경로 라우팅
app.get('/noticeBoard', function(req,res) {
    try{
        const spawn = require("child_process").spawn //자식 프로세스 생성
        const process = spawn('python',[pyPath]) //파이썬 스크립트 실행 -> 자식 프로세스 객체 리턴 받기
        process.stdout.on('data',function(data){
            res.send(convertWebToString(data))
            res.end()
            return
        })
    } catch(error){
        console.error(error)
        res.status(500).send({error: error.message})
        res.end()
        return
    }
})

function convertWebToString(data){
    let myJsonString = (data.toString());
    myJsonString = eval(myJsonString);
    
    return data
}