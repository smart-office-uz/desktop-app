import { AuthLayout } from "@/app/widgets/auth-layout";
import { RegisterInstanceForm } from "@/core/presentation/register-instance/register-instance-form";
import { useSetAppInstanceContext } from "@/core/use-cases/app-instance/use-set-app-instance-ctx";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/register-instance")({
  component: () => {
    const navigate = useNavigate();

    function handleRegisterInstance(
      instanceUrl: string,
      notificationServiceToken: string
    ) {
      useSetAppInstanceContext({
        url: instanceUrl,
        notificationServiceToken,
      });

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
