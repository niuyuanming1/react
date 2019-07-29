import React, {Component} from "react";
import {Form, Icon, Input, Modal, Select} from "antd";
const { Option } = Select;

class ShowUserForms extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );
        return(
            <Modal
                visible={this.props.visible}
                title="用户信息"
                cancelText="取消"
                okText="修改"
                onOk={this.props.onCreate}
                onCancel={this.props.onCancel}
            >
                <Form >
                    <Form.Item
                        {...formItemLayout}
                        label="id"
                    >
                        {getFieldDecorator('id', {
                            initialValue:this.props.content.id,
                            rules: [{required: true, message: 'Please input your id!'}],
                        })(
                            <Input readOnly/>,
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="用户名"
                    >
                        {getFieldDecorator('userName', {
                            initialValue:this.props.content.userName,
                            rules: [{required: true, message: 'Please input your userName!'}],
                        })(
                            <Input
                                prefix={<Icon type="user"/>}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('passWord', {
                            initialValue:this.props.content.passWord,
                            rules: [{required: true, message: 'Please input your passWord!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="邮箱"
                    >
                        {getFieldDecorator('email', {
                            initialValue:this.props.content.email,
                            rules: [{required: true, message: 'Please input your email!'}],
                        })(
                            <Input
                                prefix={<Icon type="mail"/>}
                                placeholder="E-mail"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="电话"
                    >
                        {getFieldDecorator('phoneNumber', {
                            initialValue:this.props.content.phoneNumber,
                            rules: [{required: true, message: 'Please input your phoneNumber!'}],
                        })(
                            <Input
                                addonBefore={prefixSelector}
                            />,
                        )}
                    </Form.Item>

                </Form>
            </Modal>
        )
    }
}
export const UserForm = Form.create()(ShowUserForms);
