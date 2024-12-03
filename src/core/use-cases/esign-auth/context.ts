export interface ESignAuthCtx {
  onAuthenticated: (data: {
    accessToken: string;
    refreshToken: string;
  }) => void;
  onError: (error: Error) => void;
}
