
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
        let heightCanvas = 150;
        let bufferLength = this.analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);

        this.canvasCtx.clearRect(0, 0, widthCanvas, heightCanvas);

        this.analyser.getByteFrequencyData(dataArray);

        this.canvasCtx.fillStyle = 'rgb(247, 247, 247)';
        this.canvasCtx.fillRect(0, 0, widthCanvas, heightCanvas);
        let barWidth = (widthCanvas / bufferLength) * 1;
        let barHeight;
        let x = 0;

        let dataArrayLine = new Uint8Array(bufferLength);
        this.analyser.getByteTimeDomainData(dataArrayLine);

        this.canvasCtx.lineWidth = 2;
        this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        this.canvasCtx.beginPath();

        var stepLine = widthCanvas * 1.0 / bufferLength;

        for(var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]/6;
            let colorR = barHeight*20;
            this.canvasCtx.fillStyle = 'rgb(255,'+(255-colorR)+','+(255-colorR)+')';
            this.canvasCtx.fillRect(x,heightCanvas,barWidth,-barHeight*2);

            var p = dataArrayLine[i] / 128.0;
            var posY = p * heightCanvas/4+50;

            if(i === 0) {
                this.canvasCtx.moveTo(x, posY);
            } else {
                this.canvasCtx.lineTo(x, posY);
            }

            x += barWidth + 1;
        }

        this.canvasCtx.lineTo(canvas.width, canvas.height/4+50);
        this.canvasCtx.stroke();
        requestAnimationFrame(this.draw);
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
            <canvas id="canvasVis" width="230" height="150"></canvas>

            </div>
            </React.Fragment>);
    }

}


export default Visualizer
