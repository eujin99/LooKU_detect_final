import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CameraComponent from './component/CameraComponent';
import ResultPage from './component/ResultPage';
import NoticePage from './component/NoticePage';
import SearchPage from './component/SearchPage';
import SearchDetail from './component/SearchDetail';
import MapPage from './component/MapPage';
import MainPage from './component/MainPage';
import './style.css';
import{LiaBarsSolid} from "react-icons/lia";


export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleLinkClick() {
    setIsMenuOpen(false);
  }
  return (
    <>
      
      <Router>
        <div>
                  <div id="nav">
          <ul>
            <li><Link to="/" className="nav1" style={{fontSize:'16pt', marginRight:'240px',marginTop:'2px',padding:0}}>
              LooKU
            </Link></li>
            <li>
              <LiaBarsSolid size='40' color='#616161' onClick={()=>handleMenuClick()}/>
              </li>
          </ul> 
          {isMenuOpen && (
      <nav className="navigation-menu" style={{ listStyleType: 'none'}}>
                    <li class="nav-item">
                        <Link to="/" onClick={handleLinkClick} style={{color:'#EE8160'}}>Home</Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/CameraComponent" onClick={handleLinkClick} style={{color:'#616161'}}>건물 인식 AI</Link>
                    </li>
                    <li class="nav-item">
                    <Link to='/SearchPage' onClick={handleLinkClick} style={{color:'#616161'}}>건물 검색</Link>
                    </li>
                    <li class="nav-item">
                    <Link to='/MapPage' onClick={handleLinkClick} style={{color:'#616161'}}>교내 지도</Link>
                    </li>
                    <li class="nav-item">
                    <a href="http://its.chungju.go.kr/mbis/mMain.do" onClick={handleLinkClick} style={{color:'#616161'}}>대중 교통</a>
                    </li>
                    <li class="nav-item">
                    <Link to='/NoticePage' onClick={handleLinkClick} style={{color:'#616161'}}>학사 정보</Link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#service" onClick={handleLinkClick} style={{color:'#616161'}}>Service</a>
                    </li>                   
                    <li class="nav-item">
                        <a class="nav-link" href="#contact" onClick={handleLinkClick} style={{color:'#616161'}}>Contact</a>
                    </li>
      </nav>
    )}

      </div>
        </div>

        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/NoticePage" element={<NoticePage />} />
          <Route path="/CameraComponent" element={<CameraComponent />} />
          <Route path="/ResultPage" element={<ResultPage />} />
          <Route path="/SearchPage" element={<SearchPage />} />
          <Route path="/items/:id" element={<SearchDetail />} />
          <Route path="/MapPage" element={<MapPage />} />
        </Routes>
      </Router>
    </>
   );

}