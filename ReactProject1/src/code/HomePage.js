//首页
import React, {Component} from "react";
import {Layout, Menu, Icon, message} from 'antd';
import './HomePage.css';
import Content1 from './Content1';
import Content2 from './Content2';
import Content3 from './Content3';
import Content4 from './Content4';
import Content5 from './Content5';
import YunDish from './YunDish';
import * as constant from "../constants";
import {UserForm} from './UserForm';
import ColumnarECharts from './ColumnarECharts'
import KECharts from './KECharts'
import PieEcharts from './PieEcharts';
import FreeMindECharts from './FreeMindECharts'
const {Header, Sider, Content} = Layout;

const { SubMenu } = Menu;

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
    yun_dish=(e)=>{
        this.setState({
            key:99
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
                        <SubMenu
                            key="2"
                            title={
                                <span>
                                    <Icon type="aliyun" />
                                    <span>数据分析</span>
                                </span>
                                 }
                            onClick={this.change_key}
                        >
                            <Menu.Item key="9" onClick={this.change_key}>饼状图</Menu.Item>
                            <Menu.Item key="10" onClick={this.change_key}>柱状图</Menu.Item>
                            <Menu.Item key="11" onClick={this.change_key}>树状图</Menu.Item>
                            <Menu.Item key="13" onClick={this.change_key}>K线图</Menu.Item>
                            <Menu.Item key="12" onClick={this.change_key}>2048 game</Menu.Item>
                        </SubMenu>
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
                        <div className="yun_dish" onClick={this.yun_dish}>
                            <Icon type="aliyun" className="icon3"/>
                            <p className="icon1">我的网盘</p>
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
                                <Content1/>: this.state.key == 9 ?
                                <PieEcharts/>:this.state.key == 11?
                                <FreeMindECharts/>:this.state.key == 10?
                                <ColumnarECharts/> :this.state.key ==12 ?
                                            <Content2/>:this.state.key==13?
                                                <KECharts/>:this.state.key == 3 ?
                                <Content3 nowaday_user={content}/> : this.state.key == 4 ?
                                <Content4/> :this.state.key == 99 ?
                                <YunDish nowaday_user={content}/>:<Content5/>
                        }

                    </Content>
                </Layout>
            </Layout>

        );
    }
}

export default HomePage;