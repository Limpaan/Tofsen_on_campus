import React, {Component} from "react";
import {EventForm} from "./EventForm";
import {EventList} from "./EventList";
import {WeekDisplay} from "./WeekDisplay";
import {EventData} from "./EventItem";
import styles from "./SlideModule.module.scss";

interface IState {
    events : Array<EventData>;
}

interface IProps {
    studyWeek: string;
    displayTitle: boolean;
    slideNumber: number;
}

export class SlideModule extends Component<IProps, IState> {
    static displayName = SlideModule.name;

    constructor (props: IProps) {
        super(props);

        this.state = {
            events : []
        }

        this.addEvent = this.addEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
    }

    addEvent(data : EventData) {
        let tmp = [...this.state.events, data];
        tmp.sort(((a, b) => {
            if(a.date < b.date)
                return -1;
            if(a.date > b.date)
                return 1;
            return 0;
        }));
        this.setState({
            events : tmp
        });
    }

    removeEvent(event: EventData) {
        let events = [...this.state.events];
        const index = events.indexOf(event);
        if(index !== -1) {
            events.splice(index, 1);
            this.setState({
                events : events
            })
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles["left-side"]}>
                    <EventForm pushNewEvent={this.addEvent}/>
                    <EventList removeEvent={this.removeEvent} events={this.state.events}/>
                </div>
                <div className={styles["right-side"]}>
                    <WeekDisplay id={"display" + this.props.slideNumber} displayTitle={this.props.displayTitle} studyWeek={this.props.studyWeek} events={this.state.events} />
                </div>
            </div>
        )
    }
}