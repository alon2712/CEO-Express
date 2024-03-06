import React, {Component} from 'react';
import './App.css';
import Ideation from './pages/Ideation';
//import { useState } from 'react';



export default class App extends Component<{}, {}>{

render = (): JSX.Element => {
        return (<Ideation/>)
  };
}

