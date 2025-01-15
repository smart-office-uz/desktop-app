import { AuthLayout } from "@/app/widgets/auth-layout";
import { RegisterInstanceForm } from "@/core/presentation/register-instance/register-instance-form";
import { useSetAppInstanceBaseUrl } from "@/core/use-cases/app-instance/use-set-app-instance-base-url";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/register-instance")({
  component: () => {
    const navigate = useNavigate();

    function handleRegisterInstance(instanceUrl: string) {
      useSetAppInstanceBaseUrl({
        url: instanceUrl,
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
              handleRegisterInstance(values.instanceUrl);
            }}
          />
        }
      />
    );
  },
});
