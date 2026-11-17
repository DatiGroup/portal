import { FndTypeEnum } from 'types/fndTypes';

export interface TranslationType {
  meaning?: string;
  description?: string;
}

export type TlType = {
  languageCode: string;
  translation?: {
    meaning?: string;
    description?: string;
  };
};

export interface LookupResponse {
  lookupType: string;
  purpose?: FndTypeEnum;
  tl?: TlType[];
}

export interface LookupCode {
  lookupValueId?: number;
  lookupCode?: string;
  enabled: boolean;
  tl: TlType[];
  startDateActive: Date | string;
  endDateActive?: Date | string;
  editable?: boolean;
  attribute1?: string;
  attribute2?: string;
  attribute3?: string;
  attribute4?: string;
  attribute5?: string;
  attribute6?: string;
  attribute7?: string;
  attribute8?: string;
  attribute9?: string;
  attribute10?: string;
  attribute11?: string;
  attribute12?: string;
  attribute13?: string;
  attribute14?: string;
  attribute15?: string;
}

export interface LookupValuesResponse {
  tl?: TlType[];
  lookupCodes?: LookupCode[];
}

export interface LookupValueAddPayload {
  lookupType: string;
  lookupValueData: LookupCode;
}

export interface LookupType {
  lookupId?: number;
  lookupType?: string;
  enabled: boolean;
  tl: TlType[];
  editable?: boolean;
  startDateActive: string;
  endDateActive?: string;
  purpose?: FndTypeEnum;
}

export interface LookupAddPayload {
  lookupData: LookupType;
}
