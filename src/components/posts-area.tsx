import { useEffect, useContext, useState } from "react";
import { SignalRContext } from "./signalr-provider";
import { AuthContext } from "./auth-provider";
import slugify from "slugify";
import api, { getAuthConfig } from "../api";
import React from "react";
import CreatePostPopup from "./common/create-post-popup";
import PostBox from "./post-box";
import ToolBar from "./index/tool-bar";
import Post from "./common/post";
import Marked from "marked";
import { toast, ToastOptions } from "react-toastify";

interface IPostsProps {
  fetchCommand: string;
  groupId?: string;
}

const PostsArea: React.FC<IPostsProps> = ({ fetchCommand, groupId = "" }) => {
  const { token, appUser } = useContext(AuthContext);
  const connection = useContext(SignalRContext);

  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState<IPostModel[]>([]);

  const [newPost, setNewPost] = useState<FormValues>({
    title: {},
    body: {},
    group: {},
  });

  const handleNewPostChanged = (name: string, value: string) => {
    setNewPost({ ...newPost, [name]: { value } });
  };

  const handleNewPostCancel = () => {
    setShowPopup(false);
  };

  const handleNewPostSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    if (!newPost.group.value) {
      const nextState = { ...newPost };
      nextState.group.error = "Please select a group to post to.";
      setNewPost(nextState);
      return;
    }

    if (!newPost.title.value) {
      const nextState = { ...newPost };
      nextState.title.error = "Please give your post a title.";
      setNewPost(nextState);
      return;
    }

    const post: INewPostModel = {
      title: newPost.title.value,
      body: newPost.body.value,
      groupId: newPost.group.value,
    };

    (async () => {
      const config = await getAuthConfig(token);
      await api.post<IApiResponse>("/posts", post, config).then((response) => {
        if (response.status === 202 && response.data.isValid) {
          const token = response.data.message;
          connection?.invoke("Subscribe", token, "PostAddedCallback");

          connection?.on("PostAddedCallback", (event) => {
            const { success, message } = event;

            if (success) {
              setShowPopup(false);
              setNewPost({ title: {}, body: {}, group: {} });
            }

            if (success) {
              toast.success(message);
            } else {
              toast.error(message);
            }
          });
        } else {
          toast.error(response.data.message);
        }
      });
    })();
  };

  useEffect(() => {
    connection?.invoke(fetchCommand);
    connection?.on("NewsFeedUpdate", (ev) => {
      setPosts(ev);
    });
  }, [token]);

  return (
    <>
      <PostBox
        displayName={appUser?.displayName}
        togglePopup={setShowPopup}
        showPopup={showPopup}
      >
        {appUser && (
          <CreatePostPopup
            displayName={appUser.displayName}
            title={newPost.title}
            body={newPost.body}
            selectGroup
            group={newPost.group}
            onCancel={handleNewPostCancel}
            onSubmit={handleNewPostSubmitted}
            onChange={handleNewPostChanged}
          />
        )}
      </PostBox>
      <ToolBar />
      {posts.map((post, key) => {
        const url = `/g/${post.groupId}/post/${post.id}/${slugify(post.title)}`;
        return (
          <Post key={key} url={url} author={post.author} when={post.when}>
            {post.title && <h4>{post.title}</h4>}
            {post.body && (
              <div
                className="markdown"
                dangerouslySetInnerHTML={{ __html: Marked.parse(post.body) }}
              ></div>
            )}
          </Post>
        );
      })}
    </>
  );
};

export default PostsArea;
