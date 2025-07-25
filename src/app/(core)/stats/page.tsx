import Link from "next/link";
import { Github } from "lucide-react";
import GitHubCalendar from "react-github-calendar";
import { siteConfig } from "../../../../site.config";

export default function Page() {
  return (
    <main className="flex flex-col items-center min-h-screen w-full gap-y-6 px-5 py-16 pb-28 relative">
      {/* Header */}
      <div className="max-w-[600px] w-full flex flex-col items-start">
        <div className="pb-6">
          <h1 className="font-sans text-7xl font-black pb-3 text-left text-balance">
            Stats
          </h1>
          <h2 className="font-mono text-lg font-bold">
            Info about me and what I've been up to
          </h2>
        </div>
      </div>

      {/* GitHub Contribution Chart */}
      <div className="max-w-[600px] w-full">
        <Link
          href="https://github.com/lermatroid"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/20 p-8 cursor-pointer">
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
                blockSize={8}
                blockMargin={4}
                showWeekdayLabels={false}
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Experience */}
      <div className="max-w-[600px] w-full">
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/20 p-8">
          <div className="flex flex-col gap-y-2 font-mono font-bold text-card-foreground">
            <span className="text-muted-foreground pb-2">// EXPERIENCE.md</span>
            <span>## Professional Journey</span>

            {siteConfig.experience.map((exp, index) => (
              <div key={index} className="mt-2">
                <span className="text-sm text-muted-foreground">
                  ### {exp.title} ({exp.period})
                </span>
                <span className="text-sm">
                  {` - ${exp.desc}`}
                  {exp.link && (
                    <>
                      {" "}
                      <Link
                        href={exp.link}
                        target="_blank"
                        className="underline decoration-dotted underline-offset-2"
                      >
                        {exp.linkTitle || "Link"}
                      </Link>
                    </>
                  )}
                </span>
              </div>
            ))}
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

            {siteConfig.projects.map((project, index) => (
              <div key={index} className="mt-2">
                <span className="text-sm text-muted-foreground">
                  ### {project.title}
                </span>{" "}
                <span className="text-sm">
                  - {project.desc}
                  {project.link && (
                    <>
                      {" "}
                      <Link
                        href={project.link}
                        target="_blank"
                        className="underline decoration-dotted underline-offset-2"
                      >
                        {project.linkTitle || "Link"}
                      </Link>
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[600px] w-full bg-gradient-to-b from-transparent to-background fixed z-40 bottom-0 left-1/2 -translate-x-1/2 h-28"></div>
      </div>
    </main>
  );
}

export const revalidate = 21600; // 6 hours
