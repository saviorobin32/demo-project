
/*import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IHelloworldProps {
  context:WebPartContext;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

*/

import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IHelloworldProps {
  context: WebPartContext;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  //hasTeamsContext: boolean;
  userDisplayName: string;
  backgroundColor: string;
  onColorChange: (color: string) => void;
}