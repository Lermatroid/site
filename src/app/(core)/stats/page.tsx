"use client";

import Link from "next/link";
import { Home, Github } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the contribution viewer to avoid SSR issues
const ContributionViewer = dynamic(
  () => import("react-contribution-viewer"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-32 text-muted-foreground font-mono">
        Loading GitHub activity...
      </div>
    )
  }
);

export default function StatsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full gap-y-6 px-5">
      {/* Header */}
      <div className="max-w-[600px] flex flex-col">
        <h2 className="font-sans text-5xl font-black pb-4 text-left text-balance">
          Stats
        </h2>
        <h1 className="font-mono text-lg font-bold">
          A glimpse into my digital footprint
        </h1>
      </div>

      {/* GitHub Contribution Chart */}
      <div className="max-w-[600px] w-full">
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/20 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Github className="w-5 h-5" />
            <h2 className="font-mono text-xl font-bold text-card-foreground">
              GitHub Activity
            </h2>
          </div>
          <div className="overflow-hidden rounded-lg">
            <ContributionViewer
              username="lermatroid"
              isDark={true}
              isHeader={true}
              renderHeader={(total) => (
                <div className="mb-4 font-mono text-sm text-muted-foreground">
                  <span className="font-bold text-card-foreground">{total}</span> contributions in the last year
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* Current Projects */}
      <div className="max-w-[600px] w-full">
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/20 p-8">
          <div className="flex flex-col gap-y-2 font-mono font-bold text-card-foreground">
            <span className="text-muted-foreground pb-2">
              // CURRENT_PROJECTS.md
            </span>
            <span>## What I'm Building</span>
            <span className="text-sm text-muted-foreground">
              ### Personal Website v3
            </span>
            <span className="text-sm">
              - Rebuilt with Next.js 15 and BaseHub CMS
            </span>
            <span className="text-sm">
              - Modern design with glass morphism
            </span>
            <span className="text-sm">
              - Integrated Spotify and Steam activity
            </span>
            <span className="text-sm text-muted-foreground pt-2">
              ### ML Research Assistant
            </span>
            <span className="text-sm">
              - Exploring LLM applications for research
            </span>
            <span className="text-sm">
              - Building with Python and PyTorch
            </span>
            <span className="text-sm">
              - Focus on academic paper analysis
            </span>
            <span className="text-sm text-muted-foreground pt-2">
              ### Open Source Contributions
            </span>
            <span className="text-sm">
              - Contributing to various React libraries
            </span>
            <span className="text-sm">
              - Maintaining personal projects on{" "}
              <Link
                href="https://github.com/lermatroid"
                target="_blank"
                className="underline decoration-dotted underline-offset-2"
              >
                GitHub
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="max-w-[600px] w-full">
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/20 p-8">
          <div className="flex flex-col gap-y-2 font-mono font-bold text-card-foreground">
            <span className="text-muted-foreground pb-2">
              // EXPERIENCE.md
            </span>
            <span>## Professional Journey</span>
            <span className="text-sm text-muted-foreground">
              ### Software Engineer @ Google
            </span>
            <span className="text-sm">
              - Building systems for millions of users
            </span>
            <span className="text-sm">
              - Full-stack development and system design
            </span>
            <span className="text-sm">
              - Working with cutting-edge technologies
            </span>
            <span className="text-sm text-muted-foreground pt-2">
              ### Previous Roles
            </span>
            <span className="text-sm">
              - Intern and full-time positions
            </span>
            <span className="text-sm">
              - Focus on web technologies and APIs
            </span>
            <span className="text-sm">
              - Experience with React, Node.js, Python
            </span>
            <span className="text-sm text-muted-foreground pt-2">
              ### Skills & Technologies
            </span>
            <span className="text-sm">
              - JavaScript/TypeScript, Python, Go
            </span>
            <span className="text-sm">
              - React, Next.js, Node.js, Django
            </span>
            <span className="text-sm">
              - AWS, GCP, Docker, Kubernetes
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-start max-w-[600px] w-full">
        <p className="font-mono font-bold">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-b-2 border-foreground"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </p>
      </div>
    </main>
  );
}
