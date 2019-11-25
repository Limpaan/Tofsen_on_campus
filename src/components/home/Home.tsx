import React, {Component} from 'react';
import {Link} from "react-router-dom";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <Link to='/create'>Ny vecka</Link>
                <Link to='/render'>Visa vecka</Link>
            </div>
        );
    }
}