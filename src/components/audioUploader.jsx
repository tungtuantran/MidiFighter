import React, {Component} from 'react';
import $ from "jquery";
import Octicon, { Dash} from '@primer/octicons-react'

class AudioUploader extends Component {

    volume = 0;
    speed = 0;

    state = {
        audioType: 'Sound',
    }

    constructor(props) {
        super(props);
        let properties = props;
        var c = this;
        properties.setTypeOfAudio('Sound');
        $(document).ready(function () {
            $('#upload').click(function () {
                $('#file-input').trigger('click');
            });

            $('#soundButton').click(function () {
                properties.setTypeOfAudio('Sound');
                c.setState({audioType: 'Sound'});
            });

            $('#beatButton').click(function () {
                properties.setTypeOfAudio('Beat');
                c.setState({audioType: 'Beat'});
            });

            $('#file-input').click(function () {
                //to clear prev file-input
                this.value = null;
            });

            $('#file-input').change(function (event) {

                let file = event.target.files[0];
                let fileName = file.name;

                if (file.type.match(/audio.*/)) {
                    let reader = new FileReader();
                    reader.onload = function(d) {
                        properties.onAudioLoad(fileName, d.target.result, document.getElementById("volumeSlider2").value, document.getElementById("speedSlider2").value, document.getElementById("lowpassSlider2").value, document.getElementById("highpassSlider2").value );
                    };
                    reader.readAsArrayBuffer(file);                   //reader.readAsDataURL(file);

                }

            });
        });

        this.styles = {};
        this.styles.hStyle = {
            display: "inline"
        };
    }

    inputStyle = {
        // prevent seeing the input field -> will be hidden behind the upload-image
        display: "none",
    };

    render() {

        let beatColor = "btn btn-secondary";
        let soundColor = "btn btn-dark";
        if(this.state.audioType == 'Beat'){
            beatColor = "btn btn-dark";
            soundColor = "btn btn-secondary";
        }
        return (<React.Fragment>


            <div className="shadow p-3 mt-4 bg-light rounded">
            <h4 style={this.styles.hStyle}>UploadingTool</h4>
            <button className="btn btn-light  ml-1 mb-2"   onClick={() => this.props.onToolDelete("UploadingTool")}><Octicon icon={Dash}/></button>

            <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className={soundColor} id="soundButton">Sound</button>
            <button type="button" className={beatColor}  id="beatButton">Beat</button>
            </div>

            <form>
            <div className="form-group">
            Volume:
            <input type="range" className="form-control-range"  id="volumeSlider2" min="0" max="2" step="0.1" defaultValue="1" ></input>
            Speed:
            <input type="range" className="form-control-range"  id="speedSlider2" min="0" max="2" step="0.1" defaultValue="1" ></input>
            Lowpass-Filter:
            <input type="range" className="form-control-range"  id="lowpassSlider2" min="-20" max="20" step="0.1" defaultValue="0" ></input>
            Highpass-Filter:
            <input type="range" className="form-control-range"  id="highpassSlider2" min="-20" max="20" step="0.1" defaultValue="0" ></input>
            </div>
            </form>

            <button className="btn btn-secondary" type="button" id="upload">
            <img src={process.env.PUBLIC_URL + '/icons/upload.png'} width="20" height="20"/>
            </button>

            <input style={this.inputStyle} id="file-input" type="file" accept="audio/*" name="file"/>

            </div>
            </React.Fragment>);
    }

}

export default AudioUploader
