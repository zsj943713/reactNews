import React from 'react';
import {Card} from 'antd';
import {Link, Router, Route, browserHistory} from 'react-router';

export default class PCNewsBlock extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            news: ''
        }
    }
    componentWillMount(){
        const myFetchOptions = {
            method: "GET"
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count,myFetchOptions)
            .then(response=>response.json())
            .then(json=>this.setState({
                news: json
            }))
    }
    render(){
        const {news} = this.state;
        const newsList = news.length ?
            news.map((newsItem,index)=>(
                <li key = {index}>
                    <Link to = {`details/${newsItem.uniquekey}`} target="_blank">
                        {newsItem.title}
                    </Link>
                </li>
            ))
         :
         '没有加载到任何数据'
        return(
            <div className="topNewsList">
                <Card>
                    <ul>
                        {newsList}
                    </ul>
                </Card>
            </div>
        )
    }
}
