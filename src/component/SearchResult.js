import React/*, {useState}*/ from "react";
import { Link } from 'react-router-dom';

const SearchResult = ({ data = [] }) => {

    // const [selectedItem ,setSelectedItem] = useState(null);

    // const handleItemClick=(item)=>{
    //     setSelectedItem(item)
    // };

    if (data.length <= 0) {
        return <div className="empty-box">검색 결과가 없습니다</div>;
    }
    
    return (
        <div>
            <ul className="result">
                {data.map(({id,name,imageUrl,tel}) => (
                    <Link to={`/items/${id}`}><li key={id}>
                        <img src={imageUrl} alt ="img"/>
                        <p style={{color: '#215017'}}> {name}</p>
                        <p style= {{color: '#555655'}}>{tel}</p>
                    </li></Link>
                ))}
            </ul>
        </div>
    );
};

export default SearchResult;