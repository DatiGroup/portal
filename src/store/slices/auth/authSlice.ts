import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import {
  type AuthStore,
  type AuthUserType,
  type LoginResponse,
  type LoginCredentialPayload,
  TokenType,
  ResetPasswordPayload,
  SendOtpPayload
} from './authTypes';
import { AppDispatch } from 'store/store';
import request from 'apiServices/axiosInstances/request';
import { getDeviceInfo } from 'store/slices/auth/deviceUtils';
import { RootState } from 'store/reducer';
import { tokenStorage } from 'utils/tokenUtils';
import { tokenUtils } from 'utils/tokenStorage';

const RESET_ACTION = { type: 'RESET_APP' };

export const initialAuthState: AuthStore = {
  loading: false,
  error: null,
  user: undefined,
  isAuthenticated: false,
  expireTime: undefined,
  userRoles: []
};

// Initialize from storage (e.g on page reload))
const initializeStateFromStorage = (): AuthStore => {
  const savedAuth = tokenStorage.getAuthData();

  if (savedAuth && tokenUtils.isCurrentTokenValid()) {
    return {
      ...initialAuthState,
      user: savedAuth.user,
      isAuthenticated: true,
      userRoles: savedAuth.userRoles,
      expireTime: savedAuth.expireTime
    };
  }
  // Clear invalid data
  tokenStorage.clearAuthData();
  return initialAuthState;
};

const initialState = initializeStateFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setAuth: (state, { payload }: PayloadAction<{ user: AuthUserType; token: TokenType }>) => {
      state.user = payload.user;
      state.isAuthenticated = true;
      const tokenInfo = tokenUtils.getTokenInfo(payload.token.access_token);
      state.expireTime = tokenInfo.exp;
      state.userRoles = tokenInfo.userRoles;
      tokenStorage.setAuthData({
        token: payload.token,
        user: payload.user,
        userRoles: tokenInfo.userRoles,
        expireTime: state.expireTime
      });
    },
    clearAuth: (state) => {
      tokenStorage.clearAuthData();
      state.user = undefined;
      state.isAuthenticated = false;
      state.userRoles = [];
    }
  }
});

export const { setLoading, setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;

export const handleLogin = (payload: LoginCredentialPayload) => async (dispatch: AppDispatch, getState: any) => {
  try {
    dispatch(setLoading(true));
    const deviceInfo = await getDeviceInfo();
    const apiPayload = { ...payload, deviceInfo };

    const response = await request.post('/v1/api/auth/login', apiPayload);
    const data = response?.data as LoginResponse;

    if (!data?.user || !data?.token) throw new Error('Missing user data or token');

    dispatch(setAuth({ user: data.user, token: data.token }));

    return response;
  } catch (error) {
    dispatch(clearAuth());
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const handleLogout = () => async (dispatch: AppDispatch) => {
  try {
    const refreshTokenValue = tokenStorage.getRefreshToken();

    if (refreshTokenValue) {
      /*   const logoutConfig = {
          timeout: 5000 // 5 second timeout
        }; */

      // await request.post('/v1/api/auth/logout', { refreshToken: refreshTokenValue }, logoutConfig);
      await request.post('/v1/api/auth/logout', { refreshToken: refreshTokenValue });
    }
  } catch {
  } finally {
    dispatch(clearAuth());
    dispatch(RESET_ACTION);
  }
};

export const refreshToken = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const refreshTokenValue = tokenStorage.getRefreshToken();

    if (!refreshTokenValue) {
      dispatch(clearAuth());
      return;
    }

    const response = await request.post('/v1/api/auth/refresh', { refreshToken: refreshTokenValue });

    const data = response?.data as LoginResponse;
    if (!data?.user || !data?.token) {
      throw new Error('Missing user data or token');
    }

    const state = getState();
    const currentUserId = state.auth.user?.userId;

    if (currentUserId !== data.user?.userId) {
      throw new Error('Refresh token wrong user data or token');
    }

    dispatch(setAuth(data));
  } catch {
    dispatch(clearAuth());
  }
};

export const sendResetLink = async (email: string, captchaToken: string) => {
  await request.post('/v1/api/auth/send-link', { email, recaptchaToken: captchaToken });
};

export const sendOtp = async (payload: SendOtpPayload) => {
  await request.post('/v1/api/otp/send', payload);
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  await request.post('/v1/api/auth/reset-password', payload);
};
