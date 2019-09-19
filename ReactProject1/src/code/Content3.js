import React, {Component} from "react";
import {List, Avatar, Button, Skeleton, message,Input} from 'antd';
import './Content3.css';
import * as constant from "../constants";
import {UserForm} from "./UserForm";
import {DialogBoxForm} from "./DialogBoxForm";
import {EmailForm} from "./EmailForm";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
const { Search } = Input;


var chatReturnDate=[];

class Content3 extends Component {
    state = {
        initLoading: true,
        loading: false,
        list: [1,2,3,4,5],
        alllist:[1,2,3],
        visible:false,
        dialogBoxVisible:false,
        updateuser:{},
        chatReturnDate:chatReturnDate,
        socket_user:{},
        nowaday_user:this.props.nowaday_user,
        showEmailForm:false,
    };
    //获取所有用户
    componentDidMount() {
        fetch(`${constant.server}/alluser/`, constant.GETHeader)
            .then(response => {
                return response.json();
            }).then(json => {
            if (json.status == 200) {
                let alluserlist = [];
                let fivelist = [];
                if (Object.keys(json.resule).length <= 5) {
                    for (var i = 0; i < Object.keys(json.resule).length; i++) {
                        fivelist.push(json.resule[i + 1])
                    }
                } else {
                    for (var i = 0; i < 5; i++) {
                        fivelist.push(json.resule[i + 1])
                    }
                }
                for(var i=0;i<Object.keys(json.resule).length;i++){
                    alluserlist.push(json.resule[i+1])
                }
                this.setState({
                    list:fivelist,
                    alllist:alluserlist
                })
            } else {
                message.success("获取当前用户失败！");
            }
        }).catch(err => {
            console.log(err)
        });
        this.setState({
            initLoading: false,
        });

    }
    //加载更多
    onLoadMore = () => {
        this.setState({
            loading: true,
            list:this.state.alllist,
        });
        this.setState({
            loading: false,
        })

    };
    //展示编辑页面
    showUpdateModal =(item)=>{
        this.setState({
            updateuser:item,
            visible:true
        })

    };
    //显示发邮件页
    showEmail=(item)=>{
        this.setState({
            showEmailForm:true
        })
    };
    //删除用户
    handleDelete = (item)=>{
        confirmAlert({
            title: '确定删除吗？',
            message: '你确定这么做吗。',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`${constant.server}/deleteuser/`, constant.POSTHeader(item))
                            .then(response => {
                                return response.json();
                            }).then(json => {
                            if (json.status == 200) {
                                const list = this.state.list;
                                list.forEach(function (item, index, arr) {
                                    if (item.id == json.deleteid) {
                                        arr.splice(index, 1);
                                        message.success("删除成功");
                                    }
                                });
                                this.setState({
                                    list: list
                                })
                            } else {
                                message.success("删除失败");
                            }
                        }).catch(err => {
                            console.log(err)
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };
    emailSaveFormRef=(form)=>{
        this.eformRef = form;
    };
    saveFormRef = (form) => {
        this.formRef = form;
    };
    updateSaveFormRef=(form)=>{
        this.uformRef = form;
    };
    //取消修改
    handleCancel=()=>{
        this.setState({
            visible:false
        })
    };
    //修改用户信息
    userUpdate=()=>{
        const form = this.uformRef;
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
            console.log(err);
            message.success("修改失败！");
        });
        })
        this.setState({
            visible:false
        })
    };
    //根据用户名搜索
    search = (value) =>{
        let list2 = [];
        let list =this.state.list;
        list.map((item)=>{
            if(item.userName == value){
                list2.push(item)
            }
        })
        this.setState({
            list:list2
        })

    };
    //启动socket
    socket =(item)=>{
        this.setState({
            socket_user:item,
            dialogBoxVisible:!this.state.dialogBoxVisible,
        });
        fetch(`${constant.server}/socket/`, constant.POSTHeader(item))
            .then(response => {
                return response.json();
            }).then(json => {
            if (json.status == 200) {
                message.success("服务端启动成功");
                message.success("客户端启动成功");
            } else {
                message.error("创建socket失败");
            }
        }).catch(err => {
            console.log(err)
        });
    };
    //取消发送邮件
    emailFormCancel=()=>{
        this.setState({
            showEmailForm:false
        })
    };
    //关闭聊天
    DialogBoxFormCancel=()=>{
        this.setState({
            dialogBoxVisible:false
        })
    };
    //发送邮件
    emailFormCreate=()=>{
        const form = this.eformRef;
        form.validateFields((err, values) => {
            //let body = Object.assign({},values,{user:this.state.nowaday_user});
            fetch(`${constant.server}/email/`, constant.POSTHeader(values))
                .then(response => {
                    return response.json();
                }).then(json => {
                if (json.status == 200) {
                    message.success("邮件发送成功！");
                } else {
                    message.error("邮件发送失败！");
                }
            }).catch(err => {
                console.log(err)
            });
        })
        this.setState({
            showEmailForm:false
        })
    };
    //发送聊天内容
    DialogBoxFormCreate=()=>{
        const form = this.formRef;
        form.validateFields((err, values) => {
            let body = Object.assign({},values,{user:this.state.nowaday_user});
            fetch(`${constant.server}/chat/`, constant.POSTHeader(body))
                .then(response => {
                    return response.json();
                }).then(json => {
                if (json.status == 200) {


                } else {
                    message.error("聊天内容发送失败！");
                }
            }).catch(err => {
                console.log(err)
            });
        })
    };
    export = () => {
        fetch(`${constant.server}/export/`, constant.GETHeader)
            .then(response => {
                if (response.status == 200){
                    message.success("导出成功！");
                }
            }).catch(err => {
            console.log(err);
            message.error("导出失败！");
        });
    }
    render() {
        const {initLoading, loading, list} = this.state;
        const loadMore =
            !initLoading && !loading ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button onClick={this.onLoadMore}>loading more</Button>
                </div>
            ) : null;
        return (
            <div>
                <a className="export" href="http://127.0.0.1:8000/export/">
                    <a onClick={()=>{this.export()}}>导出CSV文件</a>
                </a>
                <List
                    className="demo-loadmore-list"
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item actions={[
                            <a onClick={() => {
                                this.showEmail(item)
                            }}>邮件发送</a>,
                            <a onClick={() => {
                                this.showUpdateModal(item)
                            }}>编辑</a>,
                            <a onClick={() => {
                                this.handleDelete(item)
                            }}>删除</a>]
                        }>
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <a onClick={() => {
                                            this.socket(item)
                                        }}>
                                            <Avatar
                                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                        </a>
                                    }
                                    title={<a href="https://ant.design">{item.id}</a>}
                                    description="用户id"
                                />
                                <div className="alllist">{item.userName}</div>
                                <div className="alllist">{item.email}</div>
                                <div className="alllist">{item.phoneNumber}</div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
                <UserForm
                    visible={this.state.visible}
                    content={this.state.updateuser}
                    ref={this.updateSaveFormRef}
                    onCancel={this.handleCancel}
                    onCreate={this.userUpdate}
                />
                <Search className="search_box" placeholder="昵称"
                        onSearch={value =>
                            this.search(value)
                        }
                        enterButton
                />
                <DialogBoxForm
                    visible={this.state.dialogBoxVisible}
                    content={chatReturnDate}
                    socket_user={this.state.socket_user}
                    nowaday_user={this.props.nowaday_user}
                    ref={this.saveFormRef}
                    onCancel={this.DialogBoxFormCancel}
                    onCreate={this.DialogBoxFormCreate}/>
                <EmailForm
                    visible={this.state.showEmailForm}
                    nowaday_user={this.state.nowaday_user}
                    ref={this.emailSaveFormRef}
                    onCancel={this.emailFormCancel}
                    onCreate={this.emailFormCreate}/>
            </div>
        )
    }
}

export default Content3;