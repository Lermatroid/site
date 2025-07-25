export interface Project {
  title: string;
  desc: string;
  link?: string;
  linkTitle?: string;
}

export interface Experience {
  title: string;
  desc: string;
  period: string;
  link?: string;
  linkTitle?: string;
}

export interface SiteConfig {
  projects: Project[];
  experience: Experience[];
}

export const siteConfig: SiteConfig = {
  projects: [
    {
      title: "HackKit",
      desc: "Open source, feature-packed hackathon management platform used by over 7000 hackers. Built with Next.js, Tailwind CSS, and TypeScript.",
      link: "https://github.com/acmutsa/hackkit",
      linkTitle: "GitHub",
    },
    {
      title: "ClubKit",
      desc: "Open source, feature-packed club management platform. Built with Next.js, Tailwind CSS, and TypeScript.",
      link: "https://github.com/acmutsa/clubkit",
      linkTitle: "GitHub",
    },
    {
      title: "Other Projects",
      desc: "Contributing to various external repositories and maintaining personal projects.",
      link: "https://github.com/lermatroid",
      linkTitle: "GitHub",
    },
  ],
  experience: [
    {
      title: "Software Engineer @ Google",
      desc: "Building scalable, high performance systems that serve millions of users each day at Google Cloud. Focused on DX, performance, and reliability.",
      period: "Current",
    },
    {
      title: "ACM VP & RowdyHacks Co-Director",
      desc: "Vice-president of ACM UTSA and co-director of RowdyHacks. Co-directed West Texas's largest hackathon with over 600 attendees. Managed large nonprofit organization with over 1000 members.",
      period: "2021-2025",
      link: "https://www.utsa.edu/today/2024/10/story/fall-2024-rowdyhacks.html",
      linkTitle: "News Article",
    },
    {
      title: "Freelance",
      desc: "Freelancing on various projects in software engineering, web design, and more.",
      period: "2019-2025",
    },
    {
      title: "Skills & Technologies",
      desc: "TypeScript/JavaScript • Go • React • Next.js • Node.js • Tailwind CSS • CSS • SQL • GCP • Docker • Kubernetes • Python",
      period: "Ongoing",
    },
  ],
};

export default siteConfig;
