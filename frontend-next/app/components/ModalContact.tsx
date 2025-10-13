import { useState } from "react";
import toast from "react-hot-toast";
import { LuSend } from "react-icons/lu";
import { MdClose } from "react-icons/md";

const ModalContact = () => {
  const closeModal = () => {
    (document.getElementById("modal_contact") as HTMLDialogElement)?.close();
  };

  const [contactUs, setContactUs] = useState({
    email: "",
    title: "",
    message: "",
  });

  const [contactUsMissingField, setContactUsMissingField] = useState({
    email: false,
    title: false,
    message: false,
  });

  const sendMessage = async () => {
    contactUsMissingField.email = false;
    contactUsMissingField.title = false;
    contactUsMissingField.message = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactUs.email.trim() === "" || !emailRegex.test(contactUs.email)) {
      contactUsMissingField.email = true;
    }
    if (contactUs.title.trim() === "") {
      contactUsMissingField.title = true;
    }
    if (contactUs.message.trim() === "") {
      contactUsMissingField.message = true;
    }
    if (
      contactUsMissingField.email ||
      contactUsMissingField.title ||
      contactUsMissingField.message
    ) {
      setContactUsMissingField({ ...contactUsMissingField });
      return;
    }
    setContactUsMissingField({ email: false, title: false, message: false });
    (document.getElementById("modal_contact") as HTMLDialogElement)?.close();

    const response = await fetch("/api/contact/send", {
      method: "POST",
      body: JSON.stringify({
        email: contactUs.email.trim(),
        title: contactUs.title.trim(),
        message: contactUs.message.trim(),
      }),
    });
    if (!response.ok) {
      toast.error(
        "An error occurred while sending the message. Please try again later."
      );
      return;
    }

    contactUs.email = "";
    contactUs.title = "";
    contactUs.message = "";
    setContactUs({ ...contactUs });

    toast.success(
      "Thank you for your message! I'll get back to you as soon as possible."
    );
  };

  return (
    <dialog id="modal_contact" className="modal">
      <div className="modal-box bg-background text-foreground rounded-xl">
        <div className="flex items-start justify-between w-full gap-2">
          <div className="flex gap-2.5 justify-center items-center">
            <div>
              <h3 className="text-body font-semibold">Contact</h3>
              <p className="text-sm opacity-70">
                Feel free to send me a message - I&apos;ll get back to you as
                soon as possible.
              </p>
            </div>
          </div>
          <MdClose
            className="cursor-pointer text-black hover:opacity-70"
            onClick={closeModal}
          />
        </div>

        <div className="h-px bg-black/15 my-4">&nbsp;</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0">
            <label htmlFor="email" className="contact-label">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={contactUs.email}
              onChange={(e) =>
                setContactUs({ ...contactUs, email: e.target.value })
              }
              className={`contact-input ${
                contactUsMissingField.email ? "contact-missing-field" : ""
              }`}
              maxLength={70}
              required
            />
          </div>

          <div className="flex flex-col gap-0">
            <label htmlFor="title" className="contact-label">
              Title
            </label>
            <input
              id="title"
              value={contactUs.title}
              onChange={(e) =>
                setContactUs({ ...contactUs, title: e.target.value })
              }
              type="text"
              className={`contact-input ${
                contactUsMissingField.title ? "contact-missing-field" : ""
              }`}
              maxLength={100}
              required
            />
          </div>
          <div className="flex flex-col gap-0">
            <label htmlFor="message" className="contact-label">
              Message
            </label>
            <textarea
              id="message"
              value={contactUs.message}
              onChange={(e) =>
                setContactUs({ ...contactUs, message: e.target.value })
              }
              className={`contact-input ${
                contactUsMissingField.message ? "contact-missing-field" : ""
              }`}
              rows={5}
              maxLength={1024}
              required
            />
          </div>
        </div>
        <div className="h-px bg-black/15 my-4">&nbsp;</div>
        <button
          className="border rounded-full px-4 py-2 text-sm float-right flex items-center gap-2 w-fit bg-black text-white border-black cursor-pointer hover:bg-gray-800 hover:border-gray-800"
          onClick={sendMessage}
        >
          <LuSend />
          Send
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ModalContact;
