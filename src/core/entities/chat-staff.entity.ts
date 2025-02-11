import type { IChatOrganization } from "./chat-organization.entity";

export interface IChatStaff {
  identifier: string;
  organization: IChatOrganization;
  pinfl: number;
  phoneNumber: string;
  officialName: string;
  displayName: string;
  departmentName: string;
  positionName: string;
  profileImageLink: `https://${string}/uploads/images/${string}`;
}
