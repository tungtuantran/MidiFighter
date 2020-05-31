import React, {Component} from 'react';


class Counter extends Component {
    state = {
        stateOfPlaying: "Stopped",
        volume: 50,
        tags: ['a', 'b', 'c']
    };

    styles = {
        fontSize: 20
    };

    constructor(){
        super();
        this.handlePlay = this.handlePlay.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleChangeVolume = this.handleChangeVolume.bind(this);
    }

    renderTags(){
        if(this.state.tags.length === 2) return <p>There are no tags</p>;
        return <ul> {this.state.tags.map(tag => <li key={tag}>{tag} </li>)} </ul>;
    }
    handleStop(){
        this.state.stateOfPlaying = "Stopped";
        this.setState({stateOfPlaying: this.state.stateOfPlaying});
    }
    handlePlay(){
        this.state.stateOfPlaying = "Playing";
        this.setState({stateOfPlaying: this.state.stateOfPlaying});
    }

    handleChangeVolume(){
        var input = document.getElementById("volumeSlider");
        this.state.volume = input.value;
        this.setState({volume: input.value});
    }

    render(){
        var classes = "badge m-2 ";
        classes += (this.state.count === 0) ? "badge-warning" : "badge-primary";
        return (<React.Fragment>
            <span className={classes}>{this.state.stateOfPlaying}</span>

            <button className="btn btn-secondary btn-sm" onClick={this.handlePlay}>Play</button>
            <button className="btn btn-secondary btn-sm" onClick={this.handleStop}>Stop</button>
            <form>
            <div className="form-group w-25">
            <label htmlFor="formControlRange">Volume: {this.state.volume}</label>
            <input type="range" className="form-control-range" id="volumeSlider" min="0" max="100" step="1" onChange={this.handleChangeVolume}></input>
            </div>
            </form>
            {this.renderTags()}
            </React.Fragment>);
    }

}


export default Counter
