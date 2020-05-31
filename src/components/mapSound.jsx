
import React, {Component} from 'react';
import $ from 'jquery';

class MapSound extends Component {


    constructor(){
        super();
        var c = this;
        $( document ).ready(function() {
            $('.dropdown').each(function (key, dropdown) {
                var $dropdown = $(dropdown);
                $dropdown.find('.dropdown-menu a').on('click', function () {
                    if($dropdown[0].id == "mapSoundDropdown"){
                        let sound = $dropdown.find('button').text($(this).text())[0].innerText;
                        c.handleSoundChoosen(sound);
                    }
                    //$dropdown.find('button').text($(this).text()).append(' <span class="caret"></span>');
                });
            });
        });
        this.handleSoundChoosen = this.handleSoundChoosen.bind(this);
    }

    handleSoundChoosen(choosenSound){
        this.props.onMapping(choosenSound);
    }

    render(){
        console.log("rendering map!");
        let dropdownText = "Choose Sound";
        if(this.props.soundToMap){ dropdownText = this.props.soundToMap}
        return (<React.Fragment>
            <div class="shadow p-3 mb-5 bg-light rounded">
            <h4>Map Sound</h4>

            <div class="dropdown p-1" id="mapSoundDropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {dropdownText}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" id="alertMe" href="#">Action</a>
            <a class="dropdown-item" href="#">kick1</a>
            <a class="dropdown-item" href="#">boom1</a>
            </div>
            </div>

            </div>
            </React.Fragment>);
    }

}


export default MapSound