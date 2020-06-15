import React, {Component} from 'react';
import styled from 'styled-components';

import $ from 'jquery';
import AudioUploader from "./audioUploader";
import Octicon, { Dash} from '@primer/octicons-react'

const Container = styled.label`
    position: relative;
    display: inline-block;
    width: 30px;
    height: 16px;
    margin-right: 0.5em;
    margin-left: 0.5em;
    margin-bottom: -0.2em;

    > input {
        display: none;
    }
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #008000;
    transition: 0.4s;
    border-radius: 15px;

    &:before {
        position: absolute;
        content: '';
        height: 15px;
        width: 15px;
        background-color: #999;
        transition: 0.2s;
        border-radius: 50%;
    }
`;

const SliderInput = styled.input`
    &:checked + ${Slider} {
        background-color: #0365b2;
        &:before {
            transform: translateX(15px);
            background-color: white;
        }
    }
`;

class UploadingTool extends Component {


    constructor() {
        super();

        this.state = {

        }
    }



    render() {

        const hStyle = {
            display: "inline"
        };
        return (<React.Fragment>
            
            <div class="shadow p-3 mb-5 bg-light rounded">
            <h4 style={hStyle}>UploadingTool</h4>
            <button  class="btn btn-light  ml-1 mb-2"   onClick={() => this.props.onToolDelete("UploadingTool")}><Octicon icon={Dash}/></button>          


            <div class="toggle switch">
                <label>Map</label>
                <Container>
                    <SliderInput type="checkbox" checked={this.state.checked} onChange= {(e) => this.setState({checked : e.target.checked})}/> 
                    <Slider />
                </Container>
                <label>Background</label>

            </div>

            <AudioUploader key="keyUploadingTool" onAudioLoad={this.props.onUploadSound} ></AudioUploader>

            </div>

            </React.Fragment>);


    }

}


export default UploadingTool
