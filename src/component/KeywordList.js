import React from "react";
import store from "./Store.js";

export default class KeywordList extends React.Component {
    constructor() {
        super();

        this.state = {
            keywordList: [],
        };
    }

    componentDidMount() {
        const keywordList = store.getKeywordList();
        this.setState({ keywordList });
    }

    render() {
        const { onClick } = this.props;
        const { keywordList } = this.state;

        return (
            // <List data={keywordList} onClick={onClick} />
            // <ul className="result">
            //     {keywordList.map(({ id, keyword }) => (
            //         <li key={id} style={{float:"left", marginRight:'10px'}}>
            //             <p className={'oftenKeyword'} onClick={onClick}> {keyword} </p>
            //         </li>
            //     ))}
            // </ul>
            <ul className="list">
                {keywordList.map(({ id, keyword}) => (
                    <li key={id} style={{float:'left'}} onClick={() => onClick(keyword)}>
                        {/*{hasIndex && <span className="number">{index + 1}</span>}*/}
                        <span className={'oftenKeyword'}>{keyword}</span>
                        {/*{hasDate && <span className="date">{formatRelativeDate(date)}</span>}*/}
                        {/*{!!onRemove && (*/}
                        {/*    <button*/}
                        {/*        className="btn-remove"*/}
                        {/*        onClick={(event) => handleClickRemove(event, keyword)}*/}
                        {/*    />*/}
                        {/*)}*/}
                    </li>
                ))}
            </ul>
        )
    }
}