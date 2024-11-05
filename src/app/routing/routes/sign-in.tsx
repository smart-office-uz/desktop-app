import { createFileRoute, useLayoutEffect } from "@tanstack/react-router";

// services
import WindowService from "@/core/services/window.service";

// use-cases
import { SignInForm } from "@/core/use-cases/user/sign-in/ui/SignInForm";

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
});

function SignIn() {
  const windowService = new WindowService();

  async function configureWindow() {
    await windowService.change_window_size({
      height: 600,
      width: 500,
    });
    await windowService.center_window();
  }

  useLayoutEffect(() => {
    configureWindow();
  }, []);

  return (
    <section className="min-h-[90vh] flex flex-col gap-6 items-center justify-center">
      <SignInForm />
    </section>
  );
}
