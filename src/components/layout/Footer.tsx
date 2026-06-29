import { personalInfo } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-background/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-foreground">
              {personalInfo.name}
            </p>
            <p className="mt-1 text-sm text-muted">{personalInfo.title}</p>
            <p className="mt-2 text-xs text-accent">
              {personalInfo.availability}
            </p>
          </div>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
