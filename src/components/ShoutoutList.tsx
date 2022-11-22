import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import Shoutout from "../models/Shoutout";
import {
  addShoutout,
  deleteAShoutout,
  getAllShoutouts,
  getToOrFromNameShoutouts,
  upvoteShoutout,
} from "../services/shoutoutApiService";
import AddShoutoutForm from "./AddShoutoutForm";
import "./ShoutoutList.css";
import SingleShoutout from "./SingleShoutout";

const ShoutoutList = () => {
  const { user } = useContext(AuthContext);

  const name = useParams().name;
  const [allShoutouts, setAllShoutouts] = useState<Shoutout[]>();

  useEffect(() => {
    if (name) {
      getToOrFromNameShoutouts(name).then((res) => setAllShoutouts(res));
    } else {
      getAllShoutouts().then((res) => setAllShoutouts(res));
    }
  }, [name]);

  const updateData = () => {
    if (name) {
      getToOrFromNameShoutouts(name).then((res) => setAllShoutouts(res));
    } else {
      getAllShoutouts().then((res) => setAllShoutouts(res));
    }
  };

  const deleteHandler = (id: string): void => {
    deleteAShoutout(id).then(() => {
      // if no extended challenge:
      // getAllShoutouts().then((res) => setAllShoutouts(res));
      // extended challenge:
      updateData();
    });
  };
  const addShoutoutHandler = (newShoutout: Shoutout): void => {
    addShoutout(newShoutout).then(() => {
      // if no extended challenge:
      // getAllShoutouts().then((res) => setAllShoutouts(res));
      // extended challenge:
      updateData();
    });
  };
  const upvoteHandler = (shoutout: Shoutout): void => {
    upvoteShoutout(shoutout._id!, shoutout).then(() => {
      // if no extended challenge:
      // getAllShoutouts().then((res) => setAllShoutouts(res));
      // extended challenge:
      updateData();
    });
  };
  return (
    <div className="ShoutoutList">
      {name && (
        <Link to="/">
          <p>Back to All Shoutouts</p>
        </Link>
      )}
      {user ? (
        <AddShoutoutForm addSO={addShoutoutHandler} to={name} />
      ) : (
        <div>
          <p>Sign in to leave a shoutout</p>
          <button onClick={signInWithGoogle}>Sign In</button>
        </div>
      )}
      <ul>
        {allShoutouts?.map((item) => (
          <SingleShoutout
            key={item._id}
            shoutout={item}
            deleteSO={deleteHandler}
            upvoteSO={upvoteHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default ShoutoutList;
