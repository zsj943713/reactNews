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
    Modal
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
 class PCHeader extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            current: "top",
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
        }
    };
    componentWillMount(){
        if(localStorage.userid != ""){
            this.setState({
                hasLogined: true,
                userNickName: localStorage.userNickName,
                userid: localStorage.userid
            })
        }
    }
     setModiaVisible(value){
         this.setState({
             modalVisible:value
         })
     }
     handleClick(e){
         // console.log(e.key)
         if(e.key !== "register"){
             // console.log("不需要弹出模态框")
             this.setState({
                 current: e.key
             })
             this.setModiaVisible(false);
         }else{
             // console.log("弹出模态框")
             this.setState({
                 current:"register"
             })
             this.setModiaVisible(true);
         }
     }
     handleSubmit(e) {
         e.preventDefault();
         const myFetchOptions = {
             method: "GET"
         }
         this.props.form.validateFields((err, values) => {
             if (!err) {
                 //感觉你应该参考一下官网的这个栗子试试，values就是表单对象，你可以看看了来
                 console.log(values);
                 const formData = values;
                 fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+
                     "&password="+formData.password+
                     "&r_userName=" + formData.r_userName +
                     "&r_password=" + formData.r_password +
                     "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
                     .then(response => response.json())
                     .then(json=>{
                         // console.log(json.NickUserName)
                         // console.log(json.UserId)
                         this.setState({
                             userNickName: json.NickUserName,
                             userid: json.UserId,
                         })
                         localStorage.userid = json.UserId;
                         localStorage.userNickName = json.NickUserName
                     });
                 this.setModiaVisible(false);
                 message.success("请求成功");
                 if(this.state.action == "login"){
                     this.setState({
                         hasLogined: true
                     })
                 }

             }else{
                 //处理错误
             }
         });
     }
     callback(key){
         if(key == 1){
             this.setState({
                 action: "login"
             })
         }else{
             this.setState({
                 action: "register"
             })
         }
     }
     logout(){
         localStorage.userid = "";
         localStorage.userNickName = "";
         this.setState({
             hasLogined: false
         })
     }
    render(){
        let {getFieldProps } = this.props.form ;
        const userShow = this.state.hasLogined ?
            <Menu.Item key = "logout" class = "register">
                    <Button type = "primary" htmlType = "button">{this.state.userNickName}</Button>
                &nbsp; &nbsp; &nbsp;
                <Link traget = "_blank" id = "inlineblock" to = {`/usercenter`}>
                    <Button type = "dashed" htmlType = "button">个人中心</Button>
                </Link>
                &nbsp; &nbsp; &nbsp;
                <Button type = "ghost" htmlType = "button" onClick={this.logout.bind(this)}>退出</Button>
            </Menu.Item>
            :
            <Menu.Item key = "register" class = "register">
                <Icon type = "appstore"  />注册/登陆
            </Menu.Item>;
        return(
            <header>
                <Row>
                    <Col span = {2}></Col>
                    <Col span = {4}>
                        <a href="/" class = "logo">
                            <img src="./src/images/logo.png" alt=""/>
                            <span>REACTNEWS</span>
                        </a>
                    </Col>
                    <Col span = {16}>
                        <Menu  mode="horizontal" selectedKeys={[this.state.current]} onClick={(e) => this.handleClick(e)}>
                            <Menu.Item key="top">
                                <Icon type="appstore" />头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore" />社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore" />国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore" />国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore" />娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore" />体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore" />科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore" />时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>
                        <Modal  title = "用户中心" wrapClassName = "vertical-center-modal" visible = {this.state.modalVisible}
                        onCancel={()=>this.setModiaVisible(false)}
                        onOk={()=>this.setModiaVisible(false) }
                                okText="关闭">
                            <Tabs type = "card" onChange = {this.callback.bind(this)}>
                                <TabPane tab = "登陆" key = "1">
                                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label = "账户">
                                            <Input placeholder = "请输入您的账号" {...getFieldProps("userName")}>
                                            </Input>
                                        </FormItem>
                                        <FormItem label = "密码">
                                            <Input type = "password" placeholder = "请输入您的密码" {...getFieldProps("password")}>
                                            </Input>
                                        </FormItem>
                                        <Button type = "primary" htmlType="submit">
                                            登录
                                        </Button>
                                    </Form>
                                </TabPane>


                                <TabPane tab = "注册" key = "2">
                                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label = "账户">
                                            <Input placeholder = "请输入您的账号" {...getFieldProps("r_userName")}>
                                            </Input>
                                        </FormItem>
                                        <FormItem label = "密码">
                                            <Input type = "password" placeholder = "请输入您的密码" {...getFieldProps("r_password")}>
                                            </Input>
                                        </FormItem>
                                        <FormItem label = "确认密码">
                                            <Input type = "password" placeholder = "请再次输入您的密码" {...getFieldProps("r_confirmPassword")}>
                                            </Input>
                                        </FormItem>
                                        <Button type = "primary" htmlType="submit">
                                            注册
                                        </Button>
                                    </Form>
                                </TabPane>
                            </Tabs>

                        </Modal>
                    </Col>
                    <Col span = {2}></Col>
                </Row>
            </header>
        )
    }
}
export default PCHeader = Form.create({})(PCHeader)