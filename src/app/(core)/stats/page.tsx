"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the GitHub calendar to avoid SSR issues
const GitHubCalendar = dynamic(
  () => import("react-github-calendar"),
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
      <div className="max-w-[600px] w-full flex flex-col items-start">
        <div>
          <h2 className="font-sans text-7xl font-black pb-10 text-left text-balance">
            Stats
          </h2>
        </div>
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
            <GitHubCalendar
              username="lermatroid"
              colorScheme="dark"
              fontSize={12}
              blockSize={11}
              blockMargin={4}
              showWeekdayLabels
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
    </main>
  );
}
