import { Comment } from "../typings";

export const fetchComments = async (tweetId: string) => {
  const rest = await fetch(`/api/getComments?tweetId=${tweetId}`);

  const comments: Comment[] = await rest.json();

  return comments;
};
