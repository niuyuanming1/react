import React, {Component} from "react";
import {Form, Icon, Input, Modal} from "antd";
class ShowInputForm extends  Component{
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
                title="上传文件"
                cancelText="取消"
                okText="上传"
                onOk={this.props.onCreate}
                onCancel={this.props.onCancel}
                >
                <Form>
                    <Form.Item
                        label="filename"
                    >
                        {getFieldDecorator('filename', {
                            rules: [{required: true, message: 'Please input your fileName!'}],
                        })(
                            <Input
                                prefix={<Icon type="file" />}
                                placeholder="文件名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item
                        label="url"
                    >
                        {getFieldDecorator('url', {
                            rules: [{required: true, message: 'Please input your url!'}],
                        })(
                            <Input
                                prefix={<Icon type="ie"/>}
                                placeholder="文件地址"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="size"
                    >
                        {getFieldDecorator('size', {
                            rules: [{required: true, message: 'Please input your filesize!'}],
                        })(
                            <Input
                                prefix={<Icon type="paper-clip" />}
                                placeholder="文件大小"
                            />
                        )}
                    </Form.Item>

                </Form>
            </Modal>
        )
    }
}
export const InputForm = Form.create()(ShowInputForm);