import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { FiHome,FiMap,FiSearch,FiBookOpen } from 'react-icons/fi';
import { PiHouseLight,PiMagnifyingGlassLight,PiCarProfileLight, PiMapTrifoldLight,PiBookOpenLight } from 'react-icons/pi';
//import {FaSquareFacebook,FaSquareGooglePlus, FaSquareInstagram,FaSquareTwitter} from "react-icons/fa6";
import { Link as ScrollLink } from 'react-scroll';
const MainPage = () => {

  const navigate = useNavigate();
  const handleCameraComponent = () =>{
    navigate('/CameraComponent');
  }
  return (
    <div>
            <header class="head" id="home">
              <div class="contain">
                  <div class="infos">
                    <div class="welcome">
                       <br/>
                      <br/>
                      <h6 class="hi">Hi, I'm</h6>
                      <h6 class="hiNext">LooKU</h6>
                      <br/>
                      <div class='subtext'>
                        <p style={{fontSize:'14pt', margin:'0'}}>건국대학교</p><p style={{fontSize:'14pt',marginTop:'6px'}}>건물 인식 AI 서비스</p>
                        
                        <p class='underSubtext'>건국대학교 건물 인식 AI 서비스 입니다.<br/>
                        건물 인식 및 다양한 서비스를 경험해보세요!</p>
                        <br/>
                        <br/>
                      </div>
                    </div>
                      <div class="mainTwoButton">
                      <ScrollLink to="secondText" smooth={true} duration={500}>
                        <button class='questionMark'>LooKU ?</button>
                      </ScrollLink>
                      <Link to='/CameraComponent'>
                        <button class='mainAIbutton'>건물 인식 AI 바로가기</button>
                      </Link>
                        
                      </div>    
                      <br/>
                      </div>
                      </div>
                      <br/> <br/><br/><br/> <br/><br/>
                </header>
{/* 
                <div class="socials mt-4">
                    <a class="social-item" href="javascript:void(0)"><i class="ti-facebook"></i></a>
                    <a class="social-item" href="javascript:void(0)"><i class="ti-google"></i></a>
                    <a class="social-item" href="javascript:void(0)"><i class="ti-github"></i></a>
                    <a class="social-item" href="javascript:void(0)"><i class="ti-twitter"></i></a>
                </div> */}
            {/* </div>               */}
            {/* <div class="img-holder">
                <img src="assets/imgs/man.svg" alt="">
            </div>       */}


        <div class="secondText">
        <br/> <br/><br/> <br/><br/>
            <p style={{color:'#6D7177',marginBottom:'3px',fontWeight:'460'}}>Let's LooKU</p>
            <p style={{color:'#495056', fontSize:'16pt', fontWeight:'600', marginTop:'0'}}>What is LooKU?</p>
            <p style={{color:'#495056'}}>건국대학교 교내 건물을 인식시키면, <br/> 해당 건물의 정보를 나타내는 AI 서비스 입니다. <br/> <br/>LooKU는 건물 인식 AI 서비스 외에도, <br/> 학교생활에 필요한 편의기능을 제공합니다. <br/> <br/> LooKU와 함께 즐거운 학교생활 되세요!<br/> <br/><br/> <br/><br/></p>

            <div class="mainRow">
              <Link to='/CameraComponent'>
                <div class="buttonWhite">
                <PiHouseLight size="50" color="#EE8160"/><br/>
                  건물 인식 <b>AI</b>
                </div>
              </Link>
              <Link to='/SearchPage'>
                <div class="buttonOrange">
                <PiMagnifyingGlassLight size="50" /><br/>
                  건물 검색
                </div>
              </Link>
              <Link to='/MapPage'>
                <div class="buttonWhite">
                <PiMapTrifoldLight size="50" color="#EE8160"/><br/>
                  교내 지도
                </div>
              </Link>
              <a href="http://its.chungju.go.kr/mbis/mMain.do">
                <div class="buttonOrange">
                <PiCarProfileLight size="50"/><br/>
                  대중 교통
                </div>
              </a>
              <Link to='/NoticePage'>
                <div class="buttonWhite">
                <PiBookOpenLight size="50" color="#EE8160"/><br/>
                  학사 정보
                </div>
              </Link>

            </div>
        
          </div> 
          <div class="form">
                    <h6 class="subtitle">24/7</h6>
                    <h6 class="section-title mb-4">Contact</h6>
                    <form>
                        <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required/>
                        </div>
                        <div class="form-group">
                            <textarea name="contact-message" id="" cols="30" rows="5" class="form-control" placeholder="Message"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block rounded w-lg">Send Message</button>
                    </form>
                </div>
  </div>
          
  );
};

export default MainPage;
