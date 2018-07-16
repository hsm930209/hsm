import React from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from './../../axios';
import utils from '../../utils/utils';
export default class BasicTable extends React.Component {

    state = {
        dataSource2: []
    }
    params ={
        page:1
    }

    componentDidMount() {
        const data = [
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                age:30,
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                age:80,
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                age:45,
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
        ]
        data.map((item, index) => {
            item.key = index;
        })
        this.setState({
            dataSource: data
        })
        this.request();

    }

    // 动态获取mock数据
    request = () => {
        let _this=this;
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                res.result.list.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    dataSource2: res.result.list,
                    pagination:utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }
    onRowClick=(record,index)=>{
        let selectKey = [index];
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record         
        })
        Modal.info({
            title:"信息",
            content:`用户名：${record.userName}`
        })
    }
    render() {
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex ==1 ?'男':'女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config  = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '年龄',
                dataIndex: 'age'
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(abc) {
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
                    return config[abc];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ]
        const rowSelection = {
            type: "radio",
            selectedRowKeys:this.state.selectedRowKeys
        }
        return (
            <div>
                <Card title="基础表格" className="card-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格-Mock" className="card-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination
                    />
                </Card>
                <Card title="Mock-单选" className="card-wrap">
                    <Table
                        rowSelection={rowSelection}
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination
                        onRow={(record,index) => {
                            return {
                              onClick: () => {
                                  this.onRowClick(record,index);
                              }       // 点击行
                            };
                          }}
                    />
                </Card>
                <Card title="Mock-表格分页" className="card-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        );
    }

}




