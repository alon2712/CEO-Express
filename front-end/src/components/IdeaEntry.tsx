import * as React from 'react';

interface IdeaEntryState {
}
interface IdeaEntryProps {
    ideaName: string;
    ideaDescription: string;
    ideaId: string;
    index: number;
    deleteIdea: (index: number) => void;
}

export default class IdeaEntry extends React.Component<IdeaEntryProps, IdeaEntryState
> {
    render() {
        return (
            <div key={this.props.index} className="entry">
                <p>{this.props.ideaName}</p>
                <div className="seperator"></div>
                <button className="delete-button" type="button" onClick={() => this.props.deleteIdea(this.props.index)}>x</button>
            </div>
        );
    }
}

