export interface ReferenceUserType {
  userId: number;
  userName: string;
  email?: string;
  profile: {
    userProfileId: number;
    firstName: string;
    lastName: string;
  };
}
