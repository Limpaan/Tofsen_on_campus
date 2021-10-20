import React, {Component} from 'react';
import {Link} from "react-router-dom";
import styles from "./Home.module.scss"

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>På campus i veckan Creator</div>
                <div className={styles.linkContainer}>
                    <Link className={styles.link} to='/create'>Ny vecka</Link>
                </div>
            </div>
        );
    }
}