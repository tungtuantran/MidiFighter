import React, {Component} from 'react';
import BackgroundBeatPlayer from '../audio/BackgroundBeat.js';



class MusicButton extends Component {


    constructor(){
        super();
        this.handlePlay = this.handlePlay.bind(this);
    }

    handlePlay(){
        this.props.onClickButton(this.props.id);
    }


    render(){
        let color = "btn "+this.props.color+ " btn-block p-4 mb-4";
        return (<React.Fragment>
            <div className="col-sm-3">
            <button className={color}   onClick={this.handlePlay}>{this.props.value}</button>
            </div>
            </React.Fragment>);
    }

}


export default MusicButton
