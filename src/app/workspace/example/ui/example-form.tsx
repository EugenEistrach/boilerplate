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
import { zodResolver } from "@hookform/resolvers/zod"
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks"
import { PencilIcon, SaveIcon, TrashIcon, XIcon } from "lucide-react"
import {
  createExampleAction,
  deleteExampleAction,
  updateExampleAction
} from "../example-actions"
import {
  createExampleSchema,
  deleteExampleSchema,
  updateExampleSchema
} from "../example-validations"

interface Example {
  id: string
  note: string
}

interface ExamplePageClientProps {
  initialExamples: Example[]
}

export default function ExamplePageClient({
  initialExamples
}: ExamplePageClientProps) {
  const {
    form: createForm,
    handleSubmitWithAction: handleCreateSubmit,
    resetFormAndAction: resetCreateForm
  } = useHookFormAction(createExampleAction, zodResolver(createExampleSchema), {
    formProps: {
      defaultValues: {
        name: ""
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
      <h1 className="text-2xl font-bold mb-4">Examples</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Example</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...createForm}>
            <form onSubmit={handleCreateSubmit} className="space-y-8">
              <FormField
                control={createForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your note here" {...field} />
                    </FormControl>
                    <FormDescription>Enter a new note.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Example</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {initialExamples.map(example => (
          <ExampleCard key={example.id} example={example} />
        ))}
      </div>
    </div>
  )
}

function ExampleCard({ example }: { example: Example }) {
  return (
    <Card className="group relative">
      <CardContent className="p-4">
        <UpdateExampleForm example={example} />
      </CardContent>
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DeleteExampleForm exampleId={example.id} />
      </div>
    </Card>
  )
}

function UpdateExampleForm({ example }: { example: Example }) {
  const { form: updateForm, handleSubmitWithAction: handleUpdateSubmit } =
    useHookFormAction(updateExampleAction, zodResolver(updateExampleSchema), {
      formProps: {
        defaultValues: {
          name: example.note
        }
      }
    })

  return (
    <TooltipProvider>
      <Form {...updateForm}>
        <form onSubmit={handleUpdateSubmit} className="space-y-2">
          <FormField
            control={updateForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
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
                      <p>Save changes</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </FormItem>
            )}
          />
          <input
            type="hidden"
            {...updateForm.register("id")}
            value={example.id}
          />
        </form>
      </Form>
    </TooltipProvider>
  )
}

function DeleteExampleForm({ exampleId }: { exampleId: string }) {
  const { form: deleteForm, handleSubmitWithAction: handleDeleteSubmit } =
    useHookFormAction(deleteExampleAction, zodResolver(deleteExampleSchema))

  return (
    <TooltipProvider>
      <Form {...deleteForm}>
        <form onSubmit={handleDeleteSubmit}>
          <input
            type="hidden"
            {...deleteForm.register("id")}
            value={exampleId}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                type="submit"
                className=" w-6 h-6 p-0"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </form>
      </Form>
    </TooltipProvider>
  )
}
