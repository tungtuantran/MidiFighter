import React, {Component} from 'react';
import $ from 'jquery';
import Octicon, {Dash} from '@primer/octicons-react'

class RecordingTool extends Component {

    state = {
        isRecording: false,
        audioPlayerVisibility: "none",
        mimeType: 'ogg',
    }

    constructor(props) {
        super(props);

        this.styles = {};
        this.styles.downloadStyle = {
            marginTop: '-25px'
        };
        this.styles.hStyle = {
            display: "inline"
        };
        this.styles.recordingButtonStyle = {
            borderRadius: "100%",
            height: '60px'
        }

        this.chunks = [];
        this.destination = this.props.streamDestination;

        this.handleStartClicked= this.handleStartClicked.bind(this);
        this.recorderOnDataAvailable = this.recorderOnDataAvailable.bind(this);
        this.recorderOnStop = this.recorderOnStop.bind(this);

        this.mediaRecorder = new MediaRecorder(this.destination.stream);
        this.mediaRecorder.ondataavailable = this.recorderOnDataAvailable
        this.mediaRecorder.onstop = this.recorderOnStop


        var c = this;
        $(document).ready(function () {
            $('#oggFormat').click(function () {
                c.setState({mimeType: "ogg"});
            });

            $('#webmFormat').click(function () {
                c.setState({mimeType: "webm"});
            });
        });
    }

    handleStartClicked() {
        // record only with format
        if (this.state.mimeType == undefined) {return;}

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


    recorderOnDataAvailable(evt) {
        if (evt.data.size == 0) { return;}
        this.chunks.push(evt.data);
    }

    recorderOnStop(evt) {
        // in case there was nothing to record
        if (this.chunks.length == 0) {return;}

        let blob = new Blob(this.chunks, {'type': "audio/" + this.state.mimeType + "; codecs=opus"});
        let url = URL.createObjectURL(blob);

        document.querySelector("audio").src = url;

        $("#downloadLink")
            .attr("href", url)
            .attr("download", "audio." + this.state.mimeType);

        this.chunks = [];
    }

    render() {
        let oggColor = "btn btn-secondary";
        let webmColor = "btn btn-dark";
        if(this.state.mimeType == 'ogg'){
            oggColor = "btn btn-dark";
            webmColor = "btn btn-secondary";
        }

        let recordButtonColor = "btn btn-danger mb-2";
        if (this.state.isRecording) {
            recordButtonColor = "btn btn-dark mb-2";
        }

        let downloadVisibility = "invisible";//the download button is only visible if the recording is done
        if (this.state.audioPlayerVisibility == "inline") {//if audio player visible
            downloadVisibility = "visible";
        }

        return (<React.Fragment>
            <div className="shadow p-3 mt-2 mb-5 bg-light rounded">
            <h4 style={this.styles.hStyle}>RecordingTool</h4>

            <button className=" btn btn-light ml-1 mb-2"
            onClick={() => this.props.onToolDelete("RecordingTool")}>
            <Octicon icon={Dash}/></button>
            <br></br>

            <button
            className={recordButtonColor} type="button"
            style={this.styles.recordingButtonStyle}
            onClick={this.handleStartClicked}>
            {this.state.isRecording ? "Stop" : "Start" }
            </button>

            <div className="btn-group p-2" role="group" aria-label="Basic example">
            <button type="button" className={oggColor}
            id="oggFormat">ogg</button>
            <button type="button" className={webmColor}
            id="webmFormat">webm</button>
            </div>
            <br></br>

            <audio controls id="audio" style={{display: this.state.audioPlayerVisibility}}></audio>
            <a id="downloadLink" className={downloadVisibility} >
            <button className="btn btn-secondary ml-5" style={this.styles.downloadStyle} type="button">Download</button>
            </a>

            </div>
            </React.Fragment>);
    }

}

export default RecordingTool
