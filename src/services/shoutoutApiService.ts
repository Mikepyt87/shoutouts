import axios from "axios";
import Shoutout from "../models/Shoutout";

const baseUrl: string = process.env.REACT_APP_API_BASE_URL || "";

export const getAllShoutouts = (): Promise<Shoutout[]> => {
  return axios.get(`${baseUrl}/shoutouts`).then((res) => res.data);
};

export const getToOrFromNameShoutouts = (name: string): Promise<Shoutout[]> => {
  return axios.get(`${baseUrl}/shoutouts/${name}`).then((res) => res.data);
};

export const deleteAShoutout = (id: string): Promise<void> => {
  return axios.delete(`${baseUrl}/shoutouts/${id}`).then((res) => res.data);
};

export const addShoutout = (newSO: Shoutout): Promise<Shoutout> => {
  return axios.post(`${baseUrl}/shoutouts`, newSO).then((res) => res.data);
};

export const upvoteShoutout = (
  id: string,
  shoutout: Shoutout
): Promise<Shoutout> => {
  return axios
    .put(`${baseUrl}/shoutouts/${id}`, shoutout)
    .then((res) => res.data);
};
