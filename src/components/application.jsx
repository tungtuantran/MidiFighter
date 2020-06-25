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
        soundsList: [{
            name: '808',
            speed: 1,
            volume: 1,
            lowpass: 0,
            highpass: 0
        },
            {
                name: 'midtom',
                speed: 1,
                volume: 1,
                lowpass: 0,
                highpass: 0
            },
            {
                name: 'snare',
                speed: 1,
                volume: 1,
                lowpass: 0,
                highpass: 0
            },
            {
                name: 'bassC2',
                speed: 1,
                volume: 1,
                lowpass: 0,
                highpass: 0
            },
            {
                name: 'sqrBass',
                speed: 1,
                volume: 1,
                lowpass: 0,
                highpass: 0
            },
            {
                name: 'openhat',
                speed: 1,
                volume: 1,
                lowpass: 0,
                highpass: 0
            },
            {
                name: 'kick',
                speed: 1,
                volume: 1,
                lowpass: 0,
                highpass: 0
            }],
        beatsList: [{
            name: 'BoomChuck',
            speed: 1,
            volume: 1,
            lowpass: 0,
            highpass: 0
        },
            {
                name: 'BasicRock',
                speed: 1,
                volume: 1,
                lowpass: 0,
                highpass: 0
            },
            {
                name: 'Kick',
                speed: 1,
                volume: 1,
                lowpass: 0,
                highpass: 0
            },
            {
                name: 'OverdriveBass',
                speed: 1,
                volume: 1,
                lowpass: 0,
                highpass: 0
            },
            {
                name: 'SidechainedPluck',
                speed: 1,
                volume: 1,
                lowpass: 0,
                highpass: 0
            },
            {
                name: 'FutureBassSaw',
                speed: 1,
                volume: 1,
                lowpass: 0,
                highpass: 0
            }],
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
        this.getInfoToSound = this.getInfoToSound.bind(this);
        if (!window.AudioContext || window.webkitAudioContext) {
            alert("Web Audio API is not supported in this browser!")
            return;
        }
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.destination = this.audioCtx.createMediaStreamDestination();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.connect(this.audioCtx.destination);
    }

    setTypeOfAudio(type){
        if(type == "Sound" || type == "Beat"){
            this.setState({
                typeOfAudio: type,
            });
        }
    }


    getInfoToSound(soundName, beatSound){
        let audioInfo = null;
        var uploadedAudio = this.state.uploadedAudio.filter(obj => {
            return obj.soundName === soundName
        })
        let soundSettings = null;
        if(beatSound){
            soundSettings = this.state.beatsList.filter(obj => {
                return obj.name === soundName
            })
        }else{
            soundSettings = this.state.soundsList.filter(obj => {
                return obj.name === soundName
            })
        }
        if(uploadedAudio.length == 0){ audioInfo = { settings: soundSettings[0] };}
        else{ audioInfo = {uploadedAudio: uploadedAudio[0].audio, settings: soundSettings[0] };}
        audioInfo.audContext = this.audioCtx;
        audioInfo.analyser = this.analyser;
        audioInfo.destination = this.destination;

        return audioInfo;
    }

    handleAudioLoading(fileName, audioContent, volume, speed, lowpass, highpass){

        let availableFileName = false;
        let fileCounter = 1;

        if(this.state.typeOfAudio == "Sound"){
            if (this.state.soundsList.filter(sound => sound.name === fileName).length === 0) {
                this.setState({
                    soundsList: this.state.soundsList.concat([{
                        name: fileName,
                        speed: speed,                   //edit speed and volume
                        volume: volume,
                        lowpass: lowpass,
                        highpass: highpass
                    }])
                });
                this.setState({
                    uploadedAudio: this.state.uploadedAudio.concat([{soundName: fileName, audio: audioContent}])
                });

            }else{

                while(!availableFileName){
                    if(this.state.soundsList.filter(sound => sound.name.toString() === fileName.toString() + fileCounter.toString()).length > 0){
                        fileCounter++;
                    }else{
                        this.setState({
                            soundsList: this.state.soundsList.concat([{
                                name: fileName + fileCounter.toString(),
                                speed: speed,                   //edit speed and volume
                                volume: volume,
                                lowpass: lowpass,
                                highpass: highpass
                            }])
                        });
                        this.setState({
                            uploadedAudio: this.state.uploadedAudio.concat([{soundName: fileName + fileCounter.toString(), audio: audioContent}])
                        });
                        availableFileName = true;
                        return;
                    }
                }

            }
        }
        if(this.state.typeOfAudio == "Beat"){
            if (this.state.beatsList.filter(beat => beat.name === fileName).length === 0) {
                this.setState({
                    beatsList: this.state.beatsList.concat([{
                        name: fileName,
                        speed: speed,                   //edit speed and volume
                        volume: volume,
                        lowpass: lowpass,
                        highpass: highpass
                    }])
                });
                this.setState({
                    uploadedAudio: this.state.uploadedAudio.concat([{soundName: fileName, audio: audioContent}])
                });
            }else {
                while(!availableFileName){
                    if(this.state.beatsList.filter(beat => beat.name.toString() === fileName.toString() + fileCounter.toString()).length > 0){
                        fileCounter++;
                    }else{
                        this.setState({
                            beatsList: this.state.beatsList.concat([{
                                name: fileName + fileCounter.toString(),
                                speed: speed,                   //edit speed and volume
                                volume: volume,
                                lowpass: lowpass,
                                highpass: highpass
                            }])
                        });
                        this.setState({
                            uploadedAudio: this.state.uploadedAudio.concat([{soundName: fileName + fileCounter.toString(), audio: audioContent}])
                        });
                        availableFileName = true;
                        return;
                    }
                }
            }
        }
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
            return;
        }
        //this.state.soundToMap = sound;
        this.setState({soundToMap: sound});
    }
    //if the user clicks on the "-"-button of some tool
    handleToolDeleted(tool ){
        if (this.state.choosenTools.includes(tool) ) {
            const index = this.state.choosenTools.indexOf(tool);
            delete this.state.choosenTools[index];
            var filtered = this.state.choosenTools.filter(function (el) {
                return el != null;
            });
            this.setState({
                choosenTools: filtered
            });
        }
    }

    render() {
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
                    <UploadingTool streamDestination={this.destination}
                    audioCtx={this.audioCtx}
                    analyserNode={this.analyser}
                    setTypeOfAudio={this.setTypeOfAudio}
                    onUploadSound={this.handleAudioLoading}
                    soundsList={this.state.soundsList}
                    beatsList={this.state.beatsList}
                    onToolDelete={this.handleToolDeleted}/></div>}
                </Spring>;
        }
        if (this.state.choosenTools.includes("BackgroundBeat")) {
            bBeat = <Spring
            config={{duration: 400}}
            from={{opacity: 0}}
            to={{opacity: 1}}>
                {props => <div style={props}><BackgroundBeat
                    onToolDelete={this.handleToolDeleted}
                    getInfoToSound={this.getInfoToSound}
                    beatsList= {this.state.beatsList}/></div>}
                </Spring>;
        }
        if (this.state.choosenTools.includes("Metronome")) {
            metronome = <Spring
            config={{duration: 400}}
            from={{opacity: 0}}
            to={{opacity: 1}}>
                {props => <div style={props}><Metronome onToolDelete={this.handleToolDeleted} />
                    </div>}
                </Spring>;
        }

        return (<React.Fragment>
            <div className="container">
            <div className="row p-5"></div>
            <div className="row">
            <div className="col-sm-3">
            <MapSound onUploadSound={this.handleAudioLoading} onMapping={this.handleSoundMapping}
            soundToMap={this.state.soundToMap} soundsList={this.state.soundsList}/>
            {bBeat}
            {metronome}
            <center>
            <div className="dropdown mt-4" id="toolsDropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <Octicon icon={Plus}/> Add Tool
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">RecordingTool</a>
            <a className="dropdown-item" href="#">UploadingTool</a>
            <a className="dropdown-item" href="#">BackgroundBeat</a>
            <a className="dropdown-item" href="#">Metronome</a>
            </div>
            </div>
            </center>
            </div>
            <div className="col-md-6">
            <ButtonPad  mappingSound={this.state.soundToMap}
            onMappingDone={this.handleSoundMapping}
            getInfoToSound={this.getInfoToSound}  />
            {rTool}
            </div>
            <div className="col-sm-3">
            <Visualizer analyserNode={this.analyser}/>
            {uTool}
            </div>
            </div>

            </div>
            </React.Fragment>);
    }

}


export default Application
