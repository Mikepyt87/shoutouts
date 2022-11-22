import { link } from "fs";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Shoutout from "../models/Shoutout";
import { getToOrFromNameShoutouts } from "../services/shoutoutApiService";
import "./Me.css";

const Me = () => {
  const { user } = useContext(AuthContext);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getToOrFromNameShoutouts(user.displayName!).then((response) => {
        console.log(response);

        setShoutouts(response);
      });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="Me">
      <ul>
        {shoutouts.map((shoutout) => (
          <li key={shoutout._id}>
            <p>To: {shoutout.to}</p>
            <p>From: {shoutout.from}</p>
            <img src={shoutout.profilePic} alt={shoutout.from} />
            <p>{shoutout.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return <div className="Me">Me works</div>;
};

export default Me;
