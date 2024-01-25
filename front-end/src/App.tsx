import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './App.css';

// Im sure theres another way to do this but you need a way to specify the type of the response.data so i did it like this
interface MessageInterface {
  message: string;
}

function App() {
  const [messageFromFlask, setMessage] = useState<MessageInterface | null>(null);

  // Example on getting something from the flask api. The flask api is in path CEO-Express-Backend/base.py
  function getData() {
    axios({
      method: 'GET',
      url: '/test',
    })
      .then((response) => {
        console.log(response);
        const res: { message: string } = response.data; // Specify the type of response.data
        
        setMessage({
          message: res.message,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });


  }
  // End of example
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* This is just to test out the flask connection*/}
        <p>
          To test connection with Flask (if you don't get the message after clicking, then the connection doesn't work):
        </p>
        <button onClick={getData}>Click me</button>
        {messageFromFlask && (
          <div>
            <p>Message: {messageFromFlask.message}</p>
          </div>
        )}
        {/* End of flask connection test (if you did not see the message starting with message: then something went wrong)*/}
      </header>
    </div>
  );
}

export default App;
