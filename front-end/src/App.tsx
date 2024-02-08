import React, {Component} from 'react';
import './App.css';
import Ideation from './pages/Ideation';
import Landing from './pages/Landing';
import Explore from './pages/Explore';

interface AppState {
  page: "landing" | "ideation" | "explore"
  subpage: string
}

export default class App extends Component<{}, AppState>{
  constructor(props: {}) {
    super(props);

   this.state ={page:"ideation", subpage:""}
}
render = (): JSX.Element => {
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
