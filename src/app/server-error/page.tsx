export default async function ServerErrorPage() {
  throw new Error("Server Error")
  return <div>Server Error</div>
}
