import ExamplePageClient from "./ExamplePageClient"
import { getExamples } from "./server/queries"

export default async function ExamplePage() {
  const initialExamples = await getExamples()
  return <ExamplePageClient initialExamples={initialExamples} />
}
