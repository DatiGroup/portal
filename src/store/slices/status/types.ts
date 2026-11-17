export interface Language {
  [key: string]: string;
}

export interface StatusResponseType {
  agentName: string;
  agentType: string;
  uuid: string | null;
  defaultLanguage: string;
  languages: string[];
  lwr: string;
}
