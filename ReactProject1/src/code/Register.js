import React, { Component } from 'react';
import {RegisterForm} from './RegisterForm';
import './Register.css'


class Register extends Component {
    render() {
        return(
            <div>
                <img className="timg1" src={require('../image/ai1.jpg')}/>
                <div className="registerForm">
                    <h2 className="title">填写注册信息</h2>
                    <RegisterForm/>
                </div>
            </div>
        )
    }

}

export default Register;