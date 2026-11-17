export enum TermsEnumType {
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS'
}

export interface TermsType {
  termId: number;
  type: TermsEnumType;
  version?: string;
  contentHtml: string;
  startDateActive: Date;
  endDateActive?: Date | null;
}
