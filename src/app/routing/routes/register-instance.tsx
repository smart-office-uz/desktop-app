import { AuthLayout } from "@/app/widgets/auth-layout";
import { RegisterInstanceForm } from "@/core/presentation/register-instance/register-instance-form";
import { crashReporter } from "@/core/services/crash-reposter.service";
import { useSetAppInstanceContext } from "@/core/use-cases/app-instance/use-set-app-instance-ctx";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/register-instance")({
  component: () => {
    const navigate = useNavigate();

    async function handleRegisterInstance(
      instanceUrl: string,
      notificationServiceToken: string
    ) {
      const result = await useSetAppInstanceContext({
        url: instanceUrl,
        notificationServiceToken,
      });

      if (result !== true) {
        toast.error(result.message);
        crashReporter.captureException(result);
        return;
      }

      navigate({
        to: "/sign-in",
        from: "/register-instance",
      });
    }

    return (
      <AuthLayout
        Form={
          <RegisterInstanceForm
            handleSubmit={function (values) {
              handleRegisterInstance(
                values.instanceUrl,
                values.notificationServiceToken
              );
            }}
          />
        }
      />
    );
  },
});
