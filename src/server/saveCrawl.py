from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/posts', methods=['GET'])
def fetch_posts():
    try:
        response = requests.get('https://www.kku.ac.kr/user/boardList.do?boardId=1489&siteId=wwwkr&id=wwwkr_070102000000')
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        posts = []
        
        for item in soup.select('.b_num'):
            title_element = item.find_next()
            writer_element = title_element.find_next()
            date_element = writer_element.find_next()
            link = title_element.find('a')['href']
            
            posts.append({
                'number': item.get_text(strip=True),
                'title': title_element.get_text(strip=True),
                'writer': writer_element.get_text(strip=True),
                'date': date_element.get_text(strip=True),
                'link': link,
            })
        
        for item in soup.select('.b_seq'):
            title_element = item.find_next()
            writer_element = title_element.find_next()
            date_element = writer_element.find_next()
            date_element = writer_element.find_next()
            link = title_element.find('a')['href']

            posts.append({
                'number': item.get_text(strip=True),
                'title': title_element.get_text(strip=True),
                'writer': writer_element.get_text(strip=True),
                'date': date_element.get_text(strip=True),
                'link': link,
            })
        
        print(jsonify(posts))
        return jsonify(posts)
        
    except Exception as e:
        print("Error occurred while fetching posts: {e}")
        return jsonify([])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
