import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './style.css';
import Nav from './component/Nav.js';
import NoticePage from './component/NoticePage.js';
// import Crawler from './Crawler.js';
// import Product from './component/product.js'

function App() {

  return (
    // <Router>
      <div>
        <Nav />
        <NoticePage />
    </div>
    //   {/* <div>
    //     <Routes>
    //       <Route path="/" element={<NoticePage />}/>
    //     </Routes>
    // </div> */}
    // </Router>
    
  );
}

export default App;


// import React from 'react';
// import NoticePage from "./component/NoticePage.js";
// import './App.css';

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             noticeList: []
//         }
//     }

//     componentDidMount() {
//         this.callAPI()
//     }    
//     callAPI = async () => {  
//         const response = await (await fetch('http://localhost:3000/noticeBoard')).json()  
//         this.setState({ noticeList: response });  
//         console.log("hi");      
//     }
//     render() {
//         return (
//             <div className="App" >     
//                 <NoticePage noticeArr={this.state.noticeList} />
//             </div>
//         );
//     }
// }
// export default App;
