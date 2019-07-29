import React, {Component} from "react";
import './Tiles.css';
import * as constant from "../constants";
import {message} from "antd";
class Tiles extends Component{
    constructor(props){
        super(props);
        this.state={
            list: [

            ]
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyDown)
        fetch(`${constant.server}/game/`,constant.GETHeader)
                    .then(response=>{
                        return response.json();
                    }).then(json=>{
                        if(json.status == 200){
                            this.setState({
                                list:json.result
                            })
                        } else {
                            message.success("请按上下左右键！");
                        }
                    }).catch(err=>{
                    console.log(err)
                    });
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown)
    }

    onKeyDown = (e) => {
        const value = [e.keyCode,this.state.list]
        fetch(`${constant.server}/updategame/`,constant.POSTHeader(value))
                    .then(response=>{
                        return response.json();
                    }).then(json=>{
                        if(json.status == 200){
                            this.setState({
                                list:json.result
                            })
                        } else {
                            message.success("请按上下左右键！");
                        }
                    }).catch(err=>{
                    console.log(err)
                    });
    }
    render() {

        return(
            <div className="board">
                {this.state.list.map( e =>{
                    return(
                    <div>
                        <span style={{float: "left"}} className={"value" + e[0]}>{e[0]}</span>
                        <span style={{float: "left"}} className={"value" + e[1]}>{e[1]}</span>
                        <span style={{float: "left"}} className={"value" + e[2]}>{e[2]}</span>
                        <span style={{float: "left"}} className={"value" + e[3]}>{e[3]}</span>
                    </div>)
                })}
            </div>
        )
    }
}
export default Tiles