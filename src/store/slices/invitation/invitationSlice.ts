import { baseApi } from 'apiServices/baseApi';
import { AcceptPayloadType, InvitationDataType, InvitationPayloadType, InviteOtpPayloadType, ResendPayloadType } from './invitationTypes';
import { CrudReponseType } from 'store/type/CrudReponseType';

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ['invitationList', 'userList', 'platformUserList'] });

export const invitationApi = apiWithTag.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    invitationList: build.query<InvitationDataType[], void>({
      query: () => ({
        url: '/v1/api/invite',
        method: 'GET'
      }),
      providesTags: ['invitationList']
    }),
    inviteUser: build.mutation<CrudReponseType, InvitationPayloadType>({
      query: (payload) => ({
        url: '/v1/api/invite',
        method: 'POST',
        data: payload
      }),
      invalidatesTags: ['invitationList', 'userList', 'platformUserList']
    }),
    resendInvite: build.mutation<CrudReponseType, { id: number; payload: ResendPayloadType }>({
      query: (args) => ({
        url: `/v1/api/invite/resend/${args.id}`,
        method: 'POST',
        data: args.payload
      }),
      invalidatesTags: ['invitationList', 'userList', 'platformUserList']
    }),
    revokeInvite: build.mutation<CrudReponseType, number>({
      query: (inviteId) => ({
        url: `/v1/api/invite/revoke/${inviteId}`,
        method: 'POST'
      }),
      invalidatesTags: ['invitationList', 'userList', 'platformUserList']
    }),
    acceptInvite: build.mutation<CrudReponseType, AcceptPayloadType>({
      query: (payload) => ({
        url: `/v1/api/invite/accept`,
        method: 'POST',
        data: payload
      })
    }),
    sentInviteOtp: build.mutation<CrudReponseType, InviteOtpPayloadType>({
      query: (payload) => ({
        url: '/v1/api/otp/send-invite-otp',
        method: 'POST',
        data: payload
      })
    })
  })
});

export const {
  useInvitationListQuery,
  useResendInviteMutation,
  useInviteUserMutation,
  useRevokeInviteMutation,
  useAcceptInviteMutation,
  useSentInviteOtpMutation
} = invitationApi;
