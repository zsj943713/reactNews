import React from 'react';
import {Row, Col} from 'antd'
import { Link } from 'react-router';
import { Menu, Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    Checkbox,
    Modal,
    Card,
    notification
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
class CommonComments extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            comments: ''
        }
    }
    componentDidMount(){
        const myFetchOptions = {
            method: "GET"
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json=>{
                this.setState({
                    comments: json
                })
            })
    }
    handleSubmit(e){
        e.preventDefault;
        // console.log(e)
        var myFetchOptions = {
            method: "GET"
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                const formdata = values;
                fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
                    // console.log(11111)
                    this.componentDidMount();
                    console.log(this.refs.myinput)
                    // this.refs.input.value = "";
                })
            }else{
                //处理错误的
            }
        })
    }
    addUserCollection(){
        var myFetchOptions = {
            method: "GET"
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
            //收藏成功以后进行一下全局的提醒
                notification['success']({message: '收藏已经成功',description: "收藏文章已经成功"})
        });
    }
    render(){
        let {getFieldProps} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length ?
            comments.map((comment,index) => (
                <Card key = {index} title = {comment.UserName} extra = {<a href="#">发布于{comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            "没有加载任何评论"
        return (
            <div className="comment">
                <Row>
                    <Col span = {24}>
                        {commentList}
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
                            <FormItem label = "您的评论">
                                <Input type="textarea"  ref = "myinput"  placeholder="您可以发表您的评论" {...getFieldProps('remark',{initialvalie: ""})}/>
                            </FormItem>
                            <Button type = "primary" htmlType= "submit">提交评论</Button>
                            &nbsp;&nbsp;
                            <Button type = "pirmary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default CommonComments = Form.create({})(CommonComments);