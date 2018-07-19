import React from 'react'
import { Input, Card, Button, Modal, Form, Radio, DatePicker, Select } from 'antd';
import axios from './../../axios';
import utils from './../../utils/utils';
import ETable from './../../components/Etable';
import BaseForm from './../../components/baseForm'
import './../../style/common.less';
import moment from 'moment'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
export default class User extends React.Component {
    formList = [
        {
            type: "INPUT",
            label: '用户名',
            field: "user_name",
            placeholder: "请输入用户名",
            width: 90,
        }, {
            type: "INPUT",
            label: '手机号',
            field: "user_mobile",
            placeholder: "请输入手机号",
            width: 90,
        }, {
            type: "DATEPICKER",
            label: '入职日期',
            field: "user_date",
            placeholder: "请选择日期",
            width: 90,
        }
    ]
    params = {
        page: 1
    }
    state = {
        isVisible: false,
    }
    //创建员工提交
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url: type == 'create' ? '/user/add' : '/user/edit',
            params: data
        }).then((res) => {
            if (res.code == 0) {
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible: false
                })
                this.requestList();
            }
        })
    }
    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }
    requestList = () => {
        axios.requestList(this, '/user/list', this.params)
    }
    componentDidMount() {
        this.requestList();
    }
    handleOperate = (type) => {
        let item = this.state.selectedItem;
        if (type == 'create') {
            this.setState({
                type,
                isVisible: true,
                title: "创建员工",
            })
        } else if (type == 'edit') {
            if (!item) {
                Modal.info({
                    title: "提示",
                    content: "请选择用户信息"
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: "编辑员工",
                userInfo: item
            })
        } else if (type == 'detail') {
            if (!item) {
                Modal.info({
                    title: "提示",
                    content: "请选择用户信息"
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: "员工详情",
                userInfo: item
            })
        } else {
            if (!item) {
                Modal.info({
                    title: "提示",
                    content: "请选择用户信息"
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title: '确认删除',
                content: "是否要删除当前员工",
                onOk() {
                    axios.ajax({
                        url: '/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then((res) => {
                        if (res.code == 0) {
                            _this.setState({
                                isVisible: false
                            })
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }
    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id'
        }, {
            title: '用户名',
            dataIndex: 'username'
        }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex) {
                return sex == 1 ? '男' : '女'
            }
        }, {
            title: '状态',
            dataIndex: 'state',
            render(state) {
                let config = {
                    '1': '咸鱼一条',
                    '2': '风华浪子',
                    '3': '北大才子一枚',
                    '4': '百度FE',
                    '5': '创业者'
                }
                return config[state];
            }
        }, {
            title: '爱好',
            dataIndex: 'interest',
            render(interest) {
                let config = {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '骑行',
                    '7': '桌球',
                    '8': '麦霸'
                }
                return config[interest];
            }
        }, {
            title: '爱好',
            dataIndex: 'isMarried',
            render(isMarried) {
                return isMarried ? '已婚' : '未婚'
            }
        }, {
            title: '生日',
            dataIndex: 'birthday'
        }, {
            title: '联系地址',
            dataIndex: 'address'
        }, {
            title: '早起时间',
            dataIndex: 'time'
        }
        ];

        let footer = {}
        if (this.state.type == 'detail') {
            footer = {
                footer: null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm
                        formList={this.formList}
                        filterSubmit={this.handleFilter}
                    />
                </Card>
                <Card style={{ marginTop: 10 }} className="ant-card">
                    <Button type="primary" icon='plus' onClick={() => this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon='edit' onClick={() => this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" icon='file-text' onClick={() => this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon='delete' onClick={() => this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <div>
                    <ETable
                        updateSelectedItem={utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.params.pagination}
                        selectedItem={this.state.selectedItem}
                        selectedRowKeys={this.state.selectedRowKeys}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst) => this.userForm = inst}></UserForm>
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component {
    getState = (state) => {
        return {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者'
        }[state];
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.username :
                            getFieldDecorator("user_name", {
                                initialValue: userInfo.username
                            })(
                                <Input type="text" placeholder="请输入用户名" />
                            )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.sex == 1 ? '男' : '女' :
                            getFieldDecorator("sex", {
                                initialValue: userInfo.sex
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={0}>女</Radio>
                                </RadioGroup>
                            )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type == 'detail' ? this.getState(userInfo.state) :
                            getFieldDecorator("state", {
                                initialValue: userInfo.state
                            })(
                                <Select>
                                    <Option value={1}>咸鱼一条</Option>
                                    <Option value={2}>风华浪子</Option>
                                    <Option value={3}>北大才子</Option>
                                    <Option value={4}>百度FE</Option>
                                    <Option value={5}>创业者</Option>
                                </Select>
                            )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.birthday :
                            getFieldDecorator("birthday", {
                                initialValue: moment(userInfo.birthday)
                            })(
                                <DatePicker showTime={true} placeholder="请选择日期" />
                            )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.address :
                            getFieldDecorator("address", {
                                initialValue: userInfo.address
                            })(
                                <TextArea row={3} placeholder="请输入地址" />
                            )
                    }
                </FormItem>
            </Form>
        )

    }
}
UserForm = Form.create()(UserForm);
