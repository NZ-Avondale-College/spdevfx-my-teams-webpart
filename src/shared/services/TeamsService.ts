import { MSGraphClient } from "@microsoft/sp-http";
import { ITeam, IChannel, IEducationClass } from "../interfaces";
import { ITeamsService } from "./ITeamsService";

export class TeamsService implements ITeamsService {

  private _graphClient: MSGraphClient;


  /**
 * class constructor
 * @param _graphClient the graph client to be used on the request
 */
  constructor(graphClient: MSGraphClient) {
    // set web part context
    this._graphClient = graphClient;
  }

  public GetTeams = async (): Promise<ITeam[]> => {
    return await this._getTeams();
  }

  private _getTeams = async (): Promise<ITeam[]> => {
    let myTeams: ITeam[] = [];
    try {
      const teamsResponse = await this._graphClient.api('me/joinedTeams').version('v1.0').get();
      myTeams = teamsResponse.value as ITeam[];
    } catch (error) {
      console.log('Error getting teams', error);
    }
    return myTeams;
  }

  public GetTeamChannels = async (teamId): Promise<IChannel[]> => {
    return await this._getTeamChannels(teamId);
  }

  private _getTeamChannels = async (teamId): Promise<IChannel[]> => {
    let channels: IChannel[] = [];
    try {
      const channelsResponse = await this._graphClient.api(`teams/${teamId}/channels`).version('v1.0').get();
      channels = channelsResponse.value as IChannel[];
    } catch (error) {
      console.log('Error getting channels for team ' + teamId, error);
    }
    return channels;
  }

  public GetClasses = async (): Promise<IEducationClass[]> => {
    return await this._getClasses();
  }

  private _getClasses = async (): Promise<IEducationClass[]> => {
    let classes: IEducationClass[] = [];
    try {
      const classesResponse = await this._graphClient.api('education/me/classes').version('v1.0').get();
      classes = classesResponse.value as IEducationClass[];
    } catch (error) {
      console.log('Error getting classes', error);
    }
    return classes;
  }
}
