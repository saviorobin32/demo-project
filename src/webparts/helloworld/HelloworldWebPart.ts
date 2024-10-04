

import * as React from 'react'; // Import React library
import * as ReactDom from 'react-dom'; // Import ReactDOM for rendering
import { Version } from '@microsoft/sp-core-library'; // Import Version from SP core library
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane'; // Import property pane configuration and text field
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base'; // Import base client-side web part
import { IReadonlyTheme } from '@microsoft/sp-component-base'; // Import read-only theme interface

import * as strings from 'HelloworldWebPartStrings'; // Import localized strings
import Helloworld from './components/Helloworld'; // Import Helloworld component
import { IHelloworldProps } from './components/IHelloworldProps'; // Import Helloworld component props interface

import { ColorPicker } from '@fluentui/react'; // Import ColorPicker from Fluent UI

// Define the properties interface for the web part
export interface IHelloworldWebPartProps {
  description: string;
  backgroundColor: string;
}

// Define the main web part class
export default class HelloworldWebPart extends BaseClientSideWebPart<IHelloworldWebPartProps> {

  private _isDarkTheme: boolean = false; // Track if the theme is dark
  private _environmentMessage: string = ''; // Store environment message

  // Render the web part
  public render(): void {
    const element: React.ReactElement<IHelloworldProps> = React.createElement(
      Helloworld,
      {
        context: this.context,
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        userDisplayName: this.context.pageContext.user.displayName,
        backgroundColor: this.properties.backgroundColor,
        onColorChange: this._onColorChange.bind(this) // Bind color change handler
      }
    );

    this.domElement.style.backgroundColor = this.properties.backgroundColor; // Apply background color

    ReactDom.render(element, this.domElement); // Render the React element
  }

  // Initialize the web part
  protected onInit(): Promise<void> {
    this._environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
    return Promise.resolve();
  }

  // Handle theme changes
  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted; // Update dark theme status
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  // Clean up when the web part is disposed
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // Get the data version
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // Configure the property pane
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                {
                  type: 1, // Custom field type
                  targetProperty: 'backgroundColor',
                  properties: {
                    key: 'colorPickerField',
                    label: 'Background Color',
                    onRender: this.renderColorPicker.bind(this) // Render color picker
                  }
                }
              ]
            }
          ]
        }
      ]
    };
  }

  // Render the color picker
  private renderColorPicker(elem: HTMLElement): void {
    const colorPicker = React.createElement(ColorPicker, {
      color: this.properties.backgroundColor,
      onChange: (ev, colorObj) => {
        this.properties.backgroundColor = colorObj.str;
        this.render(); // Re-render on color change
      }
    });

    ReactDom.render(colorPicker, elem);
  }

  // Handle color change
  private _onColorChange(color: string): void {
    this.properties.backgroundColor = color;
    this.render(); // Re-render on color change
  }
}
