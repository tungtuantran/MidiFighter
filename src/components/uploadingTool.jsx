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
            <div class="shadow p-3 mb-5 bg-light rounded">
            <h4 style={hStyle}>UploadingTool</h4>
            <button  class=" btn btn-light  ml-1 mb-2"   onClick={() => this.props.onToolDelete("UploadingTool")}><Octicon icon={Dash}/></button>
            <AudioUploader onAudioLoad={this.props.onUploadSound} ></AudioUploader>
            </div>

            </React.Fragment>);
    }

}


export default UploadingTool
