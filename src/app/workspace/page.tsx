import Link from "next/link"

export default async function AppPage() {
  return (
    <div>
      <h1>Workspace</h1>
      <Link href="/workspace/example">Example</Link>
    </div>
  )
}
