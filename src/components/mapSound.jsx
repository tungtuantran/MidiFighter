import React, {Component} from 'react';
import $ from 'jquery';
import AudioUploader from "./audioUploader";

class MapSound extends Component {


    constructor() {
        super();
        this.handleSoundChoosen = this.handleSoundChoosen.bind(this);
    }


    handleSoundChoosen(choosenSound) {
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
                        let sound = $dropdown.find('#dropdownMenuButton').text($(this).text())[0].innerText;
                        c.handleSoundChoosen(sound);
                    }
                    //$dropdown.find('button').text($(this).text()).append(' <span class="caret"></span>');
                });
            });
        });
        let dropdownText = "Choose Sound";
        if (this.props.soundToMap) {
            dropdownText = this.props.soundToMap;
        }
        const soundList = this.props.soundsList.map(soundName =>
            <a className="dropdown-item" key={soundName.name} href="#">{soundName.name}</a>
        );
        return (<React.Fragment>
            <div className="shadow p-3  bg-light rounded">
            <h4>Map Sound</h4>

            <div className="dropdown p-1" id="mapSoundDropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {dropdownText}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {soundList}
            </div>

            </div>

            </div>
            </React.Fragment>);
    }

}


export default MapSound
