import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/list/List';
import NotFound from './components/notFound/NotFound';
import './index.css';
import Detail from './components/detail/Detail';




const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                     <Route path='/' component={List} exact />
                     <Route component={Detail} path='/currency/:id' exact />
                     <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}
ReactDom.render(
    <App/>, 
    document.getElementById('root'),
)