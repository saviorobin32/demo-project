

import * as React from 'react';
import { INoteProps } from './INoteProps';
import { INoteState } from './INoteState';
import { DefaultButton } from 'office-ui-fabric-react';

export default class Note extends React.Component<INoteProps, INoteState> {

  constructor(props: INoteProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{this.props.note.title}</p>
        <p>{this.props.note.description}</p>
        <p>{this.props.note.date.toDateString()}</p>
        <p>{this.props.note.state}</p> {/* Add this line */}
        <DefaultButton text='Delete' onClick={() => { this.props.deleteNote(this.props.note.id); console.log(this.props.note) }} />
        <DefaultButton text='Permanent Delete' onClick={() => { this.props.perdeleteNote(this.props.note.id); console.log(this.props.note) }} />
        <DefaultButton text='Update' onClick={() => { this.props.updateNote(this.props.note.id); console.log(this.props.note) }} />
      </div>
    );
  }
}


