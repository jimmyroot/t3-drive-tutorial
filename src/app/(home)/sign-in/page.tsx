import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Cloud, Shield, Zap, Users } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-gray-700">
                <span className="text-sm font-bold text-white">T3</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                T3 Drive
              </span>
            </div>
            <nav className="hidden items-center space-x-8 md:flex">
              <Link
                href="#features"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                Pricing
              </Link>
              <Link
                href="#about"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                About
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 bg-transparent"
              >
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto flex-1 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-6xl">
            Sign in
            <br />
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-600">
            Enter your login details below
          </p>
          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SignInButton forceRedirectUrl={"/drive"}>
              <Button
                size="lg"
                className="bg-gray-900 px-8 py-3 text-lg text-white hover:bg-gray-800"
              >
                Sign In
              </Button>
            </SignInButton>
          </div>
          {/* Feature Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/*
            <Card className="border-gray-200 bg-white/60 backdrop-blur-sm transition-all duration-200 hover:bg-white/80">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <Cloud className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Cloud Storage
                </h3>
                <p className="text-sm text-gray-600">
                  15GB free storage with unlimited scalability for your growing
                  needs.
                </p>
              </CardContent>
            </Card> */}

            {/* <Card className="border-gray-200 bg-white/60 backdrop-blur-sm transition-all duration-200 hover:bg-white/80">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <Shield className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Secure</h3>
                <p className="text-sm text-gray-600">
                  End-to-end encryption keeps your files private and protected.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white/60 backdrop-blur-sm transition-all duration-200 hover:bg-white/80">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <Zap className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Fast Sync</h3>
                <p className="text-sm text-gray-600">
                  Lightning-fast synchronization across all your devices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white/60 backdrop-blur-sm transition-all duration-200 hover:bg-white/80">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <Users className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">
                  Collaborate
                </h3>
                <p className="text-sm text-gray-600">
                  Share and collaborate on files with your team seamlessly.
                </p>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      {/* <section className="border-t border-gray-200/50 bg-white/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Ready to get started?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-gray-600">
            Join thousands of users who trust T3 Drive with their most important
            files.
          </p>
          <Button
            size="lg"
            className="bg-gray-900 px-8 py-3 text-white hover:bg-gray-800"
          >
            Start Free Today
          </Button>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="border-t border-gray-200/50 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center space-x-2 md:mb-0">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-gray-900 to-gray-700">
                <span className="text-xs font-bold text-white">T3</span>
              </div>
              <span className="font-medium text-gray-900">T3 Drive</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link href="#" className="transition-colors hover:text-gray-900">
                Privacy
              </Link>
              <Link href="#" className="transition-colors hover:text-gray-900">
                Terms
              </Link>
              <Link href="#" className="transition-colors hover:text-gray-900">
                Support
              </Link>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-200/50 pt-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} T3 Drive. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
