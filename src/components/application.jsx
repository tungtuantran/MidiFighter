import ButtonPad from './buttonPad';
import Visualizer from './visualizer.jsx';
import BackgroundBeat from './backgroundBeat';
import UploadingTool from './uploadingTool';
import RecordingTool from './recordingTool';
import MapSound from './mapSound';
import Metronome from './metronome';
import React, {Component} from 'react';
import $ from 'jquery';
import Octicon, {Plus} from '@primer/octicons-react'

import { Spring } from "react-spring/renderprops";

class Application extends Component {
    state = {
        typeOfAudio: "",
        soundToMap: "",
        soundsList: ["808", "midtom", "cowbell", "snare", "bassC2", "sqrBass", "openhat", "kick"],
        beatsList: ["BoomChuck", "BasicRock", "Kick", "OverdriveBass", "SidechainedPluck", "FutureBassSaw"],
        choosenTools: [],
        uploadedAudio: []
    };


    constructor() {
        super();

        var c = this;
        $(document).ready(function () {
            $('.dropdown').each(function (key, dropdown) {
                var $dropdown = $(dropdown);
                $dropdown.find('.dropdown-menu a').on('click', function () {
                    if ($dropdown[0].id == "toolsDropdown") {
                        c.handleToolChoosen($(this).text());
                        //$dropdown.find('button').text("").append(' <span class="caret"></span>');
                    }
                });
            });
        });

        this.setTypeOfAudio = this.setTypeOfAudio.bind(this);
        this.handleSoundMapping = this.handleSoundMapping.bind(this);
        this.handleToolDeleted = this.handleToolDeleted.bind(this);
        this.handleAudioLoading = this.handleAudioLoading.bind(this);
        this.getUploadedSound = this.getUploadedSound.bind(this);
        if (!window.AudioContext || window.webkitAudioContext) {
            alert("Web Audio API is not supported in this browser!")
            return;
        }
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.destination = this.audioCtx.createMediaStreamDestination();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.connect(this.audioCtx.destination)
    }

    setTypeOfAudio(type){
        console.log(type + "asdsad");
        if(type == "Sound" || type == "Beat"){
            this.setState({
                typeOfAudio: type,
            });
        }
    }


    getUploadedSound(soundName){
        var result = this.state.uploadedAudio.filter(obj => {
            return obj.soundName === soundName
        })
        return result[0];
    }

    handleAudioLoading(fileName, audioContent){
        if(this.state.typeOfAudio == "Sound"){
            if (!this.state.soundsList.includes(fileName)) {
                this.setState({
                    soundsList: this.state.soundsList.concat([fileName])
                });
                this.setState({
                    uploadedAudio: this.state.uploadedAudio.concat([{soundName: fileName, audio: audioContent}])
                });
            }
            alert('UPLOAD');
        }
        if(this.state.typeOfAudio == "Beat"){
            if (!this.state.beatsList.includes(fileName)) {
                this.setState({
                    beatsList: this.state.beatsList.concat([fileName])
                });
                this.setState({
                    uploadedAudio: this.state.uploadedAudio.concat([{soundName: fileName, audio: audioContent}])
                });
            }
            alert('UPLOAD');
        }
        console.log(this.state.uploadedAudio)
    }

    handleToolChoosen(toolName) {
        //add new tool only if it was not already added:
        if (!this.state.choosenTools.includes(toolName)) {
            this.setState({
                choosenTools: this.state.choosenTools.concat([toolName])
            });
        }
    }

    handleSoundMapping(sound) {
        if (sound == "") {//if mapping is done
            //this.state.soundToMap = "";
            this.setState({soundToMap: ""});
            console.log("mapping end!");
            return;
        }
        //this.state.soundToMap = sound;
        this.setState({soundToMap: sound});
        console.log("mapping start!");
    }
    //if the user clicks on the "-"-button of some tool
    handleToolDeleted(tool ){
        console.log(tool);
        if (this.state.choosenTools.includes(tool) ) {
            const index = this.state.choosenTools.indexOf(tool);
            delete this.state.choosenTools[index];
            var filtered = this.state.choosenTools.filter(function (el) {
                return el != null;
            });
            this.setState({
                choosenTools: filtered
            });
            console.log(this.state.choosenTools);
        }
    }

    render() {
        console.log("rendering!");
        let bBeat = null;
        let metronome = null;
        let uTool = null;
        let rTool = null;
        if (this.state.choosenTools.includes("RecordingTool")) {
            rTool = <Spring
                config={{duration: 400}}
                from={{opacity: 0}}
                to={{opacity: 1}}>
                {props => <div style={props}>
                    <RecordingTool streamDestination={this.destination}
                                   onToolDelete={this.handleToolDeleted}/>
                </div>}
            </Spring>;
        }
        if (this.state.choosenTools.includes("UploadingTool")) {
            uTool = <Spring
                config={{duration: 400}}
                from={{opacity: 0}}
                to={{opacity: 1}}>
                {props => <div style={props}>
                    <UploadingTool onUploadSound={this.handleAudioLoading}
                                   onToolDelete={this.handleToolDeleted}/></div>}
            </Spring>;
        }
        if (this.state.choosenTools.includes("BackgroundBeat")) {
            bBeat = <Spring
                config={{duration: 400}}
                from={{opacity: 0}}
                to={{opacity: 1}}>
                {props => <div style={props}><BackgroundBeat audioCtx={this.audioCtx}
                                                             streamDestination={this.destination}
                                                             onToolDelete={this.handleToolDeleted}
                                                             analyserNode={this.analyser}/></div>}
            </Spring>;
        }
        if (this.state.choosenTools.includes("Metronome")) {
            metronome = <Spring
                config={{duration: 400}}
                from={{opacity: 0}}
                to={{opacity: 1}}>
                {props => <div style={props}><Metronome onToolDelete={this.handleToolDeleted}/>
                </div>}
            </Spring>;
        }
        //CREATE AUDIO CONTEXT
        return (<React.Fragment>
            <div class="container">
                <div class="row p-5"></div>
                <div class="row">
                    <div class="col-sm-3">
                        <MapSound onUploadSound={this.handleAudioLoading} onMapping={this.handleSoundMapping}
                                  soundToMap={this.state.soundToMap} soundsList={this.state.soundsList}/>
                        {bBeat}
                        {uTool}
                        <center>
                            <div class="dropdown " id="toolsDropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <Octicon icon={Plus}/> Add Tool
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#">RecordingTool</a>
                                    <a class="dropdown-item" href="#">UploadingTool</a>
                                    <a class="dropdown-item" href="#">BackgroundBeat</a>
                                    <a class="dropdown-item" href="#">Metronome</a>
                                </div>
                            </div>
                        </center>
                    </div>
                    <div class="col-md-6">
                        <ButtonPad audioCtx={this.audioCtx} analyserNode={this.analyser}
                                   mappingSound={this.state.soundToMap} onMappingDone={this.handleSoundMapping}
                                   getUploadedSound={this.getUploadedSound} streamDestination={this.destination}/>
                    </div>
                    <div class="col-sm-3">
                        <Visualizer analyserNode={this.analyser}/>
                        {metronome}
                        {rTool}
                    </div>
                </div>

            </div>
        </React.Fragment>);
    }

}


export default Application
