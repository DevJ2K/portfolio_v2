import { defineStore } from 'pinia'

export const useModalStore = defineStore("modal", {
  state: () => ({
    contactIsOpen: true,
  }),
  actions: {
    toggleContactModal() {
      this.contactIsOpen = !this.contactIsOpen;
    }
  }
})
