import { AuthLayout } from "@/app/widgets/auth-layout";
import { ESignAuthView } from "@/core/presentation/esign-auth/esign-auth";
import { SignInForm } from "@/core/presentation/sign-in/sign-in-form";
import WindowService from "@/core/services/window.service";
import { useCheckAppInstanceBaseUrl } from "@/core/use-cases/app-instance/use-check-app-instance-base-url";
import {
  createFileRoute,
  redirect,
  useLayoutEffect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
  beforeLoad: async function () {
    const appInstanceBaseUrl = await useCheckAppInstanceBaseUrl();
    if (appInstanceBaseUrl instanceof Error) {
      throw redirect({
        to: "/register-instance",
      });
    }
  },
});

async function configureWindow() {
  const windowService = new WindowService();
  await windowService.center_window();
}

function SignIn() {
  useLayoutEffect(() => {
    configureWindow();
  }, []);

  return (
    <AuthLayout
      Form={
        <>
          <SignInForm />
          <ESignAuthView />
        </>
      }
    />
  );
}
