import React, {Component} from 'react';
import './App.css';
import Ideation from './pages/Ideation';
import Landing from './pages/Landing';
import Explore from './pages/Explore';
import axios from 'axios';
//import { useState } from 'react';

interface AppState {
  page: "landing" | "ideation" | "explore"
  subpage: string
  messageFromFlask: string
  historyMap: HistoryType[]
  ideaEntries: IdeaEntryType[];
}


export default class App extends Component<{}, AppState>{
  constructor(props: {}) {
    super(props);

   this.state ={page:"ideation", subpage:"", messageFromFlask: null,historyMap: null,ideaEntries: null}
}

//componentDidMount() {
//  this.getHistory();
 // this.getAllIdeas();
//}

// add entry
// addEntry = () => {
//   axios.get('/addIdeaEntry?IdeaName=testingAPI&Description=description%20of%20idea&HistoryID=b49d01e1-9d78-41bc-9a49-d037c4747a25')
//     .then(response => {
//       if(response.data.message == 'success'){
//         console.log('Successful');
//       }
//       else{
//         console.log('Unsuccessful');
//       }
      
//     })
//     .catch(error => {
//       console.error('Error adding entry:', error);
//     });
// };


// getHistory = () => {
//   axios.get('/getAllHistory')
//     .then(response => {
//       const historyMap: HistoryType[] = response.data;
//         this.setState({ historyMap });
      
//     })
//     .catch(error => {
//       console.error('Error getting history:', error);
//     });
// };

// getAllIdeas = () => {
//   axios.get('/getAllIdeaEntriesForHistory?HistoryID=b49d01e1-9d78-41bc-9a49-d037c4747a25')
//   .then(response => {
//     const ideaEntries: IdeasEntry[] = response.data;
//       this.setState({ ideaEntries });
//   })
//   .catch(error => {
//     console.error('Error getting all ideas:', error);
//   });

// }




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
