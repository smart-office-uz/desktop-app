import { Header } from "@/app/widgets/header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat")({
  component() {
    return (
      <>
        <Header />
        <section></section>
      </>
    );
  },
});
