// const express = require("express");
// const { getNews } = require("./crawl.js");
// const bodyParser = require("body-parser");
// const app = express();
// const port = process.env.PORT || 5000;
// const cron = require("node-cron");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// async function handleAsync() {
//     const sum = await getNews();
//     // console.log(sum);
//     return sum;
// }
// cron.schedule("*/1 * * * *", async () => {
//     console.log("running a task every two minutes");
//     await handleAsync();
// });


// // app.use('/api/crwal',async(req,res) => {
// //   const text = await handleAsync();
// //   console.log(text);
// //   res.json([{text: text},
// //             {id : 1}]
// //     );
// // })

// app.get('/api/crwal', async(req, res) => {
//     const text = await handleAsync();

//     res.send([

//         { 'id' : 1,
//             'text' : text
//         }

//     ]);
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));


// const express = require("express");
// const { getProduct } = require("./crawl.js");
// const fs = require("fs");

// const bodyParser = require("body-parser");
// const app = express();
// const port = process.env.PORT || 5000;
// const cron = require("node-cron");

// const ProudctJSON = fs.readFileSync("./Notice.json");
// const newsData = JSON.parse(newsJSON);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));



// async function getProductAsync() {
//   const Product_data = await getProduct();
//   console.log("Product = ", Product_data);
//   console.log(ProudctJSON.text);
// }


// cron.schedule("*/1 * * * *", async () => {
//   console.log("running a task every two minutes");
//   await getProductAsync();
// });


// app.get("/api/product",async(req,res)=> {
//   res.send(ProudctJSON);
// })



// app.listen(port, () => console.log(`Listening on port ${port}`));


const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const parsing = require('./crawl.js');

// parsing 모듈 import
const parsing = require('./crawl.js');



// api/rank로 get 요청이 들어오면 
// parsing() 실행해서 요청 결괏값 client로 내보내기
app.get('/api/posts', (req, res) => {
  parsing().then(response => res.send(response))
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
