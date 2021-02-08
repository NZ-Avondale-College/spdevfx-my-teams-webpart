import { ITeam, IChannel, IEducationClass } from "../interfaces";

export interface ITeamsService {
  GetTeams(): Promise<ITeam[]>;
  GetTeamChannels(teamId): Promise<IChannel[]>;
  GetClasses(): Promise<IEducationClass[]>;
}
