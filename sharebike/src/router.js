import React from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
import App from './App'
import Admin from './admin';
import Home from './pages/home';
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals';
import Carousel from './pages/ui/carousel';
import Gallery from './pages/ui/gallery';
import Loadings from './pages/ui/loadings';
import Messages from './pages/ui/messages';
import Notices from './pages/ui/notice';
import Tabs from './pages/ui/tabs';
import Login from './pages/form/login';
import Register from './pages/form/register'
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable'
import NoMatch from './pages/nomatch'
import City from './pages/city';
import Order from './pages/order';
import Common from './common';
import OrderDetail from './pages/order/detail'
import User from './pages/user';
import BikeMap from './pages/map/bikeMap';
import Bars from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import Rish from './pages/rish';
import PermissionUser from './pages/permission';

export default class Router extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/common" render={() =>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                            </Common>
                        } />
                        <Route path="/" render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home} />
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route path="/ui/modals" component={Modals} />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notices} />
                                    <Route path="/ui/messages" component={Messages} />
                                    <Route path="/ui/tabs" component={Tabs} />
                                    <Route path="/ui/gallery" component={Gallery} />
                                    <Route path="/ui/carousel" component={Carousel} />
                                    <Route path="/form/login" component={Login} />
                                    <Route path="/form/reg" component={Register} />
                                    <Route path="/table/basic" component={BasicTable} />
                                    <Route path="/table/high" component={HighTable} />
                                    <Route path="/city" component={City} />
                                    <Route path="/order" component={Order} />
                                    <Route path="/user" component={User} />
                                    <Route path="/bikeMap" component={BikeMap} />
                                    <Route path="/charts/bar" component={Bars} />
                                    <Route path="/charts/pie" component={Pie} />
                                    <Route path="/charts/line" component={Line} />
                                    <Route path="/rich" component={Rish} />
                                    <Route path="/permission" component={PermissionUser} />
                                    <Redirect to="/home"/>
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}