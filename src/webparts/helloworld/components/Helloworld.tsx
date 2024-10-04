

import * as React from 'react';
import styles from './Helloworld.module.scss';
import { IHelloworldProps } from './IHelloworldProps';
import { IHelloworldState, TNote } from './IHelloworldState';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import Note from './Note/Note';
import { DatePicker, DefaultButton, Panel, PrimaryButton, TextField } from 'office-ui-fabric-react';
import StatesComponent from './StatesComponent';

export default class Helloworld extends React.Component<IHelloworldProps, IHelloworldState> {

  private sp: SPFI;

  constructor(props: IHelloworldProps) {
    super(props);

    this.sp = spfi().using(SPFx(this.props.context));

    this.state = {
      notes: [],
      isPanelOpen: false,
      isEditing: false,
      title: "",
      description: "",
      date: null,
      currentNoteId: null,
      selectedState: null, // Initialize selectedState
      
    };

    this.renderFooterContent = this.renderFooterContent.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.perdeleteNote = this.perdeleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    await this.getNotes();
  }

  private async getNotes(): Promise<void> {
    const notes: TNote[] = (await this.sp.web.lists.getByTitle("Notes").items()).map((note) => {
      return ({
        id: note.Id,
        title: note.Title,
        description: note.Description,
        date: new Date(note.Date),
        state: note.State // Ensure this line is included
      });
    });

    this.setState({ notes });
  }

  private async addNote(): Promise<void> {
    const { title, description, date, selectedState } = this.state;
    const note: TNote = {
      title,
      description,
      date,
      id: 0,
      state: selectedState // Add this line
    };

    await this.sp.web.lists.getByTitle("Notes").items.add({
      Title: title,
      Description: description,
      Date: date,
      State: selectedState // Add this line
    }).then(res => {
      note.id = res.data.Id;
      const notes = [...this.state.notes, note];
      this.setState({ notes, isPanelOpen: false, title: "", description: "", date: null, selectedState: null });
    });
  }

  private async deleteNote(id: number): Promise<void> {
    await this.sp.web.lists.getByTitle("Notes").items.getById(id).recycle().then(() => {
      const notes = this.state.notes.filter(note => note.id !== id);
      this.setState({ notes });
    });
  }

  private async perdeleteNote(id: number): Promise<void> {
    await this.sp.web.lists.getByTitle("Notes").items.getById(id).delete().then(() => {
      const notes = this.state.notes.filter(note => note.id !== id);
      this.setState({ notes });
    });
  }

  private async updateNote(): Promise<void> {
    const { title, description, date, currentNoteId, selectedState } = this.state;
    if (currentNoteId === null) return;

    await this.sp.web.lists.getByTitle("Notes").items.getById(currentNoteId).update({
      Title: title,
      Description: description,
      Date: date,
      State: selectedState // Add this line
    }).then(() => {
      const notes = this.state.notes.map(n => n.id === currentNoteId ? { ...n, title, description, date, state: selectedState } : n);
      this.setState({ notes, isPanelOpen: false, isEditing: false, title: "", description: "", date: null, currentNoteId: null, selectedState: null });
    });
  }

  private handleStateChange(selectedState: string): void {
    this.setState({ selectedState });
  }

  private renderFooterContent(): JSX.Element {
    return (
      <div>
        {this.state.isEditing ? (
          <PrimaryButton text='Update' onClick={this.updateNote} />
        ) : (
          <PrimaryButton text='Submit' onClick={this.addNote} />
        )}
        <DefaultButton text='Cancel' onClick={() => this.setState({ title: "", description: "", date: null, isPanelOpen: false, isEditing: false, currentNoteId: null, selectedState: null })} />
      </div>
    );
  }

  public render(): React.ReactElement<IHelloworldProps> {
    return (
      <section className={`${styles.helloworld}`}>
        <PrimaryButton text='Add' onClick={() => this.setState({ isPanelOpen: true })} />
        <div>
          {this.state.notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              deleteNote={this.deleteNote}
              perdeleteNote={this.perdeleteNote}
              updateNote={async () => {
                this.setState({
                  isPanelOpen: true,
                  isEditing: true,
                  title: note.title,
                  description: note.description,
                  date: note.date,
                  currentNoteId: note.id,
                  selectedState: note.state // Add selectedState
                });
              }}
            />
          ))}
        </div>

        <Panel
          isOpen={this.state.isPanelOpen}
          onDismiss={() => this.setState({ isPanelOpen: false })}
          isFooterAtBottom={true}
          onRenderFooterContent={this.renderFooterContent}
        >
          <div>
            <TextField
              label='Title'
              placeholder='Enter note title'
              value={this.state.title}
              onChange={(e, title) => this.setState({ title })}
            />
          </div>
          <div>
            <TextField
              label='Description'
              placeholder='Enter note description'
              value={this.state.description}
              onChange={(e, description) => this.setState({ description })}
            />
          </div>
          <div>
            <DatePicker
              label='Date'
              value={this.state.date}
              onSelectDate={(date) => this.setState({ date })}
            />
          </div>
          <div>
            <StatesComponent onStateChange={this.handleStateChange} context={this.props.context} />
          </div>
        </Panel>
      </section>
    );
  }
}



