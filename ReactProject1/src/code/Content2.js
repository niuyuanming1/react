import React, {Component} from "react";
import ColumnarECharts from './ColumnarECharts'
import PieEcharts from './PieEcharts';
import FreeMindECharts from './FreeMindECharts'
// import FreeMindECHarts2 from './FreeMindECHarts2'
import {Button, message} from 'antd';
import './Content2.css';
import Tiles from './Tiles';
import * as constant from "../constants";

class Content2 extends Component{
    state ={
        visible:true,
        block:"none",
    }
    showGame=()=>{

        this.setState({
            visible:!this.state.visible,
            block:this.state.visible?"block":"none"
        })
    }
    render() {
        return(
            <div>
                <Button type="primary" onClick={this.showGame}>2048</Button>
                <div style={{display:this.state.block}}>
                    <Tiles/>
                </div>
                <div className="columnarecharts">
                    <ColumnarECharts/>
                </div>
                <div className="pieecharts">
                    <PieEcharts/>
                </div>
                <div className="freemindcharts">
                    <FreeMindECharts/>
                </div>

            </div>
        )
    }
}
export default Content2;