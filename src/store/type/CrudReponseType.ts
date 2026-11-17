export enum RequestStatusEnum {
  SUCCESS = 'success',
  ERROR = 'error',
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted'
}

export interface CrudReponseType {
  message: RequestStatusEnum;
  id?: number;
}

export interface CrudChangedResponseType {
  message: RequestStatusEnum;
  changed: number;
}
