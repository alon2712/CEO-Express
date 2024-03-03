import React, {Component} from 'react';
import ExploreView from '../components/ExploreView';


export default class Explore extends Component<{}, {}>{
  constructor(props: {}) {
    super(props);

   this.state ={}
}
render = (): JSX.Element => {
  return (<div><ExploreView/></div>)
};
}
