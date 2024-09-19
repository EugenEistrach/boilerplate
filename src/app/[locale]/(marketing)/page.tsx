import { LocaleSwitcher } from "@/components/locale-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Link } from "@/components/ui/link"
import { auth } from "@/lib/auth"
import { getI18n } from "@/locales/server"
import { CheckCircle2 } from "lucide-react"

export default async function Component() {
  const session = await auth()
  const userId = session?.user?.email
  const t = await getI18n()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="/">
          <span className="sr-only">SaaS Boilerplate</span>
          <svg
            className=" h-6 w-6"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
          </svg>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            {t("nav.features")}
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            {t("nav.pricing")}
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            {t("nav.about")}
          </a>
          <ThemeToggle />
          <Button asChild>
            <Link href={userId ? "/workspace" : "/sign-in"}>
              {userId ? t("nav.goToApp") : t("nav.getStarted")}
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {t("hero.title")}
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl  text-muted-foreground">
                  {t("hero.description")}
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href={userId ? "/workspace" : "/sign-in"}>
                    {userId ? t("nav.goToApp") : t("nav.getStarted")}
                  </Link>
                </Button>
                <Button variant="outline">{t("hero.learnMore")}</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32  bg-secondary text-secondary-foreground"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              {t("features.title")}
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: t("features.authentication"),
                  description: t("features.authenticationDescription")
                },
                {
                  title: t("features.databaseIntegration"),
                  description: t("features.databaseIntegrationDescription")
                },
                {
                  title: t("features.apiRoutes"),
                  description: t("features.apiRoutesDescription")
                },
                {
                  title: t("features.responsiveDesign"),
                  description: t("features.responsiveDesignDescription")
                },
                {
                  title: t("features.testingSetup"),
                  description: t("features.testingSetupDescription")
                },
                {
                  title: t("features.deploymentReady"),
                  description: t("features.deploymentReadyDescription")
                }
              ].map(feature => (
                <Card key={feature.title}>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              {t("pricing.title")}
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: t("pricing.starter"),
                  price: t("pricing.starterPrice"),
                  description: t("pricing.starterDescription"),
                  features: [
                    t("pricing.starterFeature1"),
                    t("pricing.starterFeature2"),
                    t("pricing.starterFeature3"),
                    t("pricing.starterFeature4")
                  ]
                },
                {
                  title: t("pricing.pro"),
                  price: t("pricing.proPrice"),
                  description: t("pricing.proDescription"),
                  features: [
                    t("pricing.proFeature1"),
                    t("pricing.proFeature2"),
                    t("pricing.proFeature3"),
                    t("pricing.proFeature4")
                  ]
                },
                {
                  title: t("pricing.enterprise"),
                  price: t("pricing.enterprisePrice"),
                  description: t("pricing.enterpriseDescription"),
                  features: [
                    t("pricing.enterpriseFeature1"),
                    t("pricing.enterpriseFeature2"),
                    t("pricing.enterpriseFeature3"),
                    t("pricing.enterpriseFeature4")
                  ]
                }
              ].map(plan => (
                <Card key={plan.title} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-4xl font-bold">{plan.price}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("pricing.perMonth")}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map(feature => (
                        <li key={feature} className="flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      {t("pricing.choosePlan")}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t("cta.title")}
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t("cta.description")}
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg">{t("cta.button")}</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          {t("footer.rights", { year: new Date().getFullYear() })}
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6 items-center">
          <a className="text-xs hover:underline underline-offset-4" href="/">
            {t("footer.terms")}
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="/">
            {t("footer.privacy")}
          </a>
          <LocaleSwitcher />
        </nav>
      </footer>
    </div>
  )
}
