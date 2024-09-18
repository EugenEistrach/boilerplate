import { getNotes } from "./note-queries"
import Notes from "./ui/note-form"

export default async function NotePage() {
  const initialNotes = await getNotes()
  return <Notes initialNotes={initialNotes} />
}
