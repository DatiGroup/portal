import { ReferenceUserType } from 'store/type/ReferenceUserType';

export interface InvitationProfileType {
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

export interface InvitationDataType {
  userId: number;
  userName: string;
  email: string;
  startDateActive?: string;
  endDateActive?: string;
  profile: InvitationProfileType;
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

export interface InvitationPayloadType {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
}

export interface ResendPayloadType {
  email: string;
}

export interface AcceptPayloadType {
  otpCode: string;
  invitationCode: string;
}

export interface InviteOtpPayloadType {
  invitationCode: string;
  recaptchaToken: string;
}
