import React, {Component} from "react";

class SqlPicture extends Component{
    render() {
        return(
            <div>
                <div className="small_picture_div">
                    <a href="https://www.mysql.com/">
                        <img  className="small_picture" src={require('../image/mysql.jpg')}/>
                    </a>
                    <a href="https://redis.io/">
                        <img  className="small_picture" src={require('../image/redis2.png')}/>
                    </a>
                    <a href="https://www.mongodb.com/">
                        <img  className="small_picture" src={require('../image/mongodb.png')}/>
                    </a>
                </div>
            </div>
        )
    }

}

export default SqlPicture;