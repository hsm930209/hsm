import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App'
import Admin from './admin';
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


export default class Router extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/admin" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons} />
                                <Route path="/admin/ui/modals" component={Modals} />
                                <Route path="/admin/ui/loadings" component={Loadings} />
                                <Route path="/admin/ui/notification" component={Notices} />
                                <Route path="/admin/ui/messages" component={Messages} />
                                <Route path="/admin/ui/tabs" component={Tabs} />
                                <Route path="/admin/ui/gallery" component={Gallery} />
                                <Route path="/admin/ui/carousel" component={Carousel} />
                                <Route path="/admin/form/login" component={Login} />
                                <Route path="/admin/form/reg" component={Register} />
                                <Route path="/admin/table/basic" component={BasicTable} />
                                <Route path="/admin/table/high" component={HighTable} />
                                <Route path="/admin/city" component={City}/>
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                </App>
            </HashRouter>
        )
    }
}