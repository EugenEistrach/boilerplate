"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { useI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks"
import { SaveIcon, XIcon } from "lucide-react"
import {
  createNoteAction,
  deleteNoteAction,
  updateNoteAction
} from "../note-actions"
import {
  CreateNoteSchema,
  DeleteNoteSchema,
  UpdateNoteSchema
} from "../note-validations"

interface Note {
  id: string
  content: string
  createdAt: Date
  modifiedAt: Date
}

interface NotesProps {
  initialNotes: Note[]
}

export default function Notes({ initialNotes }: NotesProps) {
  const t = useI18n()

  const {
    form: createForm,
    handleSubmitWithAction: handleCreateSubmit,
    resetFormAndAction: resetCreateForm
  } = useHookFormAction(createNoteAction, zodResolver(CreateNoteSchema(t)), {
    formProps: {
      defaultValues: {
        content: ""
      }
    },
    actionProps: {
      onSuccess: () => {
        resetCreateForm()
      }
    }
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t("notes.title")}</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("notes.addNewNote")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...createForm}>
            <form onSubmit={handleCreateSubmit} className="space-y-8">
              <FormField
                control={createForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("notes.noteLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("notes.notePlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("notes.noteDescription")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{t("notes.createNote")}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {initialNotes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}

function NoteCard({ note }: { note: Note }) {
  return (
    <Card className="group relative">
      <CardContent className="p-4">
        <UpdateNoteForm note={note} />
      </CardContent>
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DeleteNoteForm noteId={note.id} />
      </div>
    </Card>
  )
}

function UpdateNoteForm({ note }: { note: Note }) {
  const t = useI18n()
  const { form: updateForm, handleSubmitWithAction: handleUpdateSubmit } =
    useHookFormAction(updateNoteAction, zodResolver(UpdateNoteSchema(t)), {
      formProps: {
        defaultValues: {
          content: note.content
        }
      }
    })

  return (
    <TooltipProvider>
      <Form {...updateForm}>
        <form onSubmit={handleUpdateSubmit} className="space-y-2">
          <FormField
            control={updateForm.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="text-sm text-gray-500 mt-2">
                    <p>{new Date(note.modifiedAt).toLocaleString()}</p>
                  </div>
                </FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="submit" size="icon" variant="ghost">
                        <SaveIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("notes.saveChanges")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </FormItem>
            )}
          />
          <input type="hidden" {...updateForm.register("id")} value={note.id} />
        </form>
      </Form>
    </TooltipProvider>
  )
}

function DeleteNoteForm({ noteId }: { noteId: string }) {
  const t = useI18n()
  const { form: deleteForm, handleSubmitWithAction: handleDeleteSubmit } =
    useHookFormAction(deleteNoteAction, zodResolver(DeleteNoteSchema))

  return (
    <TooltipProvider>
      <Form {...deleteForm}>
        <form onSubmit={handleDeleteSubmit}>
          <input type="hidden" {...deleteForm.register("id")} value={noteId} />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                type="submit"
                className="w-6 h-6 p-0"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("notes.delete")}</p>
            </TooltipContent>
          </Tooltip>
        </form>
      </Form>
    </TooltipProvider>
  )
}
