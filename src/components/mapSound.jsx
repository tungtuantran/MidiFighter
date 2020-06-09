import React, {Component} from 'react';
import $ from 'jquery';
import AudioUploader from "./audioUploader";

class MapSound extends Component {


    constructor() {
        super();
        var c = this;
        $(document).ready(function () {
            $('.dropdown').each(function (key, dropdown) {
                var $dropdown = $(dropdown);
                $dropdown.find('.dropdown-menu a').on('click', function () {
                    if ($dropdown[0].id == "mapSoundDropdown") {
                        let sound = $dropdown.find('#dropdownMenuButton').text($(this).text())[0].innerText;
                        c.handleSoundChoosen(sound);
                    }
                    //$dropdown.find('button').text($(this).text()).append(' <span class="caret"></span>');
                });
            });
        });
        this.handleSoundChoosen = this.handleSoundChoosen.bind(this);
    }

    handleSoundChoosen(choosenSound) {
        this.props.onMapping(choosenSound);
    }

    handleAudioLoading(fileName, audioContent){
        debugger
        console.log("handleAudioLoading")
        alert('UPLOAD');
    }

    render() {
        console.log("rendering map!");
        let dropdownText = "Choose Sound";
        if (this.props.soundToMap) {
            dropdownText = this.props.soundToMap
        }
        return (<React.Fragment>
            <div class="shadow p-3 mb-5 bg-light rounded">
            <h4>Map Sound</h4>

            <div class="dropdown p-1" id="mapSoundDropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {dropdownText}
            </button>
            <AudioUploader onAudioLoad={this.handleAudioLoading} ></AudioUploader>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">808</a>
            <a class="dropdown-item" href="#">midtom</a>
            <a class="dropdown-item" href="#">cowbell</a>
            <a class="dropdown-item" href="#">snare</a>
            <a class="dropdown-item" href="#">bassC2</a>
            <a class="dropdown-item" href="#">sqrBass</a>
            <a class="dropdown-item" href="#">openhat</a>
            <a class="dropdown-item" href="#">kick</a>
            </div>
            </div>

            </div>
            </React.Fragment>);
    }

}


export default MapSound
