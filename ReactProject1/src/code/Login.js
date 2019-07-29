import React, { Component } from 'react';
import './login.css'
import {LoginForm} from './LoginForm'

class Login extends Component{
    render() {
        return(
            <div className="aa">
                <img className="python1" src={require('../image/timg2.jpg')} />
                <div className="loginform">
                    <LoginForm/>
                </div>
            </div>
        )
    }

}

export default Login;
