import { CrudReponseType } from 'store/type/CrudReponseType';

export const handleRegisterFetch = (registerUser: () => Promise<CrudReponseType>): Promise<CrudReponseType> =>
  new Promise((resolve, reject) => {
    registerUser()
      .then((res: CrudReponseType) => resolve(res))
      .catch((err: CrudReponseType) => reject(err));
  });
