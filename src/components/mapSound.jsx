import React, {Component} from 'react';
import $ from 'jquery';
import AudioUploader from "./audioUploader";

class MapSound extends Component {


    constructor() {
        super();
        this.handleSoundChoosen = this.handleSoundChoosen.bind(this);
    }

    handleSoundChoosen(choosenSound) {
        console.log(choosenSound);
        this.props.onMapping(choosenSound);
    }


    render() {
        var c = this;
        //should be here and not in constructor - because you can upload new audios:
        $(document).ready(function () {
            $('.dropdown').each(function (key, dropdown) {
                var $dropdown = $(dropdown);
                $dropdown.find('.dropdown-menu a').on('click', function () {
                    if ($dropdown[0].id == "mapSoundDropdown") {
                        console.log("yo");
                        let sound = $dropdown.find('#dropdownMenuButton').text($(this).text())[0].innerText;
                        c.handleSoundChoosen(sound);
                    }
                    //$dropdown.find('button').text($(this).text()).append(' <span class="caret"></span>');
                });
            });
        });
        console.log("rendering map!");
        let dropdownText = "Choose Sound";
        if (this.props.soundToMap) {
            dropdownText = this.props.soundToMap;
        }
        const soundList = this.props.soundsList.map((soundName) =>
            <a class="dropdown-item" href="#">{soundName}</a>
        );
        return (<React.Fragment>
            <div class="shadow p-3 mb-5 bg-light rounded">
            <h4>Map Sound</h4>

            <div class="dropdown p-1" id="mapSoundDropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {dropdownText}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {soundList}
            </div>
            <AudioUploader onAudioLoad={this.props.onUploadSound} ></AudioUploader>
            </div>

            </div>
            </React.Fragment>);
    }

}


export default MapSound
