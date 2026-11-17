export interface AuthStore {
  loading: boolean;
  error: string | null;
  user?: AuthUserType;
  expireTime?: number;
  userRoles: string[]; // Store roles/permissions separately
  isAuthenticated: boolean; // Track auth state without exposing tokens
}

export interface AuthUserType {
  userId: number;
  email: string;
  userName?: string; // Added for UI compatibility
}

export interface LoginCredentialPayload {
  userName: string;
  password: string;
}

export interface TokenType {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  refresh_expires_in: number;
  scope: string;
}

export interface LoginResponse {
  user: AuthUserType;
  token: TokenType;
}

export interface DeviceInfo {
  browser: string;
  platform: string;
  hash: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
  otpCode: string;
  token: string;
}

export interface SendOtpPayload {
  token: string;
  recaptchaToken: string;
}
