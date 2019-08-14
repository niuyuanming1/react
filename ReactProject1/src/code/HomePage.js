import React, {Component} from "react";
import {Layout, Menu, Icon, message} from 'antd';
import './HomePage.css';
import Content1 from './Content1';
import Content2 from './Content2';
import Content3 from './Content3';
import Content4 from './Content4';
import Content5 from './Content5';
import * as constant from "../constants";
import {UserForm} from './UserForm';
const {Header, Sider, Content} = Layout;


class HomePage extends Component {
    state = {
        collapsed: false,
        key:1,
        visible:false,
        active_user_id:0,
        active_user_email:"",
        active_user_password:"",
        active_user_username:"",
        active_user_phonenumber:0,
    };
    //获取当前用户信息
    componentWillMount(){
        fetch(`${constant.server}/homepage/`, constant.POSTHeader(this.props.location.search))
            .then(response => {
                return response.json();
            }).then(json => {
            if (json.status == 200) {
                this.setState({
                    active_user_id: json.id,
                    active_user_password: json.passWord,
                    active_user_email: json.email,
                    active_user_username: json.userName,
                    active_user_phonenumber: json.phoneNumber,
                })
            } else {
                message.success("获取当前用户失败！");
            }
        }).catch(err => {
            console.log(err)
        });
    }
    //缩小左侧导航栏
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    //选择左侧菜单
    change_key = (e)=>{
        this.setState({
            key:e.key
        })
    }
    //显示用户信息
    showUser = ()=>{
        this.setState({
            visible:true
        })
    }
     saveFormRef = (form) => {
        this.formRef = form;
    }
    //取消显示用户信息
    handleCancel=()=>{
        const form = this.formRef;
        form.resetFields();
        this.setState({
            visible:false
        })
    }
    //修改用户信息
    userUpdate=()=>{
        const form = this.formRef;
        form.validateFields((err, values) => {
            fetch(`${constant.server}/updateuser/`, constant.POSTHeader(values))
            .then(response => {
                return response.json();
            }).then(json => {
            if (json.status == 200) {
                message.success("修改成功");
            } else {
                message.success("修改失败！");
            }
        }).catch(err => {
            console.log(err)
        });
        })
        this.setState({
            visible:false
        })
    }
    render() {
        const content ={"id":this.state.active_user_id,"email":this.state.active_user_email,
                          "userName":this.state.active_user_username,"phoneNumber":this.state.active_user_phonenumber,
                            "passWord":this.state.active_user_password}
        return (
            <Layout className="layout">
                <Sider className="sider" trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">
                        <Icon type="gitlab" style={{ fontSize: '20px',marginLeft:'10px',marginTop:'5px'}} onClick={this.showUser}/>
                        <p className="name">{this.state.active_user_username}</p>
                        <UserForm
                            visible={this.state.visible}
                            content = {content}
                            ref={this.saveFormRef}
                            onCancel={this.handleCancel}
                            onCreate={this.userUpdate}
                            />
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" onClick={this.change_key}>
                            <Icon type="github" />
                            <span>技术展示</span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={this.change_key}>
                            <Icon type="aliyun" />
                            <span>数据分析</span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={this.change_key}>
                            <Icon type="database" />
                            <span>用户管理</span>
                        </Menu.Item>
                        <Menu.Item key="4" onClick={this.change_key}>
                            <Icon type="bug" />
                            <span>爬虫技术</span>
                        </Menu.Item>
                        <Menu.Item key="5" onClick={this.change_key}>
                            <Icon type="android" />
                            <span>人工智能</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div className="headerContent">
                            <a href="https://codeload.github.com/niuyuanming1/react/zip/master">
                                <Icon type="download" className="icon"/>
                            </a>
                            <p className="icon1">项目源码(前端)</p>
                            <a href="https://codeload.github.com/niuyuanming1/DjangoProject/zip/master">
                                <Icon type="download" className="icon"/>
                            </a>
                            <p className="icon1">项目源码(后端)</p>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        {
                            this.state.key == 1 ?
                                <Content1/>: this.state.key == 2 ?
                                <Content2/> :this.state.key == 3 ?
                                <Content3 nowaday_user={content}/> : this.state.key == 4 ?
                                <Content4/> :<Content5/>
                        }

                    </Content>
                </Layout>
            </Layout>

        );
    }
}

export default HomePage;