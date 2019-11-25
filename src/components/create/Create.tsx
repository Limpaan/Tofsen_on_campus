import React, {Component} from 'react';
import {EventData} from './EventItem';
import styles from './Create.module.scss';
import {Form, FormGroup, Input, Label} from "reactstrap";
import {EventForm} from "./EventForm";
import {WeekDisplay} from "./WeekDisplay";
import html2canvas from 'html2canvas';
import {EventList} from "./EventList";

interface IState {
    studyWeek : string;
    events : Array<EventData>;
}

export class Create extends Component<{}, IState> {
    static displayName = Create.name;

    constructor (props: {}) {
        super(props);

        this.state = {
            studyWeek : "LV1",
            events : []
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.makeImage = this.makeImage.bind(this);
    }

    handleSelectChange(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({
            studyWeek : event.currentTarget.value,
        })
    }

    addEvent(data : EventData) {
        this.setState({
            events : [...this.state.events, data]
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

    async makeImage() {
        let disp = document.getElementById("display")
        if(disp) {
            window.scrollTo(0, 0);
            await html2canvas(disp, {width: 1024, height: 1024, windowWidth: 2048, windowHeight: 2048}).then(function (canvas) {
                document.body.appendChild(canvas);
            });
        }
    }

    render() {
        return (
            <div className={styles["container"]}>
                <div className={styles["top-side"]}>
                    <div>Välj vecka här</div>
                    <Form>
                        <FormGroup>
                            <Label for="studyweek">Läsvecka</Label>
                            <Input type="select" name="studyweek" id="studyweek" onChange={this.handleSelectChange} value={this.state.studyWeek}>
                                <option>LV1</option>
                                <option>LV2</option>
                                <option>LV3</option>
                                <option>LV4</option>
                                <option>LV5</option>
                                <option>LV6</option>
                                <option>LV7</option>
                                <option>LV8</option>
                                <option>LV9</option>
                                <option>TENTAVECKA</option>
                            </Input>
                        </FormGroup>
                    </Form>
                    <button onClick={this.makeImage}>Skapa bild</button>
                    <hr />
                </div>
                <div className={styles["bottom-side"]}>
                    <div className={styles["left-side"]}>
                        <EventForm pushNewEvent={this.addEvent}/>
                        <EventList removeEvent={this.removeEvent} events={this.state.events}/>
                    </div>
                    <div className={styles["right-side"]}>
                        <WeekDisplay id="display" studyWeek={this.state.studyWeek} events={this.state.events} />
                    </div>
                </div>
            </div>
        );
    }
}