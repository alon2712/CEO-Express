import React, {Component} from 'react';
import './App.css';
import Ideation from './pages/Ideation';
import Landing from './pages/Landing';
import Explore from './pages/Explore';

// Im sure theres another way to do this but you need a way to specify the type of the response.data so i did it like this
interface AppState {
  page: "landing" | "ideation" | "explore"
}

export default class App extends Component<{}, AppState>{
  constructor(props: {}) {
    super(props);

   this.state ={page:"ideation"}
}
render = (): JSX.Element => {
  switch (this.state.page) {
      case "landing":
          return (<div className='container'><Landing/></div>)
      case "ideation":
          return (<div className='container'><Ideation/></div>)
      case "explore":
          return (<div className='container'><Explore/></div>)
   }
};
}
