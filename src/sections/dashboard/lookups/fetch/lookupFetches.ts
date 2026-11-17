import { CrudReponseType } from 'store/type/CrudReponseType';

export const handleLookupValueAddFetch = (lookupValueAdd: () => Promise<CrudReponseType>): Promise<CrudReponseType> =>
  new Promise((resolve, reject) => {
    lookupValueAdd()
      .then((res: CrudReponseType) => resolve(res))
      .catch((err: CrudReponseType) => reject(err));
  });
