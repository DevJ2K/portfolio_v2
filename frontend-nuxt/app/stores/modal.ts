import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    contactIsOpen: false,
  }),
  actions: {
    toggleContactModal() {
      this.contactIsOpen = !this.contactIsOpen;
    },
  },
});
