import { getExamples } from "./example-queries"
import ExamplePageClient from "./ui/example-form"

export default async function ExamplePage() {
  const initialExamples = await getExamples()
  return <ExamplePageClient initialExamples={initialExamples} />
}
