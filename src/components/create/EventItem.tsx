import React, {Component} from "react";
import styles from "./EventItem.module.scss";

const weekday = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];

export interface EventData {
    title : string;
    date : string;
}

interface IProps {
    data : EventData;
    displayDate : boolean;
}

export class EventItem extends Component<IProps, {}> {
    static displayName = EventItem.name;


    render () {
        let dayAndDate = <div className={styles["dayspacer"]} />;
        if(this.props.displayDate) {
            let month = this.props.data.date.split("-")[1].replace(/^0+/, '');
            let day = this.props.data.date.split("-")[2].replace(/^0+/, '');
            let dayNum = new Date(this.props.data.date).getDay();
            dayAndDate = <div className={styles["dayspacer"]}>
                <div className={styles["day"]}>{weekday[dayNum]}</div>
                <div className={styles["date"]}>{day}/{month}</div>
            </div>
        }

        return (
            <div className={styles["wrapper"]}>
                {dayAndDate}
                <div className={styles["divider"]}>-</div>
                <div className={styles["title"]}>{this.props.data.title}</div>
            </div>
        )
    }
}