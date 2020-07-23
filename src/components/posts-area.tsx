import { useEffect, useContext, useState } from "react";
import { SignalRContext } from "./signalr-provider";
import { AuthContext } from "./auth-provider";
import slugify from "slugify";
import api, { getAuthConfig, invokeApiHub } from "../api";
import React from "react";
import CreatePostPopup from "./common/create-post-popup";
import PostBox from "./post-box";
import ToolBar from "./index/tool-bar";
import Post from "./common/post";
import Marked from "marked";
import { toast } from "react-toastify";
import Loading from "./common/loading";
import { addPendingMessage, createRoute } from "../utils";
import { navigateTo } from "gatsby";

interface IPostsProps {
  fetchCommand: string;
}

const PostsArea: React.FC<IPostsProps> = ({ fetchCommand }) => {
  const { token, appUser, checkingAuthState } = useContext(AuthContext);
  const connection = useContext(SignalRContext);
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState<IPostModel[]>([]);
  const [errors, setErrors] = useState<string[] | undefined>();

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
    setNewPost({
      title: {},
      body: {},
      group: {},
    });
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
          invokeApiHub<ISagaMessageEmittedEvent>(
            connection,
            "Subscribe",
            (ev) => {
              const { success, message, args } = ev;

              if (success && args) {
                addPendingMessage(localStorage, { success, message });
                navigateTo(
                  `/g/${post.groupId}/post/${args.postId}/${slugify(post.title, {
                    lower: true,
                  })}`,
                );
              } else if (success) {
                toast.success(message);
                setNewPost({
                  title: {},
                  body: {},
                  group: {},
                });
                setShowPopup(false);
                setLoading(false);
              } else {
                toast.error(message);
              }
            },
            undefined,
            response.data.message,
          );
        } else {
          toast.error(response.data.message);
        }
      });
    })();

    setLoading(true);
  };

  useEffect(() => {
    if (!checkingAuthState) {
      invokeApiHub<IPayloadEvent<IPostModel[]>>(connection, fetchCommand, (ev) => {
        if (ev.errors) {
          setErrors(ev.errors);
        } else if (ev.payload) {
          setPosts(ev.payload);
        }
      });
    }
  }, [checkingAuthState]);

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
            loading={loading}
            onChange={handleNewPostChanged}
          />
        )}
      </PostBox>
      <ToolBar />
      {checkingAuthState ? (
        <Loading />
      ) : (
        <>
          {errors && errors.map((error, key) => <p key={key}>{error}</p>)}
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
      )}
    </>
  );
};

export default PostsArea;
