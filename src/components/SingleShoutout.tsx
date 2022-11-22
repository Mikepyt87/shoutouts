import { Link } from "react-router-dom";
import Shoutout from "../models/Shoutout";
import "./SingleShoutout.css";

interface Props {
  shoutout: Shoutout;
  deleteSO: (s: string) => void;
  upvoteSO: (so: Shoutout) => void;
}

const SingleShoutout = ({ shoutout, deleteSO, upvoteSO }: Props) => {
  const upvoteHandler2 = () => {
    // make deep copy of original shoutout
    const updatedSO = { ...shoutout };
    // make your change(s)
    updatedSO.upvotes++;
    // ...then call API
    upvoteSO(updatedSO);
  };

  return (
    <li className="SingleShoutout">
      <p>
        To: <Link to={`/user/${shoutout.to}`}>{shoutout.to}</Link>
      </p>
      <p>
        - From <img src={shoutout.profilePic} alt={shoutout.from} />{" "}
        <Link to={`/user/${shoutout.from}`}>{shoutout.from}</Link>
      </p>
      <p>"{shoutout.text}"</p>
      {shoutout.image && (
        <img
          src={shoutout.image}
          alt={shoutout.text}
          className="shoutout-img"
        />
      )}

      <div className="like-div">
        <p>{shoutout.upvotes}</p>
        <button onClick={upvoteHandler2}>like</button>
      </div>
      <button className="delete" onClick={() => deleteSO(shoutout._id!)}>
        x
      </button>
    </li>
  );
};

export default SingleShoutout;
