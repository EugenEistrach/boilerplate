import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Link } from "@/components/ui/link"
import { getI18n } from "@/locales/server"
import { Notebook, Settings } from "lucide-react"

export default async function AppPage() {
  const t = await getI18n()

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">{t("workspace.title")}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("workspace.notes")}</CardTitle>
            <CardDescription>{t("workspace.notesDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/workspace/notes">
                <Notebook className="mr-2 h-4 w-4" />
                {t("workspace.goToNotes")}
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("workspace.settings")}</CardTitle>
            <CardDescription>
              {t("workspace.settingsDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/workspace/settings">
                <Settings className="mr-2 h-4 w-4" />
                {t("workspace.goToSettings")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
