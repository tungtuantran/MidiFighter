import React, {Component} from 'react';
import $ from "jquery";

class AudioUploader extends Component {

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
                            properties.onAudioLoad(fileName, d.target.result);
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

            <button className="btn btn-secondary" type="button" id="upload">
            <img src={process.env.PUBLIC_URL + '/icons/upload.png'} width="20" height="20"/>
            </button>

            <input style={this.inputStyle} id="file-input" type="file" accept="audio/wav" name="file"/>
        </React.Fragment>);
    }

}

export default AudioUploader
