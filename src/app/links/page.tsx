import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links",
};

const links = [
  {
    name: "GitHub",
    url: "https://github.com/lermatroid",
  },
  {
    name: "Twitter",
    url: "https://x.com/lermatroid",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/lermatroid",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/liamrmurray",
  },
  {
    name: "BlueSky",
    url: "https://bsky.app/profile/liam.so",
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main content card */}
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/20 p-8 mb-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-sans text-2xl font-black text-card-foreground mb-2">
              Links
            </h1>
            <p className="font-mono text-sm font-medium text-muted-foreground">
              Other places I'm on the{" "}
              <span className="underline decoration-dotted underline-offset-2">
                internet
              </span>
              .
            </p>
          </div>

          {/* Links grid */}
          <div className="space-y-3">
            {/* First row - 3 items */}
            <div className="grid grid-cols-3 gap-3">
              {links.slice(0, 3).map((link) => (
                <Button
                  key={link.name}
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs font-semibold"
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </Button>
              ))}
            </div>

            {/* Second row - 2 items centered */}
            <div className="grid grid-cols-2 gap-3 max-w-[66%] mx-auto">
              {links.slice(3, 5).map((link) => (
                <Button
                  key={link.name}
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs font-semibold"
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Home link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-card-foreground transition-colors duration-200 text-sm font-mono underline decoration-dotted underline-offset-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
