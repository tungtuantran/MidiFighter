import React, {Component} from 'react';
import $ from 'jquery';
import BackgroundBeatPlayer from '../audio/BackgroundBeat.js';

class BackgroundBeat extends Component {
    state = {
        soundName: "",
        playingButton: "Play"
    };

    buttonStyle = {
        maxwidth:250
    };

    constructor(){
        super();
        var c = this;
        $( document ).ready(function() {
            $('.dropdown').each(function (key, dropdown) {
                var $dropdown = $(dropdown);
                $dropdown.find('.dropdown-menu a').on('click', function () {
                    if($dropdown[0].id == "soundDropdown"){
                        c.handleSoundChoosen($dropdown.find('button').text($(this).text())[0].innerText);
                        $dropdown.find('button').text($(this).text()).append(' <span class="caret"></span>');
                    }
                });
            });
        });
        this.handleSoundChoosen = this.handleSoundChoosen.bind(this);
        this.handlePlayBackground = this.handlePlayBackground.bind(this);
        this.handleChangeVolume = this.handleChangeVolume.bind(this);
        this.handleChangeSpeed = this.handleChangeSpeed.bind(this);
        this.soundToPlay = "";
    }

    handleSoundChoosen(choosenSound){
        this.soundToPlay=choosenSound;
        if(this.player  !== undefined  ){//if the user changes the beatAudio while it is already playing
            this.player.stopAndDisconnect();
            this.player = new BackgroundBeatPlayer(process.env.PUBLIC_URL+'/backgroundbeatAudio/'+this.soundToPlay+'.wav', this.props.audioCtx, this.props.analyserNode);
            if(this.state.playingButton == "Play"){this.player.audioCtx.suspend();}
            //applying values of the sliders
            var input = document.getElementById("speedSlider").value;
            this.player.source.playbackRate.value = input;
            var input = document.getElementById("volumeSlider").value;
            this.player.gainNode.gain.value = input;
        }
    }
    handlePlayBackground(){
        if(this.player  === undefined){
            if(this.state.playingButton == "Play" && this.soundToPlay!=""){
                this.player = new BackgroundBeatPlayer(process.env.PUBLIC_URL+'/backgroundbeatAudio/'+this.soundToPlay+'.wav', this.props.audioCtx, this.props.analyserNode);
            }
            if(this.soundToPlay == ""){return;}//nothing choosen - dont start playing anything
        }
        let newPlayingState = "";
        if(this.state.playingButton == "Play"){
            newPlayingState = "Stop";
            this.player.audioCtx.resume();
        }else{
            this.player.audioCtx.suspend();
            newPlayingState = "Play";
        }
        this.setState({playingButton: newPlayingState});
    }
    handleChangeSpeed(){
        if(this.player === undefined){return;}
        var input = document.getElementById("speedSlider").value;
        if(input == 0){input=0.1;}//it cannot be 0 because then it will start playing with the normal speed
        this.player.source.playbackRate.value = input;
    }
    handleChangeVolume(){
        if(this.player === undefined){return;}
        var input = document.getElementById("volumeSlider").value;
        this.player.gainNode.gain.value = input;
    }

    render(){
        return (<React.Fragment>
            <div class="shadow p-3 mb-5 bg-light rounded">
            <h4>BackgroundBeat</h4>

            <div class="dropdown p-1" id="soundDropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Choose Sound
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" id="alertMe" href="#">BoomChuck</a>
            <a class="dropdown-item" href="#">BasicRock</a>
            <a class="dropdown-item" href="#">LandOfBits</a>
            </div>
            </div>


            <form>
            <div class="form-group">
            Volume:
            <input type="range" class="form-control-range"  id="volumeSlider" min="0" max="2" step="0.1" defaultValue="1" onChange={this.handleChangeVolume}></input>
            Speed:
            <input type="range" class="form-control-range"  id="speedSlider" min="0" max="2" step="0.1" defaultValue="1" onChange={this.handleChangeSpeed}></input>
            </div>
            </form>

            <center>
            <button  class="btn btn-dark p-1  "   onClick={this.handlePlayBackground}>{this.state.playingButton}</button>
            </center>
            </div>
            </React.Fragment>);
    }

}


export default BackgroundBeat