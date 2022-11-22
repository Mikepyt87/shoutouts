import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { storage } from "../firebaseConfig";

import AuthContext from "../context/AuthContext";
import Shoutout from "../models/Shoutout";
import "./AddShoutoutForm.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props {
  to?: string;
  addSO: (so: Shoutout) => void;
}

const AddShoutoutForm = ({ addSO, to }: Props) => {
  const { user } = useContext(AuthContext);
  const name = useParams().name || "";
  const [toInput, setToInput] = useState(to || "");
  const [fromInput, setFromInput] = useState(user?.displayName || "");
  const [messageInput, setMessageInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    const newShoutout: Shoutout = {
      to: toInput,
      from: fromInput,
      text: messageInput,
      upvotes: 0,
      profilePic: user?.photoURL!,
    };
    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0]; // Here is the file we need
      const storageRef = ref(storage, "pictures/" + file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          newShoutout.image = url;
          addSO(newShoutout);
        });
      });
    } else {
      addSO(newShoutout);
    }

    // clear inputs:
    setToInput("");
    setFromInput("");
    setMessageInput("");
  };
  useEffect(() => {
    if (name) {
      setToInput(name);
    } else {
      setToInput("");
    }
  }, [name]);
  return (
    <form className="AddShoutoutForm" onSubmit={submitHandler}>
      <div className="input-label">
        <label htmlFor="to">To:</label>
        <input
          type="text"
          name="to"
          id="to"
          value={toInput}
          onChange={(e) => setToInput(e.target.value)}
          disabled={to ? true : false}
        />
      </div>
      <div className="input-label">
        <label htmlFor="from">From:</label>
        <input
          type="text"
          name="from"
          id="from"
          value={fromInput}
          disabled={!!user}
          onChange={(e) => setFromInput(e.target.value)}
        />
      </div>
      <textarea
        name="message"
        id="message"
        cols={30}
        rows={10}
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      ></textarea>
      <input type="file" ref={fileInputRef} />

      <button>Add Shoutout</button>
    </form>
  );
};

export default AddShoutoutForm;
