import {Component} from "react";
import {EventData} from "./EventItem";
import styles from "./EventList.module.scss";
import * as React from "react";

interface IProps {
    removeEvent : (event : EventData) => void;
    events : Array<EventData>;
}

export class EventList extends Component<IProps, {}> {
    static displayName = EventList.name;

    render() {
        let list = this.props.events.map((data, index) => {
            return(
                <div className={styles["item"]} key={index}>
                    <div className={styles["info"]}>{data.date} {data.title}</div>
                    <button className={styles.removeButton} onClick={(e : React.MouseEvent<HTMLElement>) => {this.props.removeEvent(data)}}>Ta bort</button>
                </div>
            )
        });

        return (
            <div>
                {list}
            </div>
        )
    }
}