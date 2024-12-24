import { createFileRoute, useLayoutEffect } from "@tanstack/react-router";

// services
import WindowService from "@/core/services/window.service";

// use-cases
import { SignInForm } from "@/core/use-cases/user/sign-in/ui/SignInForm";

// widgets
import { AuthLayout } from "@/app/widgets/auth-layout";
import { ESignAuthView } from "@/core/presentation/esign-auth/esign-auth";
import { useCheckAppInstanceBaseUrl } from "@/core/use-cases/app-instance/use-check-app-instance-base-url";
import { redirect } from "@tanstack/react-router";

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

function SignIn() {
  const windowService = new WindowService();

  async function configureWindow() {
    await windowService.center_window();
  }

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
