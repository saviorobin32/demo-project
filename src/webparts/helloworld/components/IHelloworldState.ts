/*export type TNote = {
    id: number;
    title: string;
    description: string;
    date: Date;
};

export interface IHelloworldState {
    notes: TNote[];
    isPanelOpen: boolean;
    //testing
    isEditing: boolean;
    //testing
    title: string;
    description: string;
    date: Date;
}*/
export type TNote = {
    id: number;
    title: string;
    description: string;
    date: Date;
  };
  
  export interface IHelloworldState {
    notes: TNote[];
    isPanelOpen: boolean;
    isEditing: boolean;
    title: string;
    description: string;
    date: Date | null;
    currentNoteId: number | null;
  }
  