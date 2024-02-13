import React, {Component} from 'react';
import './App.css';
import Ideation from './pages/Ideation';
import Landing from './pages/Landing';
import Explore from './pages/Explore';
import axios from 'axios';
import { useState } from 'react';

interface AppState {
  page: "landing" | "ideation" | "explore"
  subpage: string
  messageFromFlask: string
}


export default class App extends Component<{}, AppState>{
  constructor(props: {}) {
    super(props);

   this.state ={page:"ideation", subpage:"", messageFromFlask: null,}
}
getData = () => {
  axios.get('/test')
    .then(response => {
      const res: { message: string } = response.data;
      this.setState({messageFromFlask: res.message });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};


render = (): JSX.Element => {
  // return (
  //   <div>
  //     <button onClick={this.getData}>Click me</button>
  //     {this.state.messageFromFlask && (
  //       <div>
  //         <p>Message: {this.state.messageFromFlask}</p>
  //       </div>
  //     )}
  //   </div>
  // );
  switch (this.state.page) {
      case "landing":
          return (<Landing/>)
      case "ideation":
          return (<Ideation/>)
      case "explore":
          return (<Explore/>)
   }
  };
}
