import ButtonPad from './buttonPad';
import Visualizer from './visualizer.jsx';
import BackgroundBeat from './backgroundBeat';
import MapSound from './mapSound';
import React, {Component} from 'react';


class Application extends Component {
    state = {
        soundToMap:  ""
    };


    constructor(){
        super();
        this.handleSoundMapping = this.handleSoundMapping.bind(this);
        if (!window.AudioContext || window.webkitAudioContext) {
            alert("Web Audio API is not supported in this browser!")
            return;
        }
        this.audioCtx = new (window.AudioContext||window.webkitAudioContext)();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.connect(this.audioCtx.destination)
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
        //CREATE AUDIO CONTEXT
        return (<React.Fragment>
            <div class="container">
            <div class="row p-5" >
            </div>
            <div class="row" >
            <div class="col-sm-3">
            <MapSound onMapping={this.handleSoundMapping} soundToMap={this.state.soundToMap}/>
            <BackgroundBeat audioCtx={this.audioCtx} analyserNode={this.analyser}/>
            </div>
            <div class="col-md-6">
            <ButtonPad mappingSound={this.state.soundToMap} onMappingDone={this.handleSoundMapping} />
            </div>
            <div class="col-sm-3">
            <Visualizer analyserNode={this.analyser}/>
            </div>
            </div>
            </div>
            </React.Fragment>);
    }

}


export default Application
