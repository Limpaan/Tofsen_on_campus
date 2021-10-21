import React, {Component} from 'react';
import styles from './Create.module.scss';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import html2canvas from 'html2canvas';
import {saveAs} from "file-saver";
import cssConstants from "../common/_constants.scss";
import {SlideModule} from "./SlideModule";

interface IState {
    studyWeek : string;
    numberOfSlides: number;
}

export class Create extends Component<{}, IState> {
    static displayName = Create.name;

    constructor (props: {}) {
        super(props);

        this.state = {
            studyWeek : "LV1",
            numberOfSlides: 1,
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.makeImage = this.makeImage.bind(this);
    }

    handleSelectChange(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();

        this.setState({
            studyWeek : event.currentTarget.value,
        })
    }

    handleNumberChange(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        const targetNumber = event.currentTarget.valueAsNumber;

        if (targetNumber > 0 && targetNumber < 11) {
            this.setState({
                numberOfSlides: targetNumber,
            })
        }
    }

    async makeImage(studyWeek: string) {
        for (let i = 0; i<this.state.numberOfSlides; i++) {
            let disp = document.getElementById("display" + i)
            if(disp) {
                window.scrollTo(0, 0);
                await html2canvas(disp, {width: 1024, height: 1024, windowWidth: 1024/cssConstants.scale, windowHeight: 1024/cssConstants.scale}).then(function (canvas) {
                    let image = document.body.appendChild(canvas);
                    image.hidden = true;
                    saveAs(image.toDataURL(), new Date().toISOString().split("T")[0] + "_" + i + "_" + studyWeek + ".png")
                });
            }
        }
    }

    render() {
        return (
            <div className={styles["container"]}>
                <div className={styles["top-side"]}>
                    <div className={styles.topRow}>
                        <div className={styles.settings}>
                            <Form>
                                <FormGroup>
                                    <Label className={styles.formLabel} for="studyweek">Läsvecka</Label>
                                    <Input className={styles.formInput} type="select" name="studyweek" id="studyweek" onChange={this.handleSelectChange} value={this.state.studyWeek}>
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
                            <Form>
                                <FormGroup>
                                    <Label className={styles.formLabel} for="numberofslides">Antal bilder</Label>
                                    <Input className={styles.formInput} type="number" name="numberofslides" id="numberofslides" onChange={this.handleNumberChange} value={this.state.numberOfSlides} />
                                </FormGroup>
                            </Form>
                        </div>
                        <button className={styles.button} onClick={() => this.makeImage(this.state.studyWeek)}>Skapa bild</button>
                    </div>
                    <hr />
                </div>
                <div className={styles["bottom-side"]}>
                    {Array.apply(null, Array(this.state.numberOfSlides)).map((i, index) => <SlideModule studyWeek={this.state.studyWeek} displayTitle={index === 0} slideNumber={index}/>)}
                </div>
            </div>
        );
    }
}