import React from 'react';
import {Card} from 'antd';
import {Link, Router, Route, browserHistory} from 'react-router';

export default class PCNewsImageBlock extends React.Component {
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
        const styleImage = {
            display: "block",
            width: this.props.imageWidth,
            height: "90px"
        };
        const styeH3 = {
            width: this.props.imageWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        };
        const {news} = this.state;
        const newsList = news.length ?
            news.map((newsItem,index)=>(
                <div key = {index} class = "imageblock">
                    <Link to = {`details/${newsItem.uniquekey}`} target="_blank">
                        <div class = "custom-image">
                            <img style = {styleImage} src={newsItem.thumbnail_pic_s} alt=""/>
                        </div>
                        <div className="custom-card">
                            <h3 style = {styeH3}>{newsItem.title}</h3>
                            <p>{newsItem.author_name}</p>
                        </div>
                    </Link>
                </div>
            ))
            :
            '没有加载到任何数据'
        return(
            <div className="topNewsList">
                <Card title = {this.props.cartTitle} bordered = {true} style = {{width: this.props.width}}>
                    <ul>
                        {newsList}
                    </ul>
                </Card>
            </div>
        )
    }
}
