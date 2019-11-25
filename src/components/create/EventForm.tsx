import React, {Component} from "react";
import {EventData} from "./EventItem";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

interface IProps {
    pushNewEvent : (data : EventData) => void;
}

export class EventForm extends Component<IProps, EventData> {
    static displayName = EventForm.name;

    constructor(props : IProps) {
        super(props);

        this.state = {
            title : "",
            date : "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addEvent  = this.addEvent.bind(this);
    }

    handleInputChange(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as Pick<EventData, any>)
    }

    /* Take inputs from fields and push it to parent through props function */
    addEvent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        this.props.pushNewEvent({
            date : this.state.date,
            title : this.state.title})

        this.setState({
            date : "",
            title : ""
        })
    }

    render() {
        return (
            <div>
                <div>Välj saker som ska stå här typ</div>
                <Form onSubmit={this.addEvent}>
                    <FormGroup>
                        <Label for="title">Titel</Label>
                        <Input type="text" name="title" id="title" placeholder="Titel" onChange={this.handleInputChange} value={this.state.title}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">Datum</Label>
                        <Input type="date" name="date" id="date" placeholder="date placeholder" onChange={this.handleInputChange} value={this.state.date}/>
                    </FormGroup>
                    <Button>Lägg till arrangemang</Button>
                </Form>
            </div>
        );
    }
}