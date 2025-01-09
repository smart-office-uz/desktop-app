import type { IChatOrganization } from "./chat-organization.entity";

export interface IChatStaff {
  identifier: string;
  organization: IChatOrganization;
  pinfl: string;
  phoneNumber: string;
  officialName: string;
  displayName: string;
  departmentName: string;
  positionName: string;
  profileImageLink: `https://${string}/uploads/images/${string}`;
}
