import ButtonPad from './buttonPad';
import Visualizer from './visualizer.jsx';
import BackgroundBeat from './backgroundBeat';
import MapSound from './mapSound';
import Metronome from './metronome';
import React, {Component} from 'react';
import $ from 'jquery';
import Octicon, { Plus} from '@primer/octicons-react'


class Application extends Component {
    state = {
        soundToMap:  "",
        choosenTools: []
    };


    constructor(){
        super();

        var c = this;
        $( document ).ready(function() {
            $('.dropdown').each(function (key, dropdown) {
                var $dropdown = $(dropdown);
                $dropdown.find('.dropdown-menu a').on('click', function () {
                    if($dropdown[0].id == "toolsDropdown"){
                        c.handleToolChoosen($(this).text());
                        //$dropdown.find('button').text("").append(' <span class="caret"></span>');
                    }
                });
            });
        });

        this.handleSoundMapping = this.handleSoundMapping.bind(this);
        if (!window.AudioContext || window.webkitAudioContext) {
            alert("Web Audio API is not supported in this browser!")
            return;
        }
        this.audioCtx = new (window.AudioContext||window.webkitAudioContext)();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.connect(this.audioCtx.destination)
    }

    handleToolChoosen(toolName){
        this.setState({
            choosenTools: this.state.choosenTools.concat([toolName])
        });
        console.log(this.state.choosenTools);
    }

    handleSoundMapping(sound){
        if(sound == ""){//if mapping is done
            //this.state.soundToMap = "";
            this.setState({soundToMap: ""});
            console.log("mapping end!");
            return;
        }
        //this.state.soundToMap = sound;
        this.setState({soundToMap: sound});
        console.log("mapping start!");
    }

    render(){
        console.log("rendering!");
        let bBeat = null;
        let metronome = null;
        if(this.state.choosenTools.includes("BackgroundBeat")){bBeat =  <BackgroundBeat audioCtx={this.audioCtx} analyserNode={this.analyser}/>;}
        if(this.state.choosenTools.includes("Metronome")){metronome =  <Metronome />;}
        //CREATE AUDIO CONTEXT
        return (<React.Fragment>
            <div class="container">
            <div class="row p-5" >
            </div>
            <div class="row" >
            <div class="col-sm-3">
            <MapSound onMapping={this.handleSoundMapping} soundToMap={this.state.soundToMap}/>
            {bBeat}
            <center>
            <div class="dropdown " id="toolsDropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <Octicon icon={Plus} /> Add Tool
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">BackgroundBeat</a>
            <a class="dropdown-item" href="#">Metronome</a>
            </div>
            </div>
            </center>

            </div>
            <div class="col-md-6">
            <ButtonPad audioCtx={this.audioCtx} analyserNode={this.analyser} mappingSound={this.state.soundToMap} onMappingDone={this.handleSoundMapping} />
            </div>
            <div class="col-sm-3">
            <Visualizer analyserNode={this.analyser}/>
            {metronome}
            </div>
            </div>
            </div>
            </React.Fragment>);
    }

}


export default Application
