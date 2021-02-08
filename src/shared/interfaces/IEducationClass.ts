import { IEducationAssignment } from ".";

export interface IEducationClass {
    id: string;
    displayName: string;
    description: string;
    mailNickname: string;
    classCode: string;
    externalId: string;
    externalName: string;
    assignments?: IEducationAssignment[];
  }
  