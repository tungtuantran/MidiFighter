
import $ from 'jquery';
import  'bootstrap/dist/js/bootstrap.bundle';
import React from 'react'
import ReactDom from 'react-dom'
import  'bootstrap/dist/css/bootstrap.css';
import Application from './components/application';

const element = <h1> Hello World </h1>;

//ReactDom.render(<Counter />, document.getElementById('root'));
ReactDom.render(<Application />, document.getElementById('root'));
