import * as React from 'react';

interface IdeaListState {
  ideas: string[];
  currentIdea: string;
}

export default class IdeaList extends React.Component<{}, IdeaListState
    > {
  constructor(props: {}) {
    super(props);

    this.state = {
      ideas: [],
      currentIdea: ''
    };
    
    this.updateIdea = this.updateIdea.bind(this);
    this.addIdea = this.addIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
  }

  updateIdea(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({currentIdea: e.target.value});
  }

  addIdea() {
    this.setState({
      ideas: [...this.state.ideas, this.state.currentIdea],
      currentIdea: '' 
    });
  }

  deleteIdea(index: number) {
    const newIdeas = [...this.state.ideas];
    newIdeas.splice(index, 1);
    
    this.setState({ideas: newIdeas});
  }

  render() {
    const ideaBubbles = this.state.ideas.map((idea, index) => (
      <div key={index} className="bubble">
        <span>{idea}</span>
        <button className="delete-button" type="button" onClick={() => this.deleteIdea(index)}>x</button>
      </div>
    ));
    
    return (
      <div className="container">
        <input 
          className="idea-input"
          type="text" 
          value={this.state.currentIdea} 
          onChange={this.updateIdea}
        />
        <button 
          className="add-button"
          type="button" onClick={this.addIdea} 
          disabled={!this.state.currentIdea}
        >
          +
        </button>
        <div className="bubble-container">{ideaBubbles}</div>
      </div>
    );
  }
}

