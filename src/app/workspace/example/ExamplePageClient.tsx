"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {
  createExampleAction,
  deleteExampleAction,
  updateExampleAction
} from "./server/actions"

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
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Examples</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Example</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createExampleAction} className="space-y-4">
            <div>
              <Label htmlFor="new-example">Example Name</Label>
              <Input
                id="new-example"
                name="name"
                placeholder="Enter new example name"
              />
            </div>
            <Button type="submit">Add Example</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {initialExamples.map(example => (
          <Card key={example.id}>
            <CardContent className="flex items-center justify-between p-4">
              {editingId === example.id ? (
                <form
                  action={updateExampleAction}
                  onSubmit={() => setEditingId(null)}
                  className="flex-grow mr-2"
                >
                  <Input
                    name="name"
                    defaultValue={example.note}
                    autoFocus
                    onBlur={e => {
                      e.currentTarget.form?.requestSubmit()
                    }}
                  />
                  <input type="hidden" name="id" value={example.id} />
                </form>
              ) : (
                <span>{example.note}</span>
              )}
              <div className="flex space-x-2">
                {editingId !== example.id && (
                  <Button
                    variant="outline"
                    onClick={() => setEditingId(example.id)}
                  >
                    Edit
                  </Button>
                )}
                <form action={deleteExampleAction}>
                  <input type="hidden" name="id" value={example.id} />
                  <Button variant="destructive" type="submit">
                    Delete
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
