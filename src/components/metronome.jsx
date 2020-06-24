
import PadSoundPlayer from '../audio/padSound.js';
import React, {PureComponent, Component} from 'react';

import { Spring, useSpring, animated } from '@react-spring/web'
//import {Spring} from 'react-spring/renderprops'
import Octicon, {Dash} from '@primer/octicons-react'

class Metronome extends PureComponent {

    state = {
        bpm: 40
    };


    constructor(){
        super();
        this.handleChangeBpm = this.handleChangeBpm.bind(this);
    }



    boxStyle = {
        borderRadius: "10px 10px 5px 5px",
        display: "block",
        width: "50px",
        height: "80px",
        backgroundColor: "rgb(210,180,140)",
        position: "relative"
    }

    handleChangeBpm(){
        var input = document.getElementById("bpmSlider").value;
        document.getElementById("bpmText").innerText = input+"bpm";
        this.setState({bpm: input});
    }


    render(){

        const hStyle = {
            display: "inline"
        };
        const toolName = "Metronome";
        return (<React.Fragment>
            <div className="shadow p-3 mt-2 bg-light rounded">
            <h4 style={hStyle}>Metronome</h4>
            <button className=" btn btn-light  ml-1 mb-2"   onClick={() => this.props.onToolDelete("Metronome")}><Octicon icon={Dash}/></button>

            <div className="row">
            <div className="col-sm-4">
            <center>
            <div style={this.boxStyle}>
            <App bpm={this.state.bpm} />
            </div>
            </center>
            </div>

            <div className="col-sm-6">
            <form>
            <div className="form-group">
            <span id="bpmText">{this.state.bpm}bpm</span>
            <input type="range" className="form-control-range mt-2"  id="bpmSlider" min="40" max="218" step="1" defaultValue="40" onClick={this.handleChangeBpm}></input>
            </div>
            </form>
            </div>

            </div>

            </div>
            </React.Fragment>);

    }

}



const clockHandStyle = {
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 3px 80px 3px",
    bottom: "40px",
    borderColor: "transparent transparent #000000 transparent",
    position: "relative"
}

function App(args) {
    let dur = (60 / args.bpm)*1000;
    dur = parseFloat(dur.toFixed(2));
    const props = useSpring({ config:{duration: dur, precision: 0}, from: { transform: 'translate3d(0,35px,0)  rotateZ(340deg)'}, to: {transform: 'translate3d(0px,35px,0)  rotateZ(380deg)'}, loop: { reverse: true }})

    return <animated.div style={props}><div style={clockHandStyle}></div></animated.div>
}

export default Metronome
