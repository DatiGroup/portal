import { baseApi } from 'apiServices/baseApi';
import { RegisterSchemaType } from 'sections/auth/hooks/useRegister';
import { CrudReponseType } from 'store/type/CrudReponseType';

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ['jwtRegistration'] });

export const jwtRegistrationAPI = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<CrudReponseType, { recaptchaToken: string } & RegisterSchemaType>({
      query: (newUser: { recaptchaToken: string } & RegisterSchemaType) => ({
        url: '/v1/api/register',
        method: 'POST',
        data: newUser
      })
    })
  })
});

export const { useRegisterUserMutation } = jwtRegistrationAPI;
