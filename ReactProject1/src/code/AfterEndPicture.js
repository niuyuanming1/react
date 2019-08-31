//后端图片
import React, {Component} from "react";

class AfterEndPicture extends Component{
    render() {
        return(
            <div>
                <div className="small_picture_div">
                    <a href="https://docs.djangoproject.com/zh-hans/2.1/">
                        <img  className="small_picture" src={require('../image/django2.jpg')}/>
                    </a>
                    <a href="https://www.runoob.com/python3/python3-tutorial.html">
                        <img  className="small_picture" src={require('../image/python2.jpg')}/>
                    </a>
                    <a href="http://www.w3school.com.cn/ajax/index.asp">
                        <img  className="small_picture" src={require('../image/ajax.jpg')}/>
                    </a>
                    <a href="http://www.w3school.com.cn/json/index.asp">
                        <img  className="small_picture" src={require('../image/json.png')}/>
                    </a>
                </div>
            </div>
        )
    }

}

export default AfterEndPicture;