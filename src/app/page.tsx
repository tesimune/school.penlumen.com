import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  School,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <School className="h-6 w-6" />
            <span className="text-xl font-bold">EduManage</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Simplify School Management with EduManage
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A comprehensive solution for schools to manage students,
                    teachers, classes, and more. All in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="#demo">
                    <Button size="lg" variant="outline">
                      View Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full overflow-hidden rounded-xl bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted-foreground/20" />
                  <Image
                    src="/placeholder.svg?height=450&width=600"
                    alt="Dashboard Preview"
                    className="h-full w-full object-cover"
                    width={600}
                    height={450}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full bg-muted py-12 md:py-24 lg:py-32"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to manage your school
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our platform provides a comprehensive set of tools to
                  streamline school administration, enhance teaching, and
                  improve learning outcomes.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Student Management</h3>
                    <p className="text-muted-foreground">
                      Easily manage student records, attendance, and performance
                      tracking.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Teacher Management</h3>
                    <p className="text-muted-foreground">
                      Streamline teacher scheduling, performance reviews, and
                      resource allocation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Curriculum Planning</h3>
                    <p className="text-muted-foreground">
                      Develop and manage curriculum, lesson plans, and
                      educational resources.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative h-[450px] overflow-hidden rounded-xl bg-muted">
                <Image
                  src="/placeholder.svg?height=450&width=600"
                  alt="Features Preview"
                  className="h-full w-full object-cover"
                  width={600}
                  height={450}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Trusted by schools worldwide
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  See what school administrators, teachers, and parents are
                  saying about our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-card p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-muted">
                        <Image
                          src={`/placeholder.svg?height=50&width=50&text=User${i}`}
                          alt="User"
                          className="h-full w-full rounded-full object-cover"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">
                          School Principal
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          International School
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      EduManage has transformed how we run our school. The
                      administrative burden has been significantly reduced,
                      allowing us to focus more on education.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="w-full bg-primary py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground md:text-4xl/tight">
                  Ready to transform your school management?
                </h2>
                <p className="max-w-[900px] text-primary-foreground/80 md:text-xl/relaxed">
                  Join thousands of schools that have simplified their
                  administration with EduManage.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <School className="h-6 w-6" />
            <span className="text-xl font-bold">EduManage</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </nav>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduManage. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
