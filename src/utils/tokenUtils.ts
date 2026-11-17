import type { TokenType, AuthUserType } from '../store/slices/auth/authTypes';

const STORAGE_KEYS = {
  AUTH_DATA: 'auth_storage_key'
};

export interface SavedAuthDataType {
  token: TokenType;
  user: AuthUserType;
  userRoles: string[];
  expireTime?: number;
}

export const tokenStorage = {
  setAuthData(data: SavedAuthDataType) {
    sessionStorage.setItem(STORAGE_KEYS.AUTH_DATA, JSON.stringify(data));
  },

  getAuthData(): SavedAuthDataType | undefined {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEYS.AUTH_DATA);
      if (!stored) return undefined;

      const parsed = JSON.parse(stored);
      return parsed?.token && parsed?.user && parsed?.userRoles ? parsed : undefined;
    } catch {
      return undefined;
    }
  },

  clearAuthData(): void {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_DATA);
  },

  getRefreshToken(): string | null {
    const authData = this.getAuthData();
    return authData?.token?.refresh_token || null;
  },

  getAccessToken(): string | null {
    const authData = this.getAuthData();
    return authData?.token?.access_token || null;
  },

  hasTokens(): boolean {
    const authData = this.getAuthData();
    return !!(authData?.token?.access_token && authData?.token?.refresh_token);
  }
};
