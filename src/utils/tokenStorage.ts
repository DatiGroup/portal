import { jwtDecode } from 'jwt-decode';
import { tokenStorage } from './tokenUtils';

export const tokenUtils = {
  isAuthenticated(): boolean {
    return tokenStorage.hasTokens() && tokenUtils.isCurrentTokenValid();
  },

  getTokenInfo(accessToken: string) {
    try {
      const decoded = jwtDecode(accessToken) as any;
      return {
        exp: decoded.exp || undefined,
        userRoles: decoded?.realm_access?.roles || []
      };
    } catch {
      return {
        exp: undefined,
        userRoles: []
      };
    }
  },

  getTokenExpiration(accessToken: string): number | undefined {
    try {
      const decoded = jwtDecode(accessToken);
      return decoded.exp || undefined;
    } catch {
      return undefined;
    }
  },

  getMsUntilJwtExpires(exp?: number): number {
    try {
      if (!exp) return 0;
      const expMs = exp * 1000;
      const nowMs = Date.now();
      return Math.max(expMs - nowMs, 0);
    } catch {
      return 0;
    }
  },

  isTokenExpired(accessToken: string): boolean {
    const exp = this.getTokenExpiration(accessToken);
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  },

  isCurrentTokenValid(): boolean {
    const accessToken = tokenStorage.getAccessToken();
    if (!accessToken) return false;
    return !this.isTokenExpired(accessToken);
  }
};
