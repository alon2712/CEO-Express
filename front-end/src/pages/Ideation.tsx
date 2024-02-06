import React, {Component} from 'react';
import IdeaList from '../components/IdeaList';



export default class Ideation extends Component<{}, {}>{
  constructor(props: {}) {
    super(props);

   this.state ={}
}
render = (): JSX.Element => {
  return (<div><IdeaList/></div>)
};
}
