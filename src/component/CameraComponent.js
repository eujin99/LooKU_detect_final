import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import storage from '../storage.js';


function CameraComponent() {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [resultData, setResultData] = useState(null);
  const [/*locationResult,*/ setLocationResult] = useState(null);
  const [alist, setAlist] = useState([]);
  const [detectList, /*setDetectList*/] = useState([]);
  const [locationList, setLocationList] = useState([]);


  const handleBack = () =>{
    navigate(-1);
  }
  
  const handleCapture = (target) => {
    if (target.files && target.files.length !== 0) {
      // // API 엔드포인트 URL 설정
      // const apiUrl = 'http://192.168.0.105:8080'; //서버 호스팅 시 주소 바꿀 것

      const file = target.files[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];
        // 서버로 사진 데이터 전송 및 예측 결과 받기
        await sendPhotoToServer(base64Image);

        console.log('*** 위치: ', locationList);
        console.log('*** 이미지: ', detectList);
      };
      reader.readAsDataURL(file);
      setSource(URL.createObjectURL(file));

      // getUserLocation();
    }
  };

///////////////////////
///////////////////////

  const sendPhotoToServer = async (base64Data) => {
    try {
      // API 엔드포인트 URL 설정
      // const apiUrl = 'http://10.20.19.84:8000'; //서버 호스팅 시 주소 바꿀 것
      const apiUrl = 'http://10.20.7.102:8000'; //행정실
      // const apiUrl = 'http://10.20.7.102:8000'; //K7

      // 서버로 전송할 데이터 객체 생성
      const dataToSend = { image: base64Data };
      console.log("dataToSend:",dataToSend);
      // POST 요청으로 데이터 전송 및 응답 받기
      const response = await fetch(apiUrl + '/predict', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
     });

     if (!response.ok) throw new Error('Failed to send photo to server.');

     // 응답 데이터 처리
     const resultData = await response.json();

     console.log("resultData:",resultData);
     
     if (resultData && resultData.predictions){
      const names = resultData.predictions.map((prediction)=>prediction.name);
      const confidences = resultData.predictions.map((prediction)=>prediction.confidence);
      
      console.log('건물 명: ', names);
      setAlist((prevAlist)=>[...prevAlist,names]);
      console.log('인식률: ',confidences);

      setResultData(resultData);

      return resultData;
    }
     
     // 결과를 활용하여 화면에 표시하거나 추가 작업 수행
     
   } catch (error) {
     console.log('Error sending photo to server:', error);
   }
  };

  const handleResultView = async () =>{
    if(resultData && resultData.predictions) {
      // 건물 번호
      const names = resultData.predictions.map((prediction) => prediction.name);
      // 인식률
      // const confidences = resultData.predictions.map((prediction) => prediction.confidence);
      
      //이미지 인식 결과가 2 이상일 경우 -> 사용자 위치로 결과 필터링(원할 경우 인식률 기준치 이하 시 코드 수정 가능)
      if(detectList.length >= 2){
        detectList.push(names);
        // const location = locationList;
        getUserLocation();
        await new Promise((resolve) => setTimeout(resolve)); 
        console.log('위치: ',locationList);
        console.log('이미지: ',detectList);
      }
      detectList.push(names);

      // getUserLocation()의 결과가 반영될 때까지 대기하는 Promise 생성
      // const waitForLocation = new Promise((resolve) => {
      //   const checkLocation = () => {
      //     if (locationList.length > 0) {
      //       resolve();
      //     } else {
      //       setTimeout(checkLocation, 100); // 일정 시간마다 체크하여 확인
      //     }
      //   };

      //   checkLocation();
      // });

      // await waitForLocation; // 위치 정보 요청이 완료될 때까지 대기
      console.log('alist: ',alist);
      console.log('*** 위치: ',locationList);
      console.log('*** 이미지: ',detectList);
      
      const final = locationList.filter((name)=>alist.includes(name));
      console.log('***:final',final);
      navigate( '/ResultPage',
        {state : {names:names}}
      );
    }
  };

  //사용자의 위치 정보 요청
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          // const latitude = position.coords.latitude;
          // const longitude = position.coords.longitude;
          const latitude = 36.949085;
          const longitude = 127.906780;
          console.log('사용자 위치:', latitude, longitude);
          
          setLocationResult(position.coords);
          
          const buildingsInRange = checkUserBuilding(latitude,longitude);
          
          if (buildingsInRange.length > 0) {
            console.log('현재 위치에 속한 건물:');
            // eslint-disable-next-line
            for (let i in buildingsInRange) {
              // console.log(buildingsInRange[i].number);
              // locationList.push(buildingsInRange[i].number);
              // console.log("locationList:",locationList);
              setLocationList(buildingsInRange.map(buildingInfo=>buildingInfo.number));
              console.log("location list:", locationList);
            }
          } else {
            setLocationList([]);
            console.log("No buildings in range.");
            console.log('현재 속한 건물이 없습니다.');
          }

          return buildingsInRange;
        },
        error => {
          console.error('위치 정보를 가져오는 중 오류가 발생했습니다:', error);
        }
      );
    } else {
      console.error('브라우저에서 Geolocation을 지원하지 않습니다.');
    }
  };

 // 사용자의 위치와 건물 정보 비교하여 현재 어느 건물 범위에 있는지 확인하는 함수
  const checkUserBuilding = (latitude, longitude) => {
    const buildingsInRange=[];

    for (let i in storage.productData) {
      let buildingInfo = storage.productData[i];

      // 현재 사용자의 위치가 해당 건물 범위 내에 있는지 확인하기
      if (
        latitude >= buildingInfo.minLatitude &&
        latitude <= buildingInfo.maxLatitude &&
        longitude >= buildingInfo.minLongitude &&
        longitude <= buildingInfo.maxLongitude
      ) {
        buildingsInRange.push(buildingInfo);
      }
    }
    console.log("사용자 범위 내 건물 : ",buildingsInRange);
    return buildingsInRange;
    };

  return (
    <div style={{  justifyContent: "center", textAlign:"center"}}>
  <div>
  <div className='nav'>
        <button onClick={handleBack} className='backButton'> 
                    <FiChevronLeft/>
            </button>
        <p className='LooKU'>LooKU</p>
        </div>
    <div className='buttonCollection'>
    {source && (
      <div className='imageContainer'>
        <img src={source} alt="snap" className='image' />
      </div>
    )}
    
      <div className='filebox'>
          <label for="file">
          <div class="btn-upload">건물 촬영하기</div>
          </label>
          <input
          accept="image/*"
          type="file"
          capture="environment"
          onChange={(e) => handleCapture(e.target)}
          id="file"
        />
        </div>
        
        <label htmlFor="icon-button-file">
          <button onClick={handleResultView} className='resultViewButton'>
            건물 인식하기
            {/* 아이콘을 사용하는 경우 */}

          </button>
        </label>

    </div>
        
  </div>
</div>
  );
}


export default CameraComponent;