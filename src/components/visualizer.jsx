
import React, {PureComponent} from 'react';
import $ from 'jquery';

class Visualizer extends PureComponent {


    constructor(){
        super();
        this.draw = this.draw.bind(this);
    }



    draw() {
        let canvas = document.getElementById('canvasVis');
        this.canvasCtx = canvas.getContext('2d');
        this.analyser = this.props.analyserNode;

        this.analyser.fftSize = 256;
        let widthCanvas = 230;
        let heightCanvas = 300;
        let bufferLength = this.analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);

        this.canvasCtx.clearRect(0, 0, widthCanvas, heightCanvas);

        let drawVisual = requestAnimationFrame(this.draw);
        this.analyser.getByteFrequencyData(dataArray);

        this.canvasCtx.fillStyle = 'rgb(247, 247, 247)';
        this.canvasCtx.fillRect(0, 0, widthCanvas, heightCanvas);
        let barWidth = (widthCanvas / bufferLength) * 1;
        let barHeight;
        let x = 0;
        for(var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]/2;
            this.canvasCtx.fillStyle = 'rgb(255,50,50)';
            this.canvasCtx.fillRect(x,heightCanvas,barWidth,-barHeight*2);
            x += barWidth + 1;
        }
    }

    componentDidMount(){
        this.draw();
    }

    render(){
        let dropdownText = "Choose Sound";
        if(this.props.soundToMap){ dropdownText = this.props.soundToMap}
        return (<React.Fragment>
            <div class="shadow p-3 bg-light rounded">
            <h4>Visualizer</h4>
            <canvas id="canvasVis" width="230" height="334"></canvas>

            </div>
            </React.Fragment>);
    }

}


export default Visualizer
