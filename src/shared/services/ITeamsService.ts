import { ITeam, IChannel, IEducationClass, IEducationAssignment } from "../interfaces";

export interface ITeamsService {
  GetTeams(): Promise<ITeam[]>;
  GetTeamChannels(teamId): Promise<IChannel[]>;
  GetClasses(): Promise<IEducationClass[]>;
  GetAssignments(teamId): Promise<IEducationAssignment[]>;
}
