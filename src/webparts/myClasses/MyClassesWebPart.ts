import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'MyClassesWebPartStrings';
import { MyClasses, IMyClassesProps } from './components/myClasses';
import { MSGraphClient } from '@microsoft/sp-http';
import { TeamsService, ITeamsService } from '../../shared/services';

export interface IMyClassesWebPartProps {
  openInClientApp: boolean;
}

export default class MyClassesWebPart extends BaseClientSideWebPart<IMyClassesWebPartProps> {

  private _graphClient: MSGraphClient;
  private _teamsService: ITeamsService;

  public async onInit(): Promise<void> {

    if (DEBUG && Environment.type === EnvironmentType.Local) {
      console.log("Mock data service not implemented yet");
    } else {
      this._graphClient = await this.context.msGraphClientFactory.getClient();
      this._teamsService = new TeamsService(this._graphClient);
    }

    return super.onInit();
  }

  public async render(): Promise<void> {
    const element: React.ReactElement<IMyClassesProps> = React.createElement(
      MyClasses,
      {
        teamsService: this._teamsService,
        openInClientApp: this.properties.openInClientApp
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

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
                PropertyPaneToggle('openInClientApp', {
                  label: strings.OpenInClientAppFieldLabel,
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
