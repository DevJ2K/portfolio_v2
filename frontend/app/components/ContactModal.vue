<template>
  <UModal v-model:open="isModalOpen" class="text-foreground" title="Contact" description="Feel free to send me a message - I'll get back to you as soon as possible.">
      <template #body>
        <div class="flex flex-col gap-4">


              <div class="flex flex-col gap-0">
                <label for="email" class="contact-label">Email</label>
                <input
                  id="email"
                  v-model="contactUs.email"
                  type="text"
                  class="contact-input"
                  :class="{ 'contact-missing-field': contactUsMissingField.email }"
                  maxlength="50"
                  required
                >
              </div>

              <div class="flex flex-col gap-0">
                <label for="title" class="contact-label">Titre</label>
                <input
                  id="title"
                  v-model="contactUs.title"
                  type="text"
                  class="contact-input"
                  :class="{ 'contact-missing-field': contactUsMissingField.title }"
                  maxlength="100"
                  required
                >
              </div>
              <div class="flex flex-col gap-0">
                <label for="message" class="contact-label">Message</label>
                <textarea
                  id="message"
                  v-model="contactUs.message"
                  class="contact-input"
                  :class="{ 'contact-missing-field': contactUsMissingField.message }"
                  rows="5"
                  maxlength="1024"
                  required
                />
              </div>
            </div>
      </template>

      <template #footer>
        <div class="w-full text-right">
          <button
          class="text-body cursor-pointer bg-black text-white px-4 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-300"
          @click="sendMessage">
          Send
        </button>
        </div>
      </template>
    </UModal>
</template>

<script lang="ts" setup>

const modalStore = useModalStore()

const { contactIsOpen: isModalOpen } = storeToRefs(modalStore)

const contactUs = ref({
  email: "",
  title: "",
  message: ""
});

const contactUsMissingField = ref({
  email: false,
  title: false,
  message: false,
});

const sendMessage = () => {
  contactUsMissingField.value.email = false;
  contactUsMissingField.value.title = false;
  contactUsMissingField.value.message = false;


  if (contactUs.value.email === "") {
    contactUsMissingField.value.email = true;
  }
  if (contactUs.value.title === "") {
    contactUsMissingField.value.title = true;
  }
  if (contactUs.value.message === "") {
    contactUsMissingField.value.message = true;
  }
  if (contactUs.value.title === "" || contactUs.value.message === "" || contactUs.value.email === "") {
    return;
  }
  modalStore.toggleContactModal();
  console.log(
    "Contact us form submitted:",
    contactUs.value.email,
    contactUs.value.title,
    contactUs.value.message
  );

  // Process message sending logic here

  contactUs.value.title = "";
  contactUs.value.message = "";
}

</script>

<style scoped>
</style>
