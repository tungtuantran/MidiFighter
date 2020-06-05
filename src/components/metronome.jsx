
import React, {Component} from 'react';

import { Spring, useSpring, animated } from '@react-spring/web'
//import {Spring} from 'react-spring/renderprops'

class Metronome extends Component {

    state = {
        bpm: 40
    };


    constructor(){
        super();
        this.handleChangeBpm = this.handleChangeBpm.bind(this);
    }



    clockHandStyle = {
        width: "0",
        height: "0",
        borderStyle: "solid",
        borderWidth: "0 3px 80px 3px",
        bottom: "40px",
        borderColor: "transparent transparent #000000 transparent",
        position: "relative"
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

    render1(){
        let tension = 20/(150/60);
        return (<React.Fragment>
            <div class="shadow p-3 mt-2 bg-light rounded">
            <h4>Metronome</h4>

            <center>
            <div style={this.boxStyle}>
            <Spring
            config={{tension: 20, friction: 0, precision: 0.1}}
            from={{ opacity: 1,
                    transform: 'translate3d(0,35px,0) scale(1) rotateZ(340deg)'
            }}
            to={{ opacity: 1,
                    transform: 'translate3d(0px,35px,0) scale(1) rotateZ(360deg)'
            }}>
            {props => <div style={props}><div style={this.clockHandStyle}></div></div>}
            </Spring>
            </div>
            </center>
            <form>
            <div class="form-group">
            <input type="range" class="form-control-range"  id="bpmSlider" min="40" max="218" step="1" defaultValue="40" onClick={this.handleChangeBpm}></input>
            <span id="bpmText">{this.state.bpm}bpm</span>
            </div>
            </form>

            </div>
            </React.Fragment>);

    }

    render(){
        return (<React.Fragment>
            <div class="shadow p-3 mt-2 bg-light rounded">
            <h4>Metronome</h4>
            <center>
            <div style={this.boxStyle}>
            <App bpm={this.state.bpm} />
            </div>
            </center>
            <form>
            <div class="form-group">
            <input type="range" class="form-control-range"  id="bpmSlider" min="40" max="218" step="1" defaultValue="40" onClick={this.handleChangeBpm}></input>
            <span id="bpmText">{this.state.bpm}bpm</span>
            </div>
            </form>

            </div>
            </React.Fragment>);

    }

}



const clockHandStyleN = {
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
    console.log(dur);
    const props = useSpring({ config:{duration: dur}, from: {opacity: 1, transform: 'translate3d(0,35px,0) scale(1) rotateZ(340deg)'}, to: {transform: 'translate3d(0px,35px,0) scale(1) rotateZ(380deg)', opacity: 1}, loop: { reverse: true }})

    return <animated.div style={props}><div style={clockHandStyleN}></div></animated.div>
}

export default Metronome
