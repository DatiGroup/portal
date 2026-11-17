import { ApprovalActionEnum } from 'store/type/ApprovalActionEnum';
import { ApprovalRequestStatusEnum } from 'store/type/ApprovalRequestStatusEnum';
import { ReferenceUserType } from 'store/type/ReferenceUserType';

export interface PlatformUserType {
  userId: number;
  userName: string;
  email: string;
  startDateActive?: string;
  endDateActive?: string;
  createdDate?: string;
  approvalStatus?: ApprovalRequestStatusEnum;
  profile: {
    userProfileId: number;
    firstName: string;
    lastName: string;
    preferredLang?: string;
  };
}

export interface PlatformUserDetailsType {
  userId: number;
  userName: string;
  email: string;
  startDateActive?: string;
  endDateActive?: string;
  createdDate?: string;
  profile: {
    userProfileId: number;
    firstName: string;
    lastName: string;
    preferredLang?: string;
  };
  approvalRequests: ApprovalRequestsType[];
}

export interface ApprovalRequestsType {
  approvalRequestId: number;
  status: ApprovalRequestStatusEnum;
  assignedToUser?: ReferenceUserType;
  assignedToKcGroup?: string;
  minRequiredApprovals: number;
  currentApprovalsCount: number;
  createdDate: string;
  updatedDate: string;
  approvals: ApprovalType[];
}

export interface UserIAMType {
  enabled: boolean;
  groups: string[];
  wasApproved: boolean;
}

export interface PlatformUserDetailsResponseType {
  user: PlatformUserDetailsType;
  iam: UserIAMType;
  organizations: OrganizationType[];
}

export type OrganizationType = {
  userOrganizationId: number;
  name: string;
  registrationNumber?: string | null;
  country?: string | null;
};
export interface ApprovalPayloadType {
  requestId: number;
  orgId: number;
}

export interface RejectPayloadType {
  requestId: number;
  comment?: string;
}

export interface ApprovalType {
  approvalId: number;
  approvedByUser: ReferenceUserType;
  action: ApprovalActionEnum;
  comments?: string;
  actedAt: string;
}

export type GroupPayloadType = {
  userId: number;
  groups: {
    groupName: string;
    action: string;
  }[];
};

export interface AdminActivityType {
  adminActivityLogId: number;
  action: string;
  details: Record<string, any>;
  createdDate: string;
  createdByUser: ReferenceUserType;
}

export interface UserStatusChangePayloadType {
  status: 'enable' | 'disable';
  userId: number;
}
