import React, {Component} from 'react';
import BackgroundBeatPlayer from '../audio/BackgroundBeat.js';



class MusicButton extends Component {
    state = {
        soundName: ""
    };

    buttonStyle = {
        maxwidth:250
    };

    constructor(){
        super();
        this.handlePlay = this.handlePlay.bind(this);
    }

    handlePlay(){
        this.props.onClickButton(this.props.id);
        //console.log("heyhey"+this.props.id);
    }


    render(){
        let color = "btn "+this.props.color+ " btn-block p-4 mb-4";
        return (<React.Fragment>
            <div class="col-sm-3">
            <button  class={color}   onClick={this.handlePlay}>{this.props.value}</button>
            </div>
            </React.Fragment>);
    }

}


export default MusicButton
