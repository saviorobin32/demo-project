import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IHelloworldProps {
  context:WebPartContext;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
