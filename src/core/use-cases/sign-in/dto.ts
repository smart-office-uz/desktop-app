import { z } from "zod";

export interface SignInDto {
  username: string;
  password: string;
}

export const signInSchema = z.object({
  username: z.string({
    required_error: "Ushbu maydonni to'ldirish majburiy",
  }),
  password: z.string({
    required_error: "Ushbu maydonni to'ldirish majburiy",
  }),
});

export interface SignInSuccessResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface SignInErrorResponseDto {
  message: string;
}
