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
import { zodResolver } from "@hookform/resolvers/zod"
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks"
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
          <Card key={example.id}>
            <CardContent className="flex items-center justify-between p-4">
              <UpdateExampleForm example={example} />
              <DeleteExampleForm exampleId={example.id} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function UpdateExampleForm({ example }: { example: Example }) {
  const {
    form: updateForm,
    handleSubmitWithAction: handleUpdateSubmit,
    resetFormAndAction: resetUpdateForm
  } = useHookFormAction(updateExampleAction, zodResolver(updateExampleSchema), {
    formProps: {
      defaultValues: {
        name: example.note
      }
    }
  })

  return (
    <Form {...updateForm}>
      <form onSubmit={handleUpdateSubmit} className="flex-grow mr-2">
        <FormField
          control={updateForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter a new note.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <input
          type="hidden"
          {...updateForm.register("id")}
          value={example.id}
        />
        <Button type="submit" variant="outline" className="ml-2">
          Update
        </Button>
      </form>
    </Form>
  )
}

function DeleteExampleForm({ exampleId }: { exampleId: string }) {
  const { form: deleteForm, handleSubmitWithAction: handleDeleteSubmit } =
    useHookFormAction(deleteExampleAction, zodResolver(deleteExampleSchema))

  return (
    <Form {...deleteForm}>
      <form onSubmit={handleDeleteSubmit}>
        <input type="hidden" {...deleteForm.register("id")} value={exampleId} />
        <Button variant="destructive" type="submit">
          Delete
        </Button>
      </form>
    </Form>
  )
}
