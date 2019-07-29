import {Form, Icon, Input, Button, Checkbox} from 'antd';
import React, {Component} from "react";
import 'antd/dist/antd.css';
import './LoginForm.css';
import {message} from "antd/lib/index";
import {HomePage} from './HomePage';
import axios from 'axios';
import * as constant from '../constants';



axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';


class NormalLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    //登录
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                fetch(`${constant.server}/login/`,constant.POSTHeader(values))
                    .then(response=>{
                        return response.json();
                    }).then(json=>{
                        if(json.status == 200){
                            window.location.href="homepage?email="+values.email;
                        } else {
                            message.success("请输入正确的用户名或者密码！");
                        }
                    }).catch(err=>{
                    console.log(err)
                    });

            }
        });
    };

    // async fun(params) {
    //     let res = await axios.get(`${constant}/hello/`, {params});
    //     console.log("res:"+res);
    // }


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: 'Please input your email!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="E-mail"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {/*{getFieldDecorator('remember', {*/}
                    {/*    valuePropName: 'checked',*/}
                    {/*    initialValue: true,*/}
                    {/*})(<Checkbox className="font">Remember me</Checkbox>)}*/}
                    {/*<a className="login-form-forgot" href="">*/}
                    {/*    Forgot password*/}
                    {/*</a>*/}
                    <div>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </div>
                    <a href="/register" className="font">register now!</a>
                </Form.Item>
            </Form>
        );
    }
}


export const LoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);