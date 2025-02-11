import { useRouter } from "@tanstack/react-router";
import { Button } from "../components/button";
import { TypographyH1, TypographyP } from "../components/typography";
import { Header } from "../widgets/header";

interface FallBackProps {
  error: any;
  reset(): void;
}

export function ErrorFallBack({ error, reset }: FallBackProps) {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-3">
        <TypographyH1>Xatolik yuz berdi!</TypographyH1>
        <TypographyP className="text-center text-lg">
          {error.message}
        </TypographyP>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={reset}>Qayta urinib ko'rish</Button>
          <Button variant="outline" onClick={() => router.invalidate()}>
            Sahifani yangilash
          </Button>
        </div>
      </div>
    </>
  );
}
