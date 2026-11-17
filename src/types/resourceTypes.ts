export enum ResourceRequestStatusEnum {
  NEW = 'NEW',
  SUCCESS = 'SUCCESS',
  RETRY = 'RETRY',
  PENDING = 'PENDING',
  DUPLICATE = 'DUPLICATE',
  FAILED = 'FAILED'
}

export enum ResourceActionEnum {
  CREATE = 'CREATE',
  ASSIGN = 'ASSIGN',
  IMPORT = 'IMPORT'
}

export enum ResourceDeleteActionEnum {
  DELETE = 'DELETE',
  REMOVE = 'REMOVE'
}
