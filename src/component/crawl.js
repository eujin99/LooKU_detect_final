
const express = require('express'); //express 모듈
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express(); //미들웨어 선언

app.use(cors());

app.get('/api/posts', async (req, res) => {
  try {
    const response = await axios.get('https://www.kku.ac.kr/user/boardList.do?boardId=1489&siteId=wwwkr&id=wwwkr_070102000000'); // 학교 홈페이지 URL
    
    const $ = cheerio.load(response.data);

    const posts = [];
    $('.b_num').each((index, element) => {
      const $item = $(element);
      const $title = $item.next();
      const $writer = $title.next();
      const $date = $writer.next();
      const link = $title.find('a').attr('href');
      // const $src = $item.find('td.ta_left b_title a').attr('href');
      
      posts.push({
        number: $item.text().trim(),
        title: $title.text().trim(),
        writer: $writer.text().trim(),
        date: $date.text().trim(),
        link: link,
      });
    });

    $('.b_seq').each((index, element) => {
      const $item = $(element);
      const $title = $item.next();
      const $writer = $title.next();
      const $date = $writer.next();
      const link = $title.find('a').attr('href');
      
      posts.push({
        number: $item.text().trim(),
        title: $title.text().trim(),
        writer: $writer.text().trim(),
        date: $date.text().trim(),
        link: link,
      });
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
