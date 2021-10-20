import {Component} from "react";
import {EventData, EventItem} from "./EventItem";
import * as React from "react";
import styles from './WeekDisplay.module.scss';

interface IProps {
    studyWeek : string;
    displayTitle : boolean;
    events : Array<EventData>;
    id : string;
}

export class WeekDisplay extends Component<IProps, {}> {
    static displayName = WeekDisplay.name;

    render() {
        let small = false;
        if(this.props.studyWeek === "TENTAVECKA") {
            small = true;
        }

        let tmpDate = "";
        let items : JSX.Element[] = [];

        this.props.events.forEach((event, index) => {
            if(tmpDate !== event.date) {
                tmpDate = event.date;
                if(items.length >= 1 || !this.props.displayTitle) {
                    items.push(<div className={styles["topspacer"]} key={index} />);
                }
                items.push(<EventItem data={event} displayDate={true} key={index} />);
            } else {
                items.push(<EventItem data={event} displayDate={false} key={index} />);
            }
        });

        return (
            <div id={this.props.id} className={styles["wrapper"]}>
                <div className={styles["layout"]}>
                    {this.props.displayTitle && <div className={styles["title"]}>På Campus i Veckan</div>}
                    {this.props.displayTitle && <div className={styles["LV"] + (small ? " " + styles["LVsmall"] : "")}>{this.props.studyWeek}</div>}
                    {items}
                    <div className={styles["bottomright"]}>
                        <div className={styles["madeby"]}>Presenteras av</div>
                        <div className={styles["nyatofsen"]}>Nya Tofsen</div>
                    </div>
                </div>
            </div>
        )
    }
}