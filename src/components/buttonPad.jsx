import React, {Component} from 'react';
import MusicButton from './musicButton';


class ButtonPad extends Component {
    state = {
        buttons: [
            {id: 1, value: "kick11"},
            {id: 2, value: "boom"},
            {id: 3, value: "yeah"},
            {id: 4, value: "haha11"},

            {id: 5, value: "."},
            {id: 6, value: "."},
            {id: 7, value: "."},
            {id: 8, value: "."},

            {id: 9, value: "."},
            {id: 10, value: "."},
            {id: 11, value: "."},
            {id: 12, value: "."}
        ]
    };

    handleMusicButtonClicked(musicButtonId){
        console.log("hey clicked"+musicButtonId);
        if(this.props.mappingSound){
            let buttons = [...this.state.buttons];
            buttons[musicButtonId-1].value = this.props.mappingSound;
            this.props.onMappingDone("");
            return;
        }
    }


    constructor(){
        super();
        this.handleMusicButtonClicked = this.handleMusicButtonClicked.bind(this);
        document.onkeypress = this.handleKeyPressed.bind(this);
        this.handleMusicButtonClicked = this.handleMusicButtonClicked.bind(this);
    }

    handleKeyPressed(e) {
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
