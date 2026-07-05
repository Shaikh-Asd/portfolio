import { lazy } from "react";

export const About = lazy(() =>
  import("@/components/sections/About").then((m) => ({ default: m.About }))
);
export const Services = lazy(() =>
  import("@/components/sections/Services").then((m) => ({ default: m.Services }))
);
export const Skills = lazy(() =>
  import("@/components/sections/Skills").then((m) => ({ default: m.Skills }))
);
export const Projects = lazy(() =>
  import("@/components/sections/Projects").then((m) => ({ default: m.Projects }))
);
export const WhyWorkWithMe = lazy(() =>
  import("@/components/sections/WhyWorkWithMe").then((m) => ({ default: m.WhyWorkWithMe }))
);
export const Process = lazy(() =>
  import("@/components/sections/Process").then((m) => ({ default: m.Process }))
);
export const Testimonials = lazy(() =>
  import("@/components/sections/Testimonials").then((m) => ({ default: m.Testimonials }))
);
export const FAQ = lazy(() =>
  import("@/components/sections/FAQ").then((m) => ({ default: m.FAQ }))
);
export const Contact = lazy(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.Contact }))
);
