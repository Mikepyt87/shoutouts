export default interface Shoutout {
  _id?: string;
  to: string;
  from: string;
  text: string;
  upvotes: number;
  profilePic: string;
  image?: string;
}
