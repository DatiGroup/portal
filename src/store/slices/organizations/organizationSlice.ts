import { baseApi } from 'apiServices/baseApi';
import { ActiveOrgType, OrgUserDataType } from './organizationTypes';
import { CrudReponseType } from 'store/type/CrudReponseType';

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ['userList', 'activeOrg', 'invitationList', 'orderResources', 'orderPublicKeys', 'orderSecurityGroups']
});

export const organizationApi = apiWithTag.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    organizationUserList: build.query<OrgUserDataType[], void>({
      query: () => ({
        url: '/v1/api/organization/users',
        method: 'GET'
      }),
      providesTags: ['userList']
    }),
    switchOrg: build.mutation<CrudReponseType, { orgId: number }>({
      query: (payload) => ({
        url: '/v1/api/organization/switch-org',
        method: 'POST',
        data: payload
      }),
      invalidatesTags: ['activeOrg', 'userList', 'invitationList', 'orderResources', 'orderPublicKeys', 'orderSecurityGroups']
    }),
    getActiveOrg: build.query<ActiveOrgType, void>({
      query: () => ({
        url: '/v1/api/organization/active',
        method: 'GET'
      }),
      providesTags: ['userList']
    })
  })
});

export const { useOrganizationUserListQuery, useGetActiveOrgQuery, useSwitchOrgMutation } = organizationApi;
