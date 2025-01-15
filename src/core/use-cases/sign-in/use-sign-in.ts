import { useMutation } from "@tanstack/react-query";

// services
import UserService from "@/core/services/user.service";

// dtos
import type {
  SignInDto,
  SignInErrorResponseDto,
  SignInSuccessResponseDto,
} from "./dto";

interface Props {
  onSuccess?: (response: SignInSuccessResponseDto) => void;
  onError?: (response: SignInErrorResponseDto) => void;
}

interface Result {
  isPending: boolean;
  isError: boolean;
  error: any;
  response: any;
  signIn: (payload: SignInDto) => Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
}

export function useSignInUseCase(props: Props): Result {
  const mutation = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async function (payload: SignInDto) {
      const service = new UserService();
      return await service.signInUser(payload);
    },
    onSuccess(response) {
      props.onSuccess?.({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
    },
    onError(err) {
      props.onError?.({
        message: err.message,
      });
    },
  });

  return {
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    response: mutation.data,
    signIn: mutation.mutateAsync,
  };
}
