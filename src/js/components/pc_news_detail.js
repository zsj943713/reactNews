import React from 'react';
import {Col, Row, BackTop} from 'antd'
import PCHeader from "./pc_header"
import PCFooter from './pc_footer'
import PCNewsImageBlock from "./pc_news_image_block";
import CommonComments from "./common_comments"

export default class PCNewsDetail extends React.Component {
constructor(props){
    super(props);
    this.state = {
        newsItem: ''
    }
}
componentDidMount(){
    const myFetchOptions = {
        method: "GET"
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions)
        .then(response => response.json())
        .then(json=>{
            this.setState({
                newsItem: json
            })
            console.log(this.props.params.uniquekey)
            console.log(this.props)
            document.title = this.state.newsItem.title +  "-----  张树杰 react驱动"
        })
}
createMarkup(){
    return {__html: this.state.newsItem.pagecontent};
}
render(){
    return (
        <div>
            <PCHeader></PCHeader>
            <Row>
                <Col span = {2}></Col>
                <Col span = {14} className="container">
                    <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                    <hr/>
                    <CommonComments uniquekey={this.props.params.uniquekey}/>
                    {/*{this.props.params.uniquekey}*/}
                </Col>
                <Col span = {6}>
                    <PCNewsImageBlock count = {40} type = "top" width = "100%" cardTitle = "相关新闻" imageWidth = "152px"></PCNewsImageBlock>
                </Col>
                <Col span = {2}></Col>
            </Row>
            <PCFooter></PCFooter>
            <BackTop></BackTop>
        </div>
    )
}
}