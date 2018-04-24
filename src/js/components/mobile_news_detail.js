import React from 'react';
import {Col, Row, BackTop} from 'antd'
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
import CommonComments from "./common_comments"
export default class MobileNewsDetail extends React.Component {
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
            document.title = this.state.newsItem.title +  "-----  张树杰 react驱动"
        })
}
createMarkup(){
    return {__html: this.state.newsItem.pagecontent};
}
render(){
    return (
        <div id = "mobileDetailsContainer">
            <MobileHeader></MobileHeader>
            <div className= "ucmobileList">
                <Row>
                    <Col span = {2}></Col>
                    <Col span = {24} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <hr/>
                        <CommonComments uniquekey = {this.props.params.uniquekey}></CommonComments>
                    </Col>
                    {/*<Col span = {6}>*/}
                        {/*<PCNewsImageBlock count = {40} type = "top" width = "100%" cardTitle = "相关新闻" imageWidth = "152px"></PCNewsImageBlock>*/}
                    {/*</Col>*/}
                    <Col span = {2}></Col>
                </Row>
                <MobileFooter></MobileFooter>
                <BackTop></BackTop>
            </div>
        </div>
    )
}
}