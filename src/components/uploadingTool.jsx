import React, {Component} from 'react';

import $ from 'jquery';
import AudioUploader from "./audioUploader";
import Octicon, { Dash} from '@primer/octicons-react'

class UploadingTool extends Component {


    constructor() {
        super();

    }

    render() {
        const hStyle = {
            display: "inline"
        };

        return (<React.Fragment>

            <div className="shadow p-3 mt-4 bg-light rounded">
            <h4 style={hStyle}>UploadingTool</h4>
            <button className="btn btn-light  ml-1 mb-2"   onClick={() => this.props.onToolDelete("UploadingTool")}><Octicon icon={Dash}/></button>

            <AudioUploader onAudioLoad={this.props.onUploadSound} setTypeOfAudio={this.props.setTypeOfAudio} ></AudioUploader>

            </div>

            </React.Fragment>);


    }

}


export default UploadingTool
