import { GoogleTranslateDTO, GoogleTranslateParams } from 'types/googleApi';
import axiosInstance from './axiosInstances/request';

export const googleTranslate = ({ q, source, target, format = 'text' }: GoogleTranslateParams): Promise<GoogleTranslateDTO> =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosInstance.post('/v1/api/translations/google-translate', {
        q,
        source,
        target,
        format
      });
      resolve({ source, target, translations: response.data.data.translations });
    } catch (error) {
      reject(error);
    }
  });
