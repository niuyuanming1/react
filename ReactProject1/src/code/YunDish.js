import React, {Component} from "react";
import * as constant from "../constants";
import {Avatar, List, message, Skeleton,Anchor,Row,Col,Button} from "antd";
import "./YunDish.css";
import {InputForm} from "./InputForm";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Modal} from "antd/lib/index";
//import {CopyToClipboard} from 'react-copy-to-clipboard';



class YunDish extends Component{
    state = {
        list : [],
        nowaday_user:this.props.nowaday_user,
        visible:false,
        value: '',
        copied: false,
    }
    componentWillMount(){
        let body = Object.assign({},this.state.nowaday_user,{re:"list"});
        fetch(`${constant.server}/yundish/`, constant.POSTHeader(body))
            .then(response => {
                return response.json();
            }).then(json => {
            if (json.status == 200) {
                this.setState({
                    list : json.result
                })
            } else {
                message.success("获取云盘失败！");
            }
        }).catch(err => {
            console.log(err)
        });
    }
    delect = (item) => {
        confirmAlert({
            title: '确定删除吗？',
            message: '你确定这么做吗。',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(`${constant.server}/yundelete/`, constant.POSTHeader(item))
                            .then(response => {
                                return response.json();
                            }).then(json => {
                            if (json.status == 200) {
                                let list = this.state.list.filter(i => i.id !== item.id)
                                this.setState({
                                    list: list
                                })
                                message.success("删除成功");
                            } else {
                                message.success("删除失败！");
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
    }
    input_button=()=>{
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
    onCreate = () => {
        const form = this.formRef;
        form.validateFields((err, values) => {
            let body = Object.assign({}, values, this.state.nowaday_user);
            fetch(`${constant.server}/yuninsert/`, constant.POSTHeader(body))
                .then(response => {
                    return response.json();
                }).then(json => {
                if (json.status == 200) {
                    let body = Object.assign({}, this.state.nowaday_user, {re: "list"});
                    fetch(`${constant.server}/yundish/`, constant.POSTHeader(body))
                        .then(response => {
                            return response.json();
                        }).then(json => {
                        if (json.status == 200) {
                            this.setState({
                                list: json.result
                            })
                        } else {
                            message.success("获取云盘失败！");
                        }
                    }).catch(err => {
                        console.log(err)
                    });
                    message.success("上传成功");
                } else {
                    message.success("上传失败！");
                }
            }).catch(err => {
                console.log(err)
            });
        });
        this.setState({
            visible: false
        })
    }
    share=(item)=>{
        message.warning('此功能尚未实现');
    }
    copy=(item)=>{
        message.warning('此功能尚未实现');
    }
    render() {
        return (
            <div>
                <Anchor affix={true}>
                    <Row>
                        <Col span={24}>
                            <Row className="" >
                                <Col className="yuncol" style={{marginLeft:"40px"}} span={3}>ID</Col>
                                <Col className="yuncol" style={{marginLeft:"40px"}} span={3}>文件名</Col>
                                <Col className="yuncol" style={{marginLeft:"60px"}} span={3}>文件大小</Col>
                                <Col className="yuncol" style={{marginLeft:"28.5%"}} span={1}>分享</Col>
                                <Col className="yuncol" span={1}>下载</Col>
                                <Col className="yuncol" span={1}>删除</Col>
                                <Col className="yuncol" span={1}>复制</Col>
                            </Row>
                        </Col>
                    </Row>
                </Anchor>
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={this.state.list}
                    renderItem={item => (
                        <List.Item actions={[
                            <a onClick={() => {this.share(item)}}>分享</a>,
                            <a href={item.url}>下载</a>,
                            <a onClick={() => {this.delect(item)}}>删除</a>,
                            <a onClick={() => {this.copy(item)}}>复制连接</a>
                        ]}>
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <a onClick={() => {

                                        }}>
                                            <Avatar icon="folder-open"
                                                    style={{color: "yellow", backgroundColor: "#7aeb6f"}}/>
                                        </a>
                                    }
                                    title={<a href="https://ant.design">{item.id}</a>}
                                    description="用户id"
                                />
                                <div className="yunliem" style={{marginRight:"15%"}}>{item.name}</div>
                                <div className="yunliem" style={{marginRight:"40%"}}>{item.size}</div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
                <Button type="primary" icon="cloud-upload" size='large' onClick={this.input_button}>
                     上传
                </Button>

                <InputForm
                    visible={this.state.visible}
                    ref={this.saveFormRef}
                    onCancel={this.handleCancel}
                    onCreate={this.onCreate}
                />

            </div>

        )
    }
}
export default YunDish;