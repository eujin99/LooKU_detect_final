from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/posts', methods=['GET'])
def fetch_posts():
    try:
        url = "https://www.kku.ac.kr/user/boardList.do?boardId=1489&siteId=wwwkr&id=wwwkr_070102000000"
        headers = {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'}

        r=requests.get(url,headers = headers)
        html = r.text
        soup = BeautifulSoup(html, "lxml")

        notice=[]
        num=0
        #공지사항
        b_num = soup.find_all("td", class_="b_num")

        for item in b_num:
            title = item.find_next("td") 
            writer = title.find_next("td")
            date = writer.find_next("td")
            link = item.find_next('a')['href']

            notice.append({
                'number': item.get_text(strip=True),
                'title': title.get_text(strip=True),
                'writer': writer.get_text(strip=True),
                'date': date.get_text(strip=True),
                'link': link,
            })

        #일반 게시글
        b_seq = soup.find_all("td", class_="b_seq")
        for item in b_seq:
            title = item.find_next("td") 
            writer = title.find_next("td")
            date = writer.find_next("td")
            link = item.find_next('a')['href']
            
            notice.append({
                'number': item.get_text(strip=True),
                'title': title.get_text(strip=True),
                'writer': writer.get_text(strip=True),
                'date': date.get_text(strip=True),
                'link': link,
            })
        
        # print(notice_item)
        return jsonify(notice)
        
    except Exception as e:
        print("Error occurred while fetching posts: {e}")
        return jsonify([])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
