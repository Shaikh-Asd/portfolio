import { LazyMotion, domMax } from "framer-motion";

export function MotionProvider({ children }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
