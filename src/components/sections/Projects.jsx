import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { projects } from "@/lib/data";
import { projectThemes } from "@/lib/projectThemes";
import { fadeUp } from "@/lib/animations";
import { GlassCard } from "@/components/ui";
import { Section, AnimatedGrid } from "@/components/Section";

function ProjectCard({ project }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const theme = projectThemes[project.theme];
  const coverBackground = theme
    ? isDark
      ? theme.coverDark
      : theme.cover
    : projectThemes.indigo.cover;

  const cover = (
    <div
      className="project-cover"
      data-theme={project.theme}
      style={{ background: coverBackground }}
    >
      <div className="project-cover-glow" aria-hidden />
      <div className="project-cover-grid" aria-hidden />
      <div className="project-cover-inner flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className={`project-badge project-badge--${project.theme}`}>
            Case Study
          </span>
          {project.url && (
            <span className="project-link-icon">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>
        <h3 className="project-cover-title">{project.title}</h3>
      </div>
    </div>
  );

  return (
    <GlassCard hover={false} spotlight={false} className="group h-full overflow-hidden p-0">
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {cover}
        </a>
      ) : (
        cover
      )}

      <div className="p-5 sm:p-6">
        <p className="mb-5 text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className={`project-tag project-tag--${project.theme}`}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      band
      header={{
        label: "Featured Projects",
        title: "Recent Work & Case Studies",
        description:
          "A selection of projects showcasing full-stack development across web, mobile, and enterprise systems.",
      }}
    >
      <AnimatedGrid className="projects-grid grid gap-5 sm:gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <m.div key={project.title} variants={fadeUp}>
            <ProjectCard project={project} />
          </m.div>
        ))}
      </AnimatedGrid>
    </Section>
  );
}
