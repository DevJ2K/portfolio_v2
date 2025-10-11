import { defineStore } from "pinia";
import type { Education } from "~/types/Education";
import type { Project } from "~/types/Project";
import type { Skill } from "~/types/Skill";
import type { WorkExperience } from "~/types/WorkExperience";

export const useMyDataStore = defineStore("mydata", {
  state: () => ({
    projects: [] as Project[],
    educations: [] as Education[],
    skills: [] as Skill[],
    experiences: [] as WorkExperience[],
    isLoading: false,
    isAlreadyLoaded: false,
    error: null as string | null
  }),
  actions: {
    async init() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch('/local-data.json');

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();

        this.projects = data.projects || [];
        this.educations = data.educations || [];
        this.skills = data.skills || [];
        this.experiences = data.experiences || [];
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erreur inconnue';
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        this.isLoading = false;
        this.isAlreadyLoaded = true;
      }
    },
  },
});

