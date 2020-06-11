import React, {Component} from 'react';
import $ from 'jquery';
import AudioUploader from "./audioUploader";
import Octicon, { Dash} from '@primer/octicons-react'

class RecordingTool extends Component {


    constructor() {
        super();
    }



    render() {
        const hStyle = {
            display: "inline"
        };
        return (<React.Fragment>
            <div class="shadow p-3 mt-2 mb-5 bg-light rounded">
            <h4 style={hStyle}>RecordingTool</h4>
            <button  class=" btn btn-light  ml-1 mb-2"   onClick={() => this.props.onToolDelete("RecordingTool")}><Octicon icon={Dash}/></button>
            </div>

            </React.Fragment>);
    }

}


export default RecordingTool
