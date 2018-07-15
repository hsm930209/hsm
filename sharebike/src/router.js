import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App'
import Admin from './admin';
import Buttons from './pages/ui/buttons'

export default class Router extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/admin/ui" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons} />
                            </Switch>
                        </Admin>
                    } />
                </App>
            </HashRouter>
        )
    }
}