export interface ESignAuthCtx {
    onSuccessFullyInitialized: () => void;
    onAuthenticated: (data:{
        accessToken: string;
        refreshToken: string;
    }) => void;
    onError: (error: Error) => void;
}