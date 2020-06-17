import React, {Component} from 'react';
import $ from "jquery";

class AudioUploader extends Component {

    volume = 0;
    speed = 0;

    constructor(props) {
        super(props);
        let properties = props;
        $(document).ready(function () {
            $('#upload').click(function () {
                $('#file-input').trigger('click');
            });
            
            $('#soundButton').click(function () {
                properties.setTypeOfAudio('Sound');
            });

            $('#beatButton').click(function () {
                properties.setTypeOfAudio('Beat');
            });

            $('#file-input').change(function (event) {
                let file = event.target.files[0];
                let fileName = file.name;

                if (file.type.match(/audio.*/)) {
                    let reader = new FileReader();
                        reader.onload = function(d) {
                            properties.onAudioLoad(fileName, d.target.result, document.getElementById("volumeSlider2").value, document.getElementById("speedSlider2").value, document.getElementById("lowpassSlider2").value, document.getElementById("highpassSlider2").value );
                            console.log("volume " + document.getElementById("volumeSlider2").value);
                            console.log("speed " + document.getElementById("speedSlider2").value);
                            console.log("speed " + document.getElementById("lowpassSlider2").value);
                            console.log("speed " + document.getElementById("highpassSlider2").value);


                        };
                        reader.readAsArrayBuffer(file);                   //reader.readAsDataURL(file);
                    
                }
                
            });
        });
    }

    inputStyle = {
        // prevent seeing the input field -> will be hidden behind the upload-image
        display: "none",
    };

    render() {
        return (<React.Fragment>

            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary" id="soundButton">Sound</button>
                <button type="button" class="btn btn-secondary" id="beatButton">Beat</button>
            </div>

            <form>
            <div class="form-group">
            Volume:
            <input type="range" class="form-control-range"  id="volumeSlider2" min="0" max="2" step="0.1" defaultValue="1" ></input>
            Speed:
            <input type="range" class="form-control-range"  id="speedSlider2" min="0" max="2" step="0.1" defaultValue="1" ></input>
            Lowpass-Filter:
            <input type="range" class="form-control-range"  id="lowpassSlider2" min="0" max="2" step="0.1" defaultValue="1" ></input>
            Highpass-Filter:
            <input type="range" class="form-control-range"  id="highpassSlider2" min="0" max="2" step="0.1" defaultValue="1" ></input>
            </div>
            </form>

            <button className="btn btn-secondary" type="button" id="upload">
            <img src={process.env.PUBLIC_URL + '/icons/upload.png'} width="20" height="20"/>
            </button>

            <input style={this.inputStyle} id="file-input" type="file" accept="audio/wav" name="file"/>
        </React.Fragment>);
    }

}

export default AudioUploader
