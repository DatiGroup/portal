import { baseApi } from 'apiServices/baseApi';
import { TermsType } from './termsType';

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ['terms'] });

export const termsAPI = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getTerms: build.query<TermsType[], void>({
      query: () => ({
        url: '/v1/api/terms',
        method: 'GET'
      }),
      providesTags: ['terms']
    })
  })
});

export const { useGetTermsQuery } = termsAPI;
