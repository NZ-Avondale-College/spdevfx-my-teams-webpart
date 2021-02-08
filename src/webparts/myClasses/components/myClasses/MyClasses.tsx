import * as React from 'react';
import { FocusZone } from '@microsoft/office-ui-fabric-react-bundle';
import { List } from '@microsoft/office-ui-fabric-react-bundle';
import styles from '../myClasses/MyClasses.module.scss';
import { IMyClassesProps, IMyClassesState } from '.';
//import { escape } from '@microsoft/sp-lodash-subset';
import { IChannel, IEducationClass } from '../../../../shared/interfaces';

export class MyClasses extends React.Component<IMyClassesProps, IMyClassesState> {

  private _myClasses: IEducationClass[] = [];

  constructor(props: IMyClassesProps) {
    super(props);

    this.state = {
      items: []
    };
  }

  public async componentDidMount() {
    await this._load();
  }

  public async componentDidUpdate(prevProps: IMyClassesProps) {
    if (this.props.openInClientApp !== prevProps.openInClientApp) {
      await this._load();
    }
  }

  private _load = async (): Promise<void> => {

    // get teams
    this._myClasses = await this._getClasses();


    this.setState({
      items: this._myClasses,
    });
  }

  public render(): React.ReactElement<IMyClassesProps> {
    return (
      <FocusZone id="testId">
        <List
          className={styles.myClasses}
          items={this._myClasses}
          renderedWindowsAhead={4}
          onRenderCell={this._onRenderCell}
        />
      </FocusZone>
    );
  }

  private _onRenderCell = (team: IEducationClass, index: number | undefined): JSX.Element => {
    return (
      <div>
        <a href="#" title='Click to open channel' onClick={this._openChannel.bind(this, team.id)}>
          <span>{team.displayName}</span>
        </a>
        <span className={styles.badge}>{team.assignments.length} Assignments</span>
      </div>
    );
  }

  private _openChannel = async (teamId: string): Promise<void> => {
    let link = '#';

    const teamChannels: IChannel[] = await this._getTeamChannels(teamId);
    const channel = teamChannels[0];

    if (this.props.openInClientApp) {
      link = channel.webUrl;
    } else {
      link = `https://teams.microsoft.com/_#/conversations/${channel.displayName}?threadId=${channel.id}&ctx=channel`;
    }

    window.open(link, '_blank');
  }

  private _getTeamChannels = async (teamId): Promise<IChannel[]> => {
    let channels: IChannel[] = [];
    try {
      channels = await this.props.teamsService.GetTeamChannels(teamId);
      console.log('Channels', channels);
    } catch (error) {
      console.log('Error getting channels for team ' + teamId, error);
    }
    return channels;
  }

  private _getClasses = async (): Promise<IEducationClass[]> => {
    let myClasses: IEducationClass[] = [];
    try {
      myClasses = await this.props.teamsService.GetClasses();
      console.log('Classes', myClasses);
    } catch (error) {
      console.log('Error getting classes', error);
    }
    return myClasses;
  }
}
