import React, {Component} from 'react';
import $ from 'jquery';
import Octicon, {Dash} from '@primer/octicons-react'

class RecordingTool extends Component {

    state = {
        isRecording: false,
        audioPlayerVisibility: "none",
        mimeType: ""
    }

    constructor(props) {
        super(props);

        let chunks = [];

        this.destination = this.props.streamDestination;


        this.mediaRecorder = new MediaRecorder(this.destination.stream);
        this.mediaRecorder.ondataavailable = function (evt) {
            let data = evt.data
            if (data.size == 0) {
                return;
            }
            chunks.push(evt.data);
        };
        this.mediaRecorder.onstop = function (evt) {
            // in case there was nothing to record
            if (chunks.length == 0) {
                return;
            }

            let blob = new Blob(chunks, {'type': 'audio/webm; codecs=opus'});
            let url = URL.createObjectURL(blob);

            document.querySelector("audio").src = url;

            $("#downloadLink")
                .attr("href", url)
                .attr("download", "audio.webm");

            chunks = [];
        };

        this.handleButtonClicked = this.handleButtonClicked.bind(this);
        this.handleMimeTypeButtonClicked = this.handleMimeTypeButtonClicked.bind(this);
    }

    handleButtonClicked = function () {
        debugger
        let isRecordingState = !this.state.isRecording;
        this.setState({isRecording: isRecordingState});

        if (isRecordingState) {
            this.mediaRecorder.start();
            this.setState({audioPlayerVisibility: "none"});
        } else {
            this.mediaRecorder.stop();
            this.setState({audioPlayerVisibility: "inline"});
        }
    }

    handleMimeTypeButtonClicked(typeOfAudio) {
        console.log(typeOfAudio);
        debugger
        this.state.mimeType = "audio/webm; codecs=opus"
    }

    render() {
        const hStyle = {
            display: "inline"
        };
        const recordingButtonStyle = {
            borderRadius: "50%"
        }
        console.log(this.handleMimeTypeButtonClicked);
        let recordButton = null;
        let downloadVisibility = "invisible";//the download button is only visible if the recording is done
        if (this.state.isRecording) {
            recordButton = <button
            className="btn btn-dark mb-2" type="button"
            onClick={this.handleButtonClicked}>
                Stop
                </button>;
        } else {
            recordButton = <button
            className="btn btn-danger mb-2" type="button"
            onClick={this.handleButtonClicked}>
                Start
                </button>;
            if (this.state.audioPlayerVisibility == "inline") {//if audio player visible
                downloadVisibility = "visible";
            }
        }

        return (<React.Fragment>
            <div class="shadow p-3 mt-2 mb-5 bg-light rounded">
            <h4 style={hStyle}>RecordingTool</h4>
            <button class=" btn btn-light ml-1 mb-2" style={recordingButtonStyle}
            onClick={() => this.props.onToolDelete("RecordingTool")}>
            <Octicon icon={Dash}/></button>
            <br></br>
            <div className="btn-group mb-2" role="group">
            <button type="button" className="btn btn-secondary"
            onClick={() => this.handleMimeTypeButtonClicked("ogg")} >ogg
            </button>
            <button type="button" className="btn btn-secondary"
            onClick={() => this.handleMimeTypeButtonClicked("webm")} >webm
            </button>
            </div>
            <br></br>
            {recordButton}
            <a id="downloadLink" className={downloadVisibility}>
            <button className="btn btn-secondary ml-2 mb-2" type="button">Download</button>
            </a>
            <br></br>
            <audio controls id="audio" style={{display: this.state.audioPlayerVisibility}}></audio>
            </div>
            </React.Fragment>);
    }

}

export default RecordingTool
