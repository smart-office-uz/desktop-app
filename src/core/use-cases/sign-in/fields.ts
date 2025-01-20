import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";

import { z } from "zod";

export interface SignInDto {
  username: string;
  password: string;
}

export interface SignInSuccessResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface SignInErrorResponseDto {
  message: string;
}

interface UseFormProps {
  handler: (data: SignInDto) => void;
}

export const signInSchema = z.object({
  username: z.string({
    required_error: "Ushbu maydonni to'ldirish majburiy",
  }),
  password: z.string({
    required_error: "Ushbu maydonni to'ldirish majburiy",
  }),
});

export function useSignInFields(props: UseFormProps) {
  const form = useReactHookForm<SignInDto>({
    resolver: zodResolver(signInSchema),
  });

  function handleSubmit(data: SignInDto) {
    props.handler(data);
  }

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}
