import React, {Component} from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/home/Home';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import {Render} from "./components/render/Render";
import {Create} from "./components/create/Create";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/create' component={Create} />
                    <Route path='/render' component={Render} />
                </Switch>
            </Layout>
        </Router>
    )
  }
}