import { TNote } from "../IHelloworldState";

export interface INoteProps{
    note:TNote;
    deleteNote(id:number):Promise<void>
    perdeleteNote(id:number):Promise<void>
    //testing
    updateNote(id:number):Promise<void>
    //testing
}