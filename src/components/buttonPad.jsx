import React, {Component} from 'react';
import MusicButton from './musicButton';
import PadSoundPlayer from '../audio/padSound.js';




class ButtonPad extends Component {
    state = {
        buttons: [
            {id: 1, value: "."},
            {id: 2, value: "."},
            {id: 3, value: "."},
            {id: 4, value: "."},

            {id: 5, value: "."},
            {id: 6, value: "."},
            {id: 7, value: "."},
            {id: 8, value: "."},

            {id: 9, value: "."},
            {id: 10, value: "."},
            {id: 11, value: "."},
            {id: 12, value: "."}
        ]
    };                              //value should me filename (value.wav)

    handleMusicButtonClicked(musicButtonId){
        let buttons = [...this.state.buttons];

        var soundInfo = this.props.getInfoToSound(buttons[musicButtonId-1].value, false);
        if(soundInfo.uploadedAudio != undefined){//if some uploaded sound should be played
            const copy = Object.assign({}, soundInfo);
            var dst = new ArrayBuffer(soundInfo.uploadedAudio.byteLength);
            new Uint8Array(dst).set(new Uint8Array(soundInfo.uploadedAudio));
            copy.uploadedAudio = dst;
            this.player = new PadSoundPlayer({uploadedAudio: copy.uploadedAudio, audContext:this.props.audioCtx, analyser: this.props.analyserNode, destination: this.props.streamDestination, settings: copy.settings} );
            return;
        }

        if(this.props.mappingSound){
            buttons[musicButtonId-1].value = this.props.mappingSound;
            this.props.onMappingDone("");
            return;
        }

        if(buttons[musicButtonId-1].value != "."){//play only if some sound was mapped to a button
            this.player = new PadSoundPlayer({URL: process.env.PUBLIC_URL+'/padSoundAudio/'+ buttons[musicButtonId-1].value +'.wav', audContext:this.props.audioCtx, analyser: this.props.analyserNode, destination: this.props.streamDestination, settings: soundInfo.settings} );
        }
    }


    constructor(){
        super();
        this.handleMusicButtonClicked = this.handleMusicButtonClicked.bind(this);
        document.onkeypress = this.handleKeyPressed.bind(this);
        this.handleMusicButtonClicked = this.handleMusicButtonClicked.bind(this);
    }

    handleKeyPressed(e) {//playing sounds with keyboard
        let buttonId = 0;
        if(e.code == 'KeyQ'){buttonId = 1;}
        if(e.code == 'KeyW'){buttonId = 2;}
        if(e.code == 'KeyE'){buttonId = 3;}
        if(e.code == 'KeyR'){buttonId = 4;}

        if(e.code == 'KeyA'){buttonId = 5;}
        if(e.code == 'KeyS'){buttonId = 6;}
        if(e.code == 'KeyD'){buttonId = 7;}
        if(e.code == 'KeyF'){buttonId = 8;}

        if(e.code == 'KeyZ'){buttonId = 9;}
        if(e.code == 'KeyX'){buttonId = 10;}
        if(e.code == 'KeyC'){buttonId = 11;}
        if(e.code == 'KeyV'){buttonId = 12;}

        if(buttonId != 0){this.handleMusicButtonClicked(buttonId);}
    }


    render(){
        let colorBackground = "shadow p-3 mb-5 bg-light rounded";
        let colorButton = "btn-dark";
        if(this.props.mappingSound){
            colorButton = "btn-light";
            colorBackground = "shadow p-3 mb-5 bg-dark rounded";
        }
        //{background}
        //<div class="shadow p-3 mb-5 bg-light rounded">
        return (<React.Fragment>
            <div className={colorBackground} >
            <center>
            <div className="row" >
            {this.state.buttons.map(button => (button.id <=4) ?  <MusicButton id={button.id} key={button.id} value={button.value} onClickButton={this.handleMusicButtonClicked} color={colorButton}/> : "")}
            </div>
            <div className="row" >
            {this.state.buttons.map(button => (button.id > 4 && button.id <= 8) ?  <MusicButton id={button.id} key={button.id} value={button.value} onClickButton={this.handleMusicButtonClicked} color={colorButton}/> : "")}
            </div>
            <div className="row" >
            {this.state.buttons.map(button => (button.id > 8 && button.id <= 12) ? <MusicButton id={button.id} key={button.id} value={button.value} onClickButton={this.handleMusicButtonClicked} color={colorButton}/> : "")}
            </div>
            </center>
            </div>
            </React.Fragment>);
    }

}


export default ButtonPad
