import requests
from bs4 import BeautifulSoup
url = "https://www.kku.ac.kr/user/boardList.do?boardId=1489&siteId=wwwkr&id=wwwkr_070102000000"
headers = {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'}

r=requests.get(url,headers = headers)
html = r.text
soup = BeautifulSoup(html, "lxml")

#데이터 받을 곳
notice=[]
num=0
#공지사항
b_num = soup.find_all("td", class_="b_num")

for item in b_num:
    notice.append([])
    title = item.find_next("td") 
    writer = title.find_next("td")
    date = writer.find_next("td")
    src = item.find_next('a')['href']
    
    notice[num].append(item.text.strip())
    notice[num].append(title.text.strip())
    notice[num].append(writer.text.strip())
    notice[num].append(date.text.strip())
    notice[num].append(src)

    num+=1

#일반 게시글
b_seq = soup.find_all("td", class_="b_seq")
for item in b_seq:
    notice.append([])
    title = item.find_next("td") 
    writer = title.find_next("td")
    date = writer.find_next("td")
    src = item.find_next('a')['href']
    
    notice[num].append(item.text.strip())
    notice[num].append(title.text.strip())
    notice[num].append(writer.text.strip())
    notice[num].append(date.text.strip())
    notice[num].append(src)

    num+=1

print(notice)