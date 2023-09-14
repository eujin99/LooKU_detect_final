// import React from "react";
import { typographyClasses } from '@mui/material';
import axios from 'axios';
// import Notice from "./Notice.json"
import $ from 'jquery';
import React, { useState, useEffect } from 'react';
import {fetchPosts} from './api';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function NoticePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const data = await fetchPosts();
        setPosts(data);
      } catch(error){
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // const navigate = useNavigate();
  // const handleLinkClick = (link) => {
  //   const urlWithoutHost = link.replace('http://localhost:8000', '');
  //   navigate(urlWithoutHost);
  // };

  return (
    <div>
            <div className='upper'>
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
                                 <a href={post.link} onClick={()=> {window.open('https://www.kku.ac.kr/user/'+post.link)}}> <td className="noticeTitle">{post.title}</td> </a>
                                 <td className="noticeDate">{post.date}</td>

                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>

            </div>
    // <div>
    //   <h1>게시물 목록</h1>
    //   <ul>
    //     {posts.map((post, index) => (
    //       <li key={index}>
    //         <a href={post.link}>{post.title}</a> by {post.writer}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}


export default NoticePage;

// function NoticePage()  {
//     const day="공지"        
//     const announceList=Notice.words.filter(word=>
//         word.b_num===day)
//     return (
//         <div>
//             <div className='upper'>
//                 <a href="https://kku.ac.kr"></a><img src='/img/KuLogo.png' width={'100'}/>
//                 학사정보
//             </div>
//             <div className='noticeData'>
//                 <table className="noticeTable">
//                     <tr style={{textAlign:'center', fontWeight:600, fontSize:20}}><td>No</td><td>공지사항</td><td>등록일자</td></tr>
//                     <tbody>
//                         {announceList.map((word)=>(
//                             <tr key={word.b_num} className="noticeTr">
//                                 <td className="noticeBnum">{word.b_num}</td>
//                                 <a href={word.src}> <td className="noticeTitle">{word.title}</td> </a>
//                                 <td className="noticeDate">{word.date}</td>

//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//            </div>
//         );
// }

// export default NoticePage;

// import React from 'react';
// function NoticePage(props) {
//     const arr = props.newsArr;
//     const newsElement = arr && arr.map((element, index) => {
//         const style = {"fontWeight":"bold" }
//         return <div key={index}>
//                     <span style={style}>{element[0]}</span>
//                     <br />
//                     <span >{element[1]}</span>
//                 </div>
//     });

//     return <div>{newsElement}</div>
// }
// export default NoticePage;