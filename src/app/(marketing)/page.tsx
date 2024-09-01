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
import { env } from "@/lib/env"
import { auth } from "@clerk/nextjs/server"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function Component() {
  const { userId } = auth()

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
            Features
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            About
          </a>
          <ThemeToggle />
          <Button asChild>
            <Link href={userId ? env.NEXT_PUBLIC_ROOT_PATH : "/sign-up"}>
              {userId ? "Go to App" : "Get Started"}
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
                  Launch Your SaaS Faster
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl  text-muted-foreground">
                  Our boilerplate gives you the foundation to build and scale
                  your SaaS product in record time.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href={userId ? env.NEXT_PUBLIC_ROOT_PATH : "/sign-up"}>
                    {userId ? "Go to App" : "Get Started"}
                  </Link>
                </Button>
                <Button variant="outline">Learn More</Button>
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
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "Authentication",
                  description: "Built-in auth system with multiple providers"
                },
                {
                  title: "Database Integration",
                  description: "Seamless integration with popular databases"
                },
                {
                  title: "API Routes",
                  description: "Pre-configured API routes for rapid development"
                },
                {
                  title: "Responsive Design",
                  description: "Mobile-first, responsive layouts out of the box"
                },
                {
                  title: "Testing Setup",
                  description:
                    "Testing environment ready for unit and integration tests"
                },
                {
                  title: "Deployment Ready",
                  description:
                    "One-click deployment to popular hosting platforms"
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
              Simple Pricing
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "Starter",
                  price: "$29",
                  description: "Perfect for side projects",
                  features: [
                    "Basic Authentication",
                    "SQLite Database",
                    "5 API Routes",
                    "Community Support"
                  ]
                },
                {
                  title: "Pro",
                  price: "$99",
                  description: "For serious SaaS builders",
                  features: [
                    "Advanced Auth",
                    "PostgreSQL Database",
                    "Unlimited API Routes",
                    "Priority Support"
                  ]
                },
                {
                  title: "Enterprise",
                  price: "Custom",
                  description: "For large-scale applications",
                  features: [
                    "Custom Auth Solutions",
                    "Any Database",
                    "Custom API Development",
                    "24/7 Support"
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
                    <p className="text-sm text-muted-foreground">per month</p>
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
                    <Button className="w-full">Choose Plan</Button>
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
                  Ready to Accelerate Your SaaS Development?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get started with our boilerplate today and focus on what
                  matters most - your unique product features.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg">Get Started Now</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} SaaS Boilerplate Inc. All rights
          reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="/">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="/">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}
