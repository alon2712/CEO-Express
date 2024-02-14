import React, {Component} from 'react';
import IdeaView from '../components/IdeaView';



export default class Ideation extends Component<{}, {}>{
  constructor(props: {}) {
    super(props);

   this.state ={}
}
render = (): JSX.Element => {
  return (<div ><IdeaView/></div>)
};
}
