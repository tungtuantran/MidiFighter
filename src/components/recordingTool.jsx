import React, {Component} from 'react';
import $ from 'jquery';
import Octicon, {Dash} from '@primer/octicons-react'

class RecordingTool extends Component {

    constructor(props) {
        super(props);

        this.started = false;
        let chunks = [];

        this.audioContext = this.props.audioContext;
        this.destination = this.props.streamDestination;

        //this.osc = this.audioContext.createOscillator();
        //this.osc.connect(this.destination);

        this.mediaRecorder = new MediaRecorder(this.destination.stream);
        this.mediaRecorder.ondataavailable = function (evt) {
            debugger
            chunks.push(evt.data);
        };
        this.mediaRecorder.onstop = function (evt) {
            debugger

            let blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'});
            document.querySelector("audio").src = URL.createObjectURL(blob);
            chunks = [];
        };
        this.mediaRecorder.onerror = function (evt) {
            let error = evt.error;

            console.log(error);
        };

        this.handleButtonClicked = this.handleButtonClicked.bind(this);
    }

    handleButtonClicked = function() {
        $('#recordButton').text(!this.started ? "Stop" : "Start");
        this.started = !this.started;
        if (this.started) {
            this.mediaRecorder.start();
            //this.osc.start();
        } else {
            this.mediaRecorder.stop();
            //this.osc.stop();
        }
    }

    render() {
        const hStyle = {
            display: "inline"
        };
        return (<React.Fragment>
            <div class="shadow p-3 mt-2 mb-5 bg-light rounded">
                <h4 style={hStyle}>RecordingTool</h4>
                <button class=" btn btn-light  ml-1 mb-2" onClick={() => this.props.onToolDelete("RecordingTool")}>
                    <Octicon icon={Dash}/></button>
                <button id="recordButton" onClick={this.handleButtonClicked}>Start</button>
                <audio controls id="audio"></audio>
            </div>
        </React.Fragment>);
    }

}


export default RecordingTool
