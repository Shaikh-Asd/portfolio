import { useState } from "react";
import { m } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { projects } from "@/lib/data";
import { projectThemes } from "@/lib/projectThemes";
import { Button } from "@/components/ui";
import { Section } from "@/components/Section";

const INITIAL_PROJECTS = 4;

function getInitials(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function ProjectCard({ project }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const theme = projectThemes[project.theme] ?? projectThemes.indigo;
  const panelBackground = isDark ? theme.coverDark : theme.cover;
  const initials = getInitials(project.title);

  return (
    <article className="project-item group">
      <div
        className="project-item-panel"
        style={{ background: panelBackground }}
        aria-hidden
      >
        <div className="project-item-panel-glow" />
        <div className="project-item-panel-grid" />
        <span className="project-item-monogram">{initials}</span>
      </div>

      <div className="project-item-body">
        <div className="flex items-start justify-between gap-3">
          <h3 className="project-item-title">{project.title}</h3>
          {project.url && (
            <span className="project-item-icon" aria-hidden>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>

        <p className="project-item-desc">{project.description}</p>

        <div className="project-item-tags">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-item-cta"
          >
            Open project
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const hasMoreProjects = projects.length > INITIAL_PROJECTS;
  const visibleProjects = showAll
    ? projects
    : projects.slice(0, INITIAL_PROJECTS);

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
      <div className="projects-grid grid gap-5 sm:gap-6 md:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <m.div
            key={project.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay:
                showAll && index >= INITIAL_PROJECTS
                  ? (index - INITIAL_PROJECTS) * 0.05
                  : Math.min(index * 0.06, 0.24),
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            <ProjectCard project={project} />
          </m.div>
        ))}
      </div>

      {hasMoreProjects && (
        <div className="mt-8 flex justify-center sm:mt-10">
          <Button
            variant="secondary"
            onClick={() => setShowAll((prev) => !prev)}
            aria-expanded={showAll}
          >
            {showAll ? (
              <>
                View less
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                View more projects
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </Section>
  );
}
