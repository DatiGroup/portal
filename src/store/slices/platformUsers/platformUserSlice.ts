import { baseApi } from 'apiServices/baseApi';
import {
  AdminActivityType,
  ApprovalPayloadType,
  GroupPayloadType,
  PlatformUserDetailsResponseType,
  PlatformUserType,
  RejectPayloadType,
  UserStatusChangePayloadType
} from './platformUserTypes';

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ['platformUserList', 'platformUser', 'adminLogList', 'adminEmail'] });

export const platformUserApi = apiWithTag.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    platformUserList: build.query<PlatformUserType[], void>({
      query: () => ({
        url: '/v1/api/admin/user',
        method: 'GET'
      }),
      providesTags: ['platformUserList']
    }),
    platformUser: build.query<PlatformUserDetailsResponseType, number | string>({
      query: (userId) => ({
        url: `/v1/api/admin/user/${userId}`,
        method: 'GET'
      }),
      providesTags: ['platformUser']
    }),
    approveUser: build.mutation<ResponseType, ApprovalPayloadType>({
      query: (payload) => ({
        url: '/v1/api/admin/user/approve',
        method: 'POST',
        data: payload
      }),
      invalidatesTags: ['platformUserList', 'platformUser', 'adminLogList']
    }),
    rejectUser: build.mutation<ResponseType, RejectPayloadType>({
      query: (payload) => ({
        url: '/v1/api/admin/user/reject',
        method: 'POST',
        data: payload
      }),
      invalidatesTags: ['platformUserList', 'platformUser']
    }),
    updateUserRoles: build.mutation<ResponseType, GroupPayloadType>({
      query: (payload) => ({
        url: '/v1/api/admin/user/roles',
        method: 'PATCH',
        data: payload
      }),
      invalidatesTags: ['platformUser', 'adminLogList']
    }),

    adminLogList: build.query<AdminActivityType[], number | string>({
      query: (userId) => ({
        url: `/v1/api/admin/activity/user/${userId}`,
        method: 'GET'
      }),
      providesTags: ['adminLogList']
    }),
    statusChange: build.mutation<ResponseType, UserStatusChangePayloadType>({
      query: (payload) => ({
        url: '/v1/api/admin/user/status',
        method: 'POST',
        data: payload
      }),
      invalidatesTags: ['platformUser', 'adminLogList']
    }),
    updateAdminEmail: build.mutation<ResponseType, { email: string }>({
      query: (payload) => ({
        url: '/v1/api/admin/info/email',
        method: 'POST',
        data: payload
      }),
      invalidatesTags: ['adminEmail']
    }),
    getAdminEmail: build.query<{ email: string }, void>({
      query: () => ({
        url: '/v1/api/admin/info/email',
        method: 'GET'
      }),
      providesTags: ['adminEmail']
    })
  })
});

export const {
  useAdminLogListQuery,
  usePlatformUserListQuery,
  usePlatformUserQuery,
  useRejectUserMutation,
  useApproveUserMutation,
  useUpdateUserRolesMutation,
  useStatusChangeMutation,
  useGetAdminEmailQuery,
  useUpdateAdminEmailMutation
} = platformUserApi;
