import React, {Component} from 'react';
import $ from 'jquery';
import Octicon, {Dash} from '@primer/octicons-react'

class RecordingTool extends Component {

    constructor(props) {
        super(props);

        this.started = false;
        let chunks = [];

        this.destination = this.props.streamDestination;

        this.mediaRecorder = new MediaRecorder(this.destination.stream);
        this.mediaRecorder.ondataavailable = function (evt) {
            chunks.push(evt.data);
        };
        this.mediaRecorder.onstop = function (evt) {
            let blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'});
            let url = URL.createObjectURL(blob);

            document.querySelector("audio").src = url;

            $("#downloadLink")
                .attr("href", url)
                .attr("download", "audio.ogg");

            chunks = [];
        };

        this.handleButtonClicked = this.handleButtonClicked.bind(this);
    }

    handleButtonClicked = function () {
        $('#recordButton').text(!this.started ? "Stop" : "Start");
        this.started = !this.started;
        if (this.started) {
            this.mediaRecorder.start();
            $('#audio').css("display", "none");
        } else {
            this.mediaRecorder.stop();
            $('#audio').css("display", "inline");
        }
    }

    render() {
        const hStyle = {
            display: "inline"
        };
        return (<React.Fragment>
            <div class="shadow p-3 mt-2 mb-5 bg-light rounded">
                <h4 style={hStyle}>RecordingTool</h4>
                <button class=" btn btn-light ml-1 mb-2" onClick={() => this.props.onToolDelete("RecordingTool")}>
                    <Octicon icon={Dash}/></button>
                <button className="btn btn-secondary mb-2" type="button" id="recordButton"
                        onClick={this.handleButtonClicked}>Start
                </button>
                <a id="downloadLink">
                    <button className="btn btn-secondary mb-2" type="button">Download</button>
                </a>
                <audio controls id="audio" style={{display: "none"}}></audio>
            </div>
        </React.Fragment>);
    }

}

export default RecordingTool
