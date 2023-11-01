import React, { useEffect, useState } from 'react';
// import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

function MapPage() {
    // const location = useLocation();
    const navigate = useNavigate();
    const [currentLocation, setCurrentLocation] = useState(null);

    // function componentDidMount() {
    //     if (navigator.geolocation) {
    //       navigator.permissions
    //         .query({ name: "geolocation" })
    //         .then(function (result) {
    //           if (result.state === "granted") {
    //             alert(result.state);
    //             //If granted then you can directly call your function here
    //           } else if (result.state === "prompt") {
    //             alert(result.state);
    //           } else if (result.state === "denied") {
    //             //If denied then you have to show instructions to enable location
    //           }
    //           result.onchange = function () {
    //             alert(result.state);
    //           };
    //         });
    //     } else {
    //       alert("Sorry Not available!");
    //     }
    //   }

    // function initGeolocation(){
    //     if(navigator.geolocation){
    //         alert("geolocation 지원 함");
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //               const { latitude, longitude } = position.coords;
    //               const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
    //               alert("geolocation 지원 함");
    //             },
    //             (error) => {
    //                 console.error('Error getting current location:', error);
    //               },
    //             { timeout: 10000 }
    //         );
    //     }else {
    //         alert("geolocation을 지원하지 않음")
    //     }
    // }

    const handleBack = () =>{
      navigate(-1);
    }
    function getCurrentLocation(map) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              //현재위치로 변경
              const latitude1 = 36.949085;
              const longitude1 = 127.906780;
              const currentPosition = new window.kakao.maps.LatLng(latitude1, longitude1);
                console.log(currentPosition);
              // 현재 위치에 마커 생성
              const marker = new window.kakao.maps.Marker({
                position: currentPosition,
                map: map,
              });
              // 마커 위에 텍스트 표시
                const content = '<div style="background-color: #248CFA; color:white; border-radius: 10px; padding: 5px; font-family: \'Noto Sans KR\', sans-serif; font-weight: 600;">현위치</div>';
                const customOverlay = new window.kakao.maps.CustomOverlay({
                    content: content,
                    position: currentPosition,
                    yAnchor: 1.3,
                    zIndex: 3,
                });
                customOverlay.setMap(map);
                setCurrentLocation({ latitude, longitude }); 
            },
            (error) => {
              console.error('Error getting current location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }
    
      useEffect(() => {
        // Kakao Maps API 스크립트 로드
        const scriptTag = document.createElement('script');
        scriptTag.src ='//dapi.kakao.com/v2/maps/sdk.js?appkey=15c41e586bfa35e4d78058959fcf8140&libraries=services';
        scriptTag.onload = mapScriptLoaded;
        document.head.appendChild(scriptTag);
    
        return () => {
          // 컴포넌트 언마운트 시 스크립트 제거
          document.head.removeChild(scriptTag);
        };
      }, []);
    
      function mapScriptLoaded() {
         let container = document.getElementById('map');
         let options = {
           center: new window.kakao.maps.LatLng(36.949437,127.908333),
           level:4,
         };
    
         //map
         const map=new window.kakao.maps.Map(container,options);
        //  componentDidMount();
        //  initGeolocation();
         getCurrentLocation(map);
       }
    
    // if((names != null) && (confidences!=null)){
      return (
        <div>
          <div className='nav'>
            <button onClick={handleBack} className='backButton'> 
                        <FiChevronLeft/>
            </button>
            <p className='LooKU'>LooKU</p>
          </div>   
            <div>

              <div id='map' style={{ width: '100%', height: '500px', borderRadius:'20px', boxShadow:'0px -4px 9px #BFBFBF' }}></div> 
                  {currentLocation && (
              <p>현재 위치 좌표 - 위도:{currentLocation.latitude}, 경도:{currentLocation.longitude}</p>
            )}
              {/* <p className='textStyle'>학교 가볼 곳</p> */}
          </div>
        </div>

    );
  
}

export default MapPage;