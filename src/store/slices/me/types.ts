export interface Language {
  [key: string]: string;
}

export interface MeDataType {
  activeOrgId: number | null;
  userName: string;
  approvalStatus: string;
  profile: UserProfile;
  userId: number;
  email: string;
  memberOfOrganizations: MemberOfOrganization[];
  uuid: string | null;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  preferredLang: string;
}

export interface MemberOfOrganization {
  userOrganizationId: number;
  name: string;
  startDateActive: string;
  registrationNumber: string;
  country: string;
  contactName: string | null;
  contactLastName: string | null;
  contactEmail: string | null;
  endDateActive: string | null;
}
