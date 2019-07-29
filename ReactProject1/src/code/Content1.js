import React, {Component} from "react";
import {Carousel, Menu, Icon} from 'antd';
import './Content1.css';
import FrontEndPicture from './FrontEndPicture';
import AfterEndPicture from './AfterEndPicture';
import SqlPicture from './SqlPicture';

class Content1 extends Component {
    state = {
    current: 'front_end',
  };
    //选择技术菜单
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
    render() {
        return (
            <div>
                <Carousel autoplay>
                    <div>
                        <a href="https://www.runoob.com/python3/python3-tutorial.html">
                            <img className="picture" src={require('../image/python2.jpg')}/>
                        </a>
                    </div>
                    <div>
                        <a href="https://react.docschina.org/docs/hello-world.html">
                            <img className="picture" src={require('../image/react1.jpg')}/>
                        </a>
                    </div>
                    <div>
                        <a href="https://www.mysql.com/">
                            <img className="picture" src={require('../image/mysql.jpg')}/>
                        </a>
                    </div>
                    <div>
                        <a href="https://redis.io/">
                            <img className="picture" src={require('../image/redis.png')}/>
                        </a>
                    </div>
                </Carousel>
                <div>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                        <Menu.Item key="front_end">
                            <Icon type="html5"/>
                            前端技术
                        </Menu.Item>
                        <Menu.Item key="after_end">
                            <Icon type="aliyun"/>
                            后端技术
                        </Menu.Item>
                        <Menu.Item key="sql">
                            <Icon type="github"/>
                            数据库
                         </Menu.Item>
                    </Menu>
                    <div>
                        {
                            this.state.current=="front_end"?<FrontEndPicture/>:
                                this.state.current=="after_end"?<AfterEndPicture/>:
                                    <SqlPicture/>
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default Content1;