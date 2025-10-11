export interface WorkExperience {
  company: string,
  duration: string;
  position: string;
  logo: string;

  description: string;

  connector: "for" | "at";
  clazz: string;
}
