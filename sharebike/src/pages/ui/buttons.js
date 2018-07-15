import React from 'react';
import { HashRouter, Router, Switch } from 'react-router-dom';
import { Card, Button } from 'antd';


export default class Buttons extends React.Component {
    render() {
        return (
            <Card title="基本按钮" className="card-wrap">
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
            </Card>
        )
    }
}