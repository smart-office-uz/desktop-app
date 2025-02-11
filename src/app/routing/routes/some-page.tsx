import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/some-page')({
  component: () => <div>Hello /some-page!</div>,
})
