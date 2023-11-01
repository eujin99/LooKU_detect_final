import React, { useState, useEffect } from 'react';
// import {fetchPosts} from './api';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

function NoticePage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async() => {
  //     try{
  //       const data = await fetchPosts();
  //       setPosts(data);
  //     } catch(error){
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://10.20.7.102:8080/posts'); // 크롤링 서버의 IP 주소로 변경
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        // const dataJson = await response.json();

        // console.log(response.json());
        const data = await response.json();
        console.log(data.text);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPosts();
  }, []);

  const handleBack = () =>{
    navigate('/');
  }

  return (
    <div>
        <div className='nav'>
          <button onClick={handleBack} className='backButton'> 
                      <FiChevronLeft/>
          </button>
          <p className='LooKU'>LooKU</p>
        </div>
            <div className='upper'>
              {/* eslint-disable-next-line */}
                 <a href="https://www.kku.ac.kr/"></a><img src='/img/KuLogo.png' width={'100'}/>
                 학사정보
             </div>
             <div className='noticeData'>
                 <table className="noticeTable">
                     <tr style={{textAlign:'center', fontWeight:600, fontSize:20}}><td>No</td><td>공지사항</td><td>등록일자</td></tr>
                     <tbody>
                         {posts.map((post,index)=>(
                             <tr key={index} className="noticeTr">
                                 <td className="noticeBnum">{post.number}</td>
                                 <td className="noticeTitle"><a href={post.link} onClick={()=> {window.open('https://www.kku.ac.kr/user/'+post.link)}}> {post.title}</a> </td>
                                 <td className="noticeDate">{post.date}</td>

                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>

            </div>
  );
}


export default NoticePage;