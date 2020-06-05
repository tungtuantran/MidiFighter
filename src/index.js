
import $ from 'jquery';
import  'bootstrap/dist/js/bootstrap.bundle';
import React from 'react'
import ReactDom from 'react-dom'
import  'bootstrap/dist/css/bootstrap.css';
import Application from './components/application';


import { useSpring, animated } from 'react-spring'
import { Spring } from "react-spring/renderprops";
//import range from 'lodash-es/range'

ReactDom.render(<Application />, document.getElementById('root'));



//class App extends React.Component {
//state = { turn: false };
//toggle = () => this.setState(state => ({ turn: !state.turn }));

//render() {
//return (
//<div className="App">
//<Spring
//from={{ rotation: "0deg" }}
//to={{ rotation: this.state.turn ? "0" : "90%" }}
//>
//{({ rotation }) => (
//<div
//className="box"
//style={{ transform: `rotate(${rotation})` }}
//onClick={this.toggle}
//>
//{this.state.deg}
//</div>
//)}
//</Spring>
//</div>
//);
//}
//}

//export default function App() {
//const {rotateZ} = useSpring({
//from: {
//rotateZ: 170
//},
//to: {
//rotateZ: 190
//},
//config: {
//mass: 1,
//tension: 20,
//friction: 0
//}
//});

//return (
//<animated.div className="box" style={{
//transform: rotateZ.interpolate(z => `rotateZ(${z}deg)`)
//}} />
//);
//}



//ReactDom.render(<App />, document.getElementById('root'));

