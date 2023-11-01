import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import storage from '../storage';

const SearchDetail = ({}) => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL 파라미터에서 itemId 값을 가져옴
  
  // id에 해당하는 상세 데이터 찾기
  const result = storage.productData.find((item) => item.id === parseInt(id));

  const { number,name, description,tel,imageUrl, infra} = result;

  const handleBack = () =>{
    navigate(-1);
  }
  
  useEffect(() => {
    // Kakao Maps API 스크립트 로드
    const scriptTag = document.createElement('script');
    scriptTag.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=15c41e586bfa35e4d78058959fcf8140&libraries=services';
    scriptTag.onload = mapScriptLoaded;
    document.head.appendChild(scriptTag);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.head.removeChild(scriptTag);
    };
  }, []);

  // Kakao Maps API 스크립트 로드 완료 후 실행될 콜백 함수
   function mapScriptLoaded() {
     mapscript();
   }

   function mapscript() {
     let container = document.getElementById('map');
     let options = {
       center: new window.kakao.maps.LatLng(result.centerLatitude,result.centerLongitude),
       level:2,
     };
     //map
     const map=new window.kakao.maps.Map(container,options);

     //마커가 표시 될 위치
     let markerPosition=new window.kakao.maps.LatLng(result.centerLatitude,result.centerLongitude);
     
      // 마커를 생성합니다
      let marker=new window.kakao.maps.Marker({
        position:markerPosition,
      });
      
      // 마커를 지도 위에 표시합니다.
      marker.setMap(map);
   }
  return (
    <div className='resultContainer'>
          <img src={imageUrl} alt ="img" width="100%" className='backgroundImage'/>
          <div className = 'scrollableContainer'>
            <div className='dataContainer'>
                <p className='titleStyle'><span style={{color:"white",fontSize:"14pt",backgroundColor:"#3B7C2D",borderRadius:"45px",paddingLeft:"6px",paddingRight:"6px",paddingTop:"1px",paddingBottom:"2px"}}>{number}</span> {name}</p>
                <p className='textStyle'>운영시간 : AM 9:00 - PM 6:00</p>
                <p className='textStyle'>전화번호 : {tel}</p>
                <p className='textStyle'>시설소개</p>
                <p>{description}</p>
                <p className='textStyle'> 주변 인프라</p>
                <div className="infraList">
                   {infra.map((item, index) => (
                  // 각 인프라 항목에 스타일 적용
                  <div key={index} className='infra'>
                    {item}
                  </div>
                  ))}
                </div>
                <p className='textStyle'>MAP</p>
                <div id='map' style={{ width: '100%', height: '400px', borderRadius:'20px', boxShadow:'0px 4px 4px #BFBFBF' }}></div> 

            </div>
            <button onClick={handleBack} className='backButton'> 
                    <FiChevronLeft/>
            </button>
          </div>
            
        </div>
  );
};

export default SearchDetail;
