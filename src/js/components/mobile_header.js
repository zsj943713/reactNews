import React from 'react';
import {Row, Col} from 'antd';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router'
class MobileHeader extends React.Component {
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
                fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password
                    +"&r_userName=" + formData.r_userName + "&r_password="
                    + formData.r_password + "&r_confirmPassword="
                    + formData.r_confirmPassword, myFetchOptions)
                    .then(response => response.json())
                    .then(json=>{
                        this.setState({
                            userNickName: json.NickUserName,
                            userid: json.UserId
                        })
                        localStorage.userid = json.UserId;
                        localStorage.userNickName = json.NickUserName
                    });
                if(this.state.action == "login"){
                    this.setState({
                        hasLogined: true
                    })
                }
                this.setModiaVisible(false);
                message.success("请求成功");

            }else{
                //处理错误
            }
        });
    }
    loginEnter(){
        this.setModiaVisible(true)
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
    render(){
        let {getFieldProps } = this.props.form ;
        const userShow = this.state.hasLogined ?
            <Link to = {`MobileUserCenter`}>
                <Icon type = "inbox"/>
            </Link>
            :
            <Link>
                <Icon type = "setting" onClick={this.loginEnter.bind(this)}/>
            </Link>
        return(
            <div id = "mobileheader">
                <header>
                    <img src="./src/images/logo.png" alt=""/>
                    <span>REACTNEWS</span>
                    {userShow}
                </header>
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
                                    登陆
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
            </div>
        )
    }
}
export default MobileHeader =Form.create({})(MobileHeader)