//前端图片
import React, {Component} from "react";

class FrontEndPicture extends Component{
    render() {
        return(
            <div>
                <div className="small_picture_div">
                    <a href="https://react.docschina.org/docs/hello-world.html">
                        <img  className="small_picture" src={require('../image/react1.jpg')}/>
                    </a>
                    <a href="https://www.runoob.com/html/html-tutorial.html">
                        <img  className="small_picture" src={require('../image/html.png')}/>
                    </a>
                    <a href="https://www.runoob.com/js/js-tutorial.html">
                        <img  className="small_picture" src={require('../image/js.jpg')}/>
                    </a>
                    <a href="http://nodejs.cn/">
                        <img  className="small_picture" src={require('../image/node.jpg')}/>
                    </a>
                    <a href="https://www.webpackjs.com/">
                        <img  className="small_picture" src={require('../image/webpack.png')}/>
                    </a>
                    <a href="https://jquery.com/">
                        <img  className="small_picture" src={require('../image/jquery.jpg')}/>
                    </a>
                    <a href="https://echarts.baidu.com/">
                        <img  className="small_picture" src={require('../image/echarts1.jpg')}/>
                    </a>
                </div>
            </div>
        )
    }

}

export default FrontEndPicture;