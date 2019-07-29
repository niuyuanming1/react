import React, {Component} from "react";
import {List, Avatar, Button, Skeleton, message,Input} from 'antd';
import './Content3.css';
import * as constant from "../constants";
import {UserForm} from "./UserForm";
const { Search } = Input;


class Content3 extends Component {
    state = {
        initLoading: true,
        loading: false,
        list: [1,2,3,4,5],
        alllist:[1,2,3],
        visible:false,
        updateuser:{}
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

    }
    //删除用户
    handleDelete = (item)=>{
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
                    list:list
                })
            } else {
                message.success("删除失败");
            }
        }).catch(err => {
            console.log(err)
        });
    }
    saveFormRef = (form) => {
        this.formRef = form;
    }
    //取消修改
    handleCancel=()=>{
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
                <List
                    className="demo-loadmore-list"
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item actions={[
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
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
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
                    ref={this.saveFormRef}
                    onCancel={this.handleCancel}
                    onCreate={this.userUpdate}
                />
                <Search className="search_box" placeholder="昵称"
                        onSearch={value =>
                            this.search(value)
                        }
                        enterButton
                />
            </div>
        )
    }
}

export default Content3;