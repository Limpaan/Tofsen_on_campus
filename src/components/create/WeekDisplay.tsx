import {Component} from "react";
import {EventData, EventItem} from "./EventItem";
import * as React from "react";
import styles from './WeekDisplay.module.scss';

interface IProps {
    studyWeek : string;
    events : Array<EventData>;
    id : string;
}

export class WeekDisplay extends Component<IProps, {}> {
    static displayName = WeekDisplay.name;

    render() {
        this.props.events.sort(((a, b) => {
            if(a.date < b.date)
                return -1;
            if(a.date > b.date)
                return 1;
            return 0;
        }));

        let small = false;
        if(this.props.studyWeek === "TENTAVECKA") {
            small = true;
        }

        let tmpDate = "";
        let items : JSX.Element[] = [];

        this.props.events.forEach(event => {
            if(tmpDate !== event.date) {
                tmpDate = event.date;
                if(items.length >= 1) {
                    items.push(<div className={styles["topspacer"]} />);
                }
                items.push(<EventItem data={event} displayDate={true} />);
            } else {
                items.push(<EventItem data={event} displayDate={false} />);
            }
        });

        return (
            <div id={this.props.id} className={styles["wrapper"]}>
                <div className={styles["layout"]}>
                    <div className={styles["title"]}>På Campus i Veckan</div>
                    <div className={styles["LV"] + (small ? " " + styles["LVsmall"] : "")}>{this.props.studyWeek}</div>
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