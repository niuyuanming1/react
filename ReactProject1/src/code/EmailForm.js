import React, {Component} from "react";
import {Form, Input, Modal} from "antd";
const { TextArea } = Input;

class EmailForms extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Modal
                visible={this.props.visible}
                title="邮件"
                cancelText="取消"
                okText="发送"
                onOk={this.props.onCreate}
                onCancel={this.props.onCancel}
            >
                <Form>
                    <Form.Item label="标题">
                        {getFieldDecorator('title', {
                            rules: [{required: true,
                                    message: 'Please input your title!'}],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="发送至邮箱">
                        {getFieldDecorator('email', {
                            initialValue:this.props.nowaday_user.email,
                            rules: [{required: true,
                                    message: 'Please input your title!'}],
                        })(<Input readOnly/>)}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                    >
                        {getFieldDecorator('content', {
                            rules: [{required: true, message: 'Please input your content!'}],
                        })(
                            <TextArea style={{height:200}}/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
export const EmailForm = Form.create()(EmailForms);