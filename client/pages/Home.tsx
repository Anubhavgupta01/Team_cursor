import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Bot,
  ShieldCheck,
  Sparkles,
  Rocket,
  CreditCard,
  HelpCircle,
  Mail,
  Github,
  Twitter,
  Check,
} from "lucide-react";

export default function Home() {
  return (
    <AppShell>
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </AppShell>
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24 animate-fade scroll-mt-16"
      id="home"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_400px_at_50%_-50px,hsl(var(--brand-1)/0.18),transparent_70%)]" />
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight">
          Welcome to AI-Powered Conversations
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Chat, create, and discover with an elegant interface that feels
          familiar—fast, simple, and delightful.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/" className="w-full sm:w-auto">
            <Button className="h-12 px-8 bg-brand-gradient text-white text-base">
              Try Now
            </Button>
          </a>
          <a href="#features" className="w-full sm:w-auto">
            <Button variant="outline" className="h-12 px-8 text-base">
              Explore Features
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: Bot,
      title: "Smart Generation",
      desc: "Create stories and images powered by AI, tailored to your style.",
    },
    {
      icon: ShieldCheck,
      title: "Private by default",
      desc: "Your content stays on your device unless you choose to share.",
    },
    {
      icon: Rocket,
      title: "Fast & Fluid",
      desc: "Subtle animations and instant feedback keep you in flow.",
    },
    {
      icon: Sparkles,
      title: "Beautiful UI",
      desc: "Thoughtful design with dark mode, gradients, and clarity.",
    },
  ];
  return (
    <section id="features" className="py-16 md:py-24 animate-fade scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
          Features
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <Card key={it.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-brand-gradient text-white flex items-center justify-center">
                  <it.icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-4 text-xl">{it.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {it.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["5 stories/month", "Basic export", "Standard styles"],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "$12",
      features: ["Unlimited stories", "HD images", "PDF & Gallery export"],
      cta: "Go Pro",
      highlight: true,
    },
    {
      name: "Team",
      price: "$29",
      features: ["5 seats", "Shared library", "Priority support"],
      cta: "Start Team",
    },
  ];
  return (
    <section id="pricing" className="py-16 md:py-24 animate-fade scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
          Pricing
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <Card
              key={p.name}
              className={`${p.highlight ? "ring-2 ring-primary" : ""}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  {p.name}{" "}
                  {p.highlight && (
                    <CreditCard className="h-5 w-5 text-primary" />
                  )}
                </CardTitle>
                <div className="text-3xl font-extrabold">
                  {p.price}
                  <span className="text-base text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/signup">
                  <Button
                    className={`${p.highlight ? "bg-brand-gradient text-white" : ""} w-full`}
                  >
                    {p.cta}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 animate-fade scroll-mt-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
          FAQ
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger>How does generation work?</AccordionTrigger>
            <AccordionContent>
              Enter an idea, choose options, and we create scenes with text and
              images. You can edit or regenerate any part.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>Can I export my stories?</AccordionTrigger>
            <AccordionContent>
              Yes—export to PDF or download the image gallery from the story
              view.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Is there a free plan?</AccordionTrigger>
            <AccordionContent>
              The Free plan lets you try essential features with monthly limits.
              Upgrade anytime.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 animate-fade scroll-mt-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">Contact</h2>
        <p className="mt-2 text-muted-foreground">
          Questions or feedback? We’d love to hear from you.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="mailto:support@example.com">
            <Button>
              <Mail className="h-4 w-4" /> Email
            </Button>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Button variant="outline">
              <Twitter className="h-4 w-4" /> Twitter
            </Button>
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="outline">
              <Github className="h-4 w-4" /> GitHub
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t mt-10 text-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Bot className="h-4 w-4" /> <span>StoryVisualizer</span>{" "}
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-5 text-muted-foreground">
          <a className="hover:text-foreground" href="#home">
            Home
          </a>
          <a className="hover:text-foreground" href="#features">
            Features
          </a>
          <a className="hover:text-foreground" href="#pricing">
            Pricing
          </a>
          <a className="hover:text-foreground" href="#faq">
            FAQ
          </a>
          <a className="hover:text-foreground" href="#contact">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
