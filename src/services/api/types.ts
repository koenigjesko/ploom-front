export const Code = {
  OK: 200,
  BadRequest: 500
} as const;

export type ResponseCode = typeof Code[keyof typeof Code];

export interface Dictionary {
  [key: string]: unknown;
}

export interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

export interface AuthorizeUserParams {
  email?: string;
  password?: string;
}

export interface RegisterUserParams {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
}

export interface RegisterUserBody {
  profile_image?: File;
}

export interface GenerateFromSingleParams {
  user_id?: number;
}

export interface GenerateFromSingleBody {
  image?: File;
}

export interface GenerateFromMultipleParams {
  user_id?: number;
}

export interface GenerateFromMultipleBody {
  images?: File[];
}
