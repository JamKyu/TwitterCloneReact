import React, { useEffect, useState } from "react";
import { Comment, CommentBody, Tweet } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid";
import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxOpen, setCommentBoxOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentToast = toast.loading("Posting Reply...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || "Unknown User",
      profileImg:
        session?.user?.image ||
        "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
    };

    const result = await fetch(`/api/addComments`, {
      body: JSON.stringify(comment),
      method: "POST",
    });

    toast.success("Reply Posted", {
      id: commentToast,
    });

    setInput("");
    setCommentBoxOpen(false);
    refreshComments();
  };

  return (
    <div key={tweet._id} className="flex flex-col border-y border-zinc-600">
      <div className="flex space-x-3 p-5">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg}
          alt=""
        />
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-zinc-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()} ·
            </p>
            <TimeAgo
              className="text-sm text-zinc-500"
              date={tweet._createdAt}
            />
          </div>
          <p className="pt-1">{tweet.text}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>
      <div className="flex mb-4 justify-around">
        <div
          className="flex cursor-pointer items-center space-x-3 text-zinc-500"
          onClick={() => session && setCommentBoxOpen(!commentBoxOpen)}
        >
          <ChatAlt2Icon className="h-5 w-5" />
          {comments.length > 0 ? <p>{comments.length}</p> : ""}
        </div>
        <div className="flex cursor-not-allowed items-center space-x-3 text-zinc-500">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div
          className="flex cursor-pointer items-center space-x-3 text-zinc-500"
          onClick={() => session && setLiked(!liked)}
        >
          {!liked ? (
            <HeartIcon className="h-5 w-5" />
          ) : (
            <>
              <HeartSolidIcon className="h-5 w-5 text-red-700" />
              <p>1</p>
            </>
          )}
        </div>
        <div className="flex cursor-not-allowed items-center space-x-3 text-zinc-500">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxOpen && (
        <form className="my-4 mx-6 flex space-x-3" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-zinc-800 p-2 outline-none"
            type="text"
            placeholder="Tweet your reply"
          />
          <button
            disabled={!input}
            type="submit"
            className="text-twitter disabled:text-zinc-600"
          >
            Reply
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="mb-2 px-12 max-h-44 space-y-5 overflow-y-scroll scrollbar-hide border-t border-zinc-600 py-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-zinc-500" />
              <img
                src={comment.profileImg}
                className="mt-2 h-7 w-7 object-cover rounded-full"
                alt=""
              />
              <div className="">
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-zinc-500 lg:inline">
                    @{comment.username.replace(/\s+/g, "").toLowerCase()} ·
                  </p>
                  <TimeAgo
                    className="text-sm text-zinc-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
