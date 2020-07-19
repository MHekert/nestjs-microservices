export interface logInput {
  message: string;
  context?: any;
}

export type errorInput = Error | { message: string; trace: string };
