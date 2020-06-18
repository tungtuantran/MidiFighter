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
        console.log("hey clicked "+musicButtonId);

        let buttons = [...this.state.buttons];

        var uploadedSound = this.props.getUploadedSound(buttons[musicButtonId-1].value);
        if(uploadedSound != undefined){//if some uploaded sound should be played
            console.log("im in boyz");
            const copy = Object.assign({}, uploadedSound);
            var dst = new ArrayBuffer(uploadedSound.audio.byteLength);
            new Uint8Array(dst).set(new Uint8Array(uploadedSound.audio));
            copy.audio = dst;
            this.player = new PadSoundPlayer({uploadedAudio: copy, audContext:this.props.audioCtx, analyser: this.props.analyserNode, destination: this.props.streamDestination, speed: this.props.soundsList.find(sound => sound.name === buttons[musicButtonId-1].value).speed, volume: this.props.soundsList.find(sound => sound.name === buttons[musicButtonId-1].value).volume, lowpassfilter: this.props.soundsList.find(sound => sound.name === buttons[musicButtonId-1].value).lowpass, highpassfilter: this.props.soundsList.find(sound => sound.name === buttons[musicButtonId-1].value).highpass} );

            //this.player.audioCtx.resume();
            return;
        }

        if(this.props.mappingSound){
            buttons[musicButtonId-1].value = this.props.mappingSound;
            this.props.onMappingDone("");

            //this.player = new PadSoundPlayer(process.env.PUBLIC_URL+'/padSoundAudio/'+ buttons[musicButtonId-1].value +'.wav', this.props.audioCtx, this.props.analyserNode);
            //this.player.audioCtx.resume();
            return;
        }
        if(buttons[musicButtonId-1].value != "."){//play only if some sound was mapped to a button
            console.log(buttons[musicButtonId-1].value + "asdasd");
            this.player = new PadSoundPlayer({URL: process.env.PUBLIC_URL+'/padSoundAudio/'+ buttons[musicButtonId-1].value +'.wav', audContext:this.props.audioCtx, analyser: this.props.analyserNode, destination: this.props.streamDestination} );
            //this.player = new PadSoundPlayer(process.env.PUBLIC_URL+'/padSoundAudio/'+ buttons[musicButtonId-1].value +'.wav', this.props.audioCtx, this.props.analyserNode);
            this.player.audioCtx.resume();
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
            <div class={colorBackground} >
            <center>
            <div class="row" >
            {this.state.buttons.map(button => (button.id <=4) ?  <MusicButton id={button.id} key={button.id} value={button.value} onClickButton={this.handleMusicButtonClicked} color={colorButton}/> : "")}
            </div>
            <div class="row" >
            {this.state.buttons.map(button => (button.id > 4 && button.id <= 8) ?  <MusicButton id={button.id} key={button.id} value={button.value} onClickButton={this.handleMusicButtonClicked} color={colorButton}/> : "")}
            </div>
            <div class="row" >
            {this.state.buttons.map(button => (button.id > 8 && button.id <= 12) ? <MusicButton id={button.id} key={button.id} value={button.value} onClickButton={this.handleMusicButtonClicked} color={colorButton}/> : "")}
            </div>
            </center>
            </div>
            </React.Fragment>);
    }

}


export default ButtonPad
