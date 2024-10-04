/*import * as React from 'react';
import styles from './Helloworld.module.scss';
import { IHelloworldProps } from './IHelloworldProps';
import { IHelloworldState, TNote } from './IHelloworldState';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import Note from './Note/Note';
import { DatePicker, DefaultButton, Panel, PrimaryButton, TextField } from 'office-ui-fabric-react';



export default class Helloworld extends React.Component<IHelloworldProps, IHelloworldState> {

  private sp: SPFI


  //private CurrentUserName: string;
  // private CurrentUserMail: string;
  // private CurrentUserLoginName: string;

  constructor(props: IHelloworldProps) {
    super(props)

    this.sp = spfi().using(SPFx(this.props.context));


    //  this.CurrentUserName = this.props.context.pageContext.user.displayName;
    //  this.CurrentUserMail = this.props.context.pageContext.user.email;
    //  this.CurrentUserLoginName = this.props.context.pageContext.user.loginName;

    this.state = {
      notes: [],
      isPanelOpen: false,
      //testing
      isEditing: false,

      //testing
      title: "",
      description: "",
      date: null

    };

    this.renderFooterContent = this.renderFooterContent.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.perdeleteNote = this.perdeleteNote.bind(this);
    //testing
    this.updateNote=this.updateNote.bind(this)
    //testing
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
        date: new Date(note.Date)

      });

    });

    this.setState({ notes });

  }

  private async addNote(): Promise<void> {
    console.log("addnote")
    const { title, description, date } = this.state;
    const note: TNote = {
      title,
      description,
      date,
      id: 0
    };

    await this.sp.web.lists.getByTitle("Notes").items.add({
      Title: title,
      Description: description,
      Date: date,
    }).then(res => {
      console.log(res)
      note.id = res.data.Id;
      const notes = [...this.state.notes, note];
      this.setState({ notes, isPanelOpen: false })
    });
  }

  private async deleteNote(id: number): Promise<void> {
    await this.sp.web.lists.getByTitle("Notes").items.getById(id).recycle().then(() => {
      console.log("Note deleted from SharePoint");
      const notes = [...this.state.notes]
      const noteIndex = notes.findIndex(note => note.id === id);
      notes.splice(noteIndex, 1);

      this.setState({ notes });
    });
  }

  private async perdeleteNote(id: number): Promise<void> {
    await this.sp.web.lists.getByTitle("Notes").items.getById(id).delete().then(() => {
      console.log("Note deleted from SharePoint");
      const notes = [...this.state.notes]
      const noteIndex = notes.findIndex(note => note.id === id);
      notes.splice(noteIndex, 1);

      this.setState({ notes });
    });
  }


  //testing

  private async updateNote(id: number): Promise<void> {
    console.log("updateNote");
    const { title, description, date} = this.state;
    const note: TNote = {
      title,
      description,
      date,
      id:0
    };

    await this.sp.web.lists.getByTitle("Notes").items.getById(id).update({
      Title: title,
      Description: description,
      Date: date,
    }).then(res => {
      console.log(res);
      const notes = this.state.notes.map(n => n.id === id ? note : n);
      this.setState({ notes, isPanelOpen: false });
    });
}


  //testing
/*
  private renderFooterContent(): JSX.Element {
    return (<div>
      <PrimaryButton text='Submit' onClick={() => this.addNote()} />
      <DefaultButton text='Cancel' onClick={() => {
        this.setState({ title: "", description: "", date: null, isPanelOpen: false });
      }} />
    </div>
    );
  }
    /*

  //temp remove

  private renderFooterContent(): JSX.Element {
    return (
      <div>
        {this.state.isEditing ? (
          <PrimaryButton text='Update' onClick={() => this.updateNote()} />
        ) : (
          <PrimaryButton text='Submit' onClick={() => this.addNote()} />
        )}
        <DefaultButton text='Cancel' onClick={() => {
          this.setState({ title: "", description: "", date: null, isPanelOpen: false, isEditing: false, currentNoteId: null });
        }} />
      </div>
    );
  }
  //testing

  public render(): React.ReactElement<IHelloworldProps> {

    return (
      <section className={`${styles.helloworld}`}>
        <PrimaryButton text='Add' onClick={() => this.setState({ isPanelOpen: true })} />
        {<div>
          {
            ...this.state.notes.map((note) => <Note key={note.id} note={note} deleteNote={this.deleteNote} perdeleteNote={this.perdeleteNote} updateNote={this.updateNote}/>)
          }
        </div>}



        <Panel
          isOpen={this.state.isPanelOpen}
          onDismiss={() => this.setState({ isPanelOpen: false })}
          isFooterAtBottom={true}
          onRenderFooterContent={this.renderFooterContent}
        >

          <div>
            <TextField label='title'
              placeholder='enter note'
              onChange={(e, title) => this.setState({ title })}
            />
          </div>

          <div>
            <TextField label='description'
              placeholder='enter description'
              onChange={(e, description) => this.setState({ description })}
            />
          </div>

          <div>
            <DatePicker
              label='date'
              onSelectDate={(date) => this.setState({ date })}
            />
          </div>
        </Panel>

      </section>
    );
  }
}

*/

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
      currentNoteId: null
    };

    this.renderFooterContent = this.renderFooterContent.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.perdeleteNote = this.perdeleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
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
        date: new Date(note.Date)
      });
    });

    this.setState({ notes });
  }

  private async addNote(): Promise<void> {
    const { title, description, date } = this.state;
    const note: TNote = {
      title,
      description,
      date,
      id: 0
    };

    await this.sp.web.lists.getByTitle("Notes").items.add({
      Title: title,
      Description: description,
      Date: date,
    }).then(res => {
      note.id = res.data.Id;
      const notes = [...this.state.notes, note];
      this.setState({ notes, isPanelOpen: false, title: "", description: "", date: null });
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
    const { title, description, date, currentNoteId } = this.state;
    if (currentNoteId === null) return;

    await this.sp.web.lists.getByTitle("Notes").items.getById(currentNoteId).update({
      Title: title,
      Description: description,
      Date: date,
    }).then(() => {
      const notes = this.state.notes.map(n => n.id === currentNoteId ? { ...n, title, description, date } : n);
      this.setState({ notes, isPanelOpen: false, isEditing: false, title: "", description: "", date: null, currentNoteId: null });
    });
  }

  private renderFooterContent(): JSX.Element {
    return (
      <div>
        {this.state.isEditing ? (
          <PrimaryButton text='Update' onClick={this.updateNote} />
        ) : (
          <PrimaryButton text='Submit' onClick={this.addNote} />
        )}
        <DefaultButton text='Cancel' onClick={() => this.setState({ title: "", description: "", date: null, isPanelOpen: false, isEditing: false, currentNoteId: null })} />
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
                  currentNoteId: note.id 
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
        </Panel>
      </section>
    );
  }
}

