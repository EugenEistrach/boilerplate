"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  } = useHookFormAction(createExampleAction, zodResolver(createExampleSchema))

  const {
    form: updateForm,
    handleSubmitWithAction: handleUpdateSubmit,
    resetFormAndAction: resetUpdateForm
  } = useHookFormAction(updateExampleAction, zodResolver(updateExampleSchema))

  const { action: deleteAction } = useHookFormAction(
    deleteExampleAction,
    zodResolver(deleteExampleSchema)
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Examples</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Example</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <Label htmlFor="new-example">Example Name</Label>
              <Input
                id="new-example"
                {...createForm.register("name")}
                placeholder="Enter new example name"
              />
              {createForm.formState.errors.name && (
                <p className="text-red-500">
                  {createForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <Button type="submit">Add Example</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {initialExamples.map(example => (
          <Card key={example.id}>
            <CardContent className="flex items-center justify-between p-4">
              <form onSubmit={handleUpdateSubmit} className="flex-grow mr-2">
                <Input
                  {...updateForm.register("name")}
                  defaultValue={example.note}
                />
                <input
                  type="hidden"
                  {...updateForm.register("id")}
                  value={example.id}
                />
                {updateForm.formState.errors.name && (
                  <p className="text-red-500">
                    {updateForm.formState.errors.name.message}
                  </p>
                )}
                <Button type="submit" variant="outline" className="ml-2">
                  Update
                </Button>
              </form>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  deleteAction.execute({ id: example.id })
                }}
              >
                <Button variant="destructive" type="submit">
                  Delete
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
