import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd';
import axios from './../../axios/index';
import utils from './../../utils/utils'
import './../../style/common.less'
import BaseForm from './../../components/baseForm';
import ETable from './../../components/Etable';
const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends React.Component {
    state = {
        orderInfo: {},
        isShowOrder: false
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: "SELECT",
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: "时间查询",
        },
        {
            type: "SELECT",
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 120,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        },
    ]
    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }
    componentDidMount() {
        this.requestList();
    }
    requestList = () => {
        let _this = this;
        axios.requestList(this, '/order/list', this.params);
        // axios.ajax({
        //     url: '/order/list',
        //     data: {
        //         params: {
        //             page: this.params
        //         }
        //     }
        // }).then((res) => {
        //     console.log(JSON.stringify(res));
        //     if (res.code == 0) {
        //         res.result.item_list.map((item, index) => {
        //             item.key = index;
        //             return item;
        //         })
        //         this.setState({
        //             list: res.result.item_list,
        //             selectedRowKeys: [],
        //             selectedRows: null,
        //             pagination: utils.pagination(res, (current) => {
        //                 _this.params.page = current;
        //                 this.requestList();
        //             })
        //         })
        //     }
        // })
    }
    handleFinished = () => {
        let item = this.state.selectedItem;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success("订单结束成功");
                this.setState({
                    isShowOrder: false
                })
                this.requestList();
            }
        })
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            isShowOrder: false,
        });
    }
    //确认订单
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: "提示信息",
                content: "请选择一条订单进行结束"
            })
            return;
        }
        axios.ajax({
            url: '/order/ebike_info',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    orderInfo: res.result,
                    isShowOrder: true
                })
            }
        })
        this.setState({
            isShowOrder: true
        })
    }

    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: "提示信息",
                content: "请选择订单"
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`, '_blank')
    }
    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.params.pagination}
                        selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                        selectedRowKeys={this.state.selectedRowKeys}
                        rowSelection="checkbox"
                    />
                    {/* <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.params.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    /> */}
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.isShowOrder}
                    onCancel={this.handleCancel}
                    onOk={this.handleFinished}

                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}



