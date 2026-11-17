import { ReferenceUserType } from 'store/type/ReferenceUserType';

export interface UserProfileType {
  userProfileId: number;
  firstName: string;
  lastName: string;
  preferredLang?: string;
}

export interface InvitationItemType {
  invitationId: number;
  used: boolean;
  email: string;
  usedDate?: string | null;
  expiredDate?: string | null;
  createdByUser: ReferenceUserType;
  invitationDate: string;
}

export interface OrgUserDataType {
  userId: number;
  userName: string;
  email: string;
  startDateActive?: string;
  endDateActive?: string;
  profile: UserProfileType;
  invitationList: InvitationItemType[];
  lastInvitation?: InvitationItemType | null;
  lastRelationship: {
    userRelationshipsId: number;
    startDateActive: string;
    endDateActive: string;
  };
  ownedOrganization?: {
    userOrganizationId: number;
    rootUserId: number;
    name: string;
  };
}

export interface ActiveOrgType {
  userOrganizationId: number;
  name: string;
  registrationNumber: string;
  country: string;
  contactName: string | null;
  contactLastName: string | null;
  contactEmail: string | null;
}
