


  export type TNote = {
    id: number;
    title: string;
    description: string;
    date: Date;
    state:string|null;
    
  };
  
  export interface IHelloworldState {
    notes: TNote[];
    isPanelOpen: boolean;
    isEditing: boolean;
    title: string;
    description: string;
    date: Date | null;
    currentNoteId: number | null;
    selectedState: string | null; 
    
    
  }


  