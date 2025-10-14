import {
  RiFirebaseLine,
  RiJavaLine,
  RiNextjsLine,
  RiReactjsLine,
} from "react-icons/ri";
import {
  SiC,
  SiCplusplus,
  SiFastapi,
  SiNuxtdotjs,
  SiTailwindcss,
} from "react-icons/si";
import {
  TbBrandDocker,
  TbBrandPython,
  TbBrandSupabase,
  TbBrandSwift,
  TbBrandTypescript,
} from "react-icons/tb";

export const ICON_MAP: { [key: string]: React.ReactNode } = {
  python: <TbBrandPython />,
  nuxt: <SiNuxtdotjs />,
  java: <RiJavaLine />,
  swift: <TbBrandSwift />,
  next: <RiNextjsLine />,
  supabase: <TbBrandSupabase />,
  firebase: <RiFirebaseLine />,
  docker: <TbBrandDocker />,
  fastapi: <SiFastapi />,
  typescript: <TbBrandTypescript />,
  "c++": <SiCplusplus />,
  c: <SiC />,
  tailwindcss: <SiTailwindcss />,
  react: <RiReactjsLine />,
  "react native": <RiReactjsLine />,
};
