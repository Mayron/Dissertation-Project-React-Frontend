import { useEffect, useContext, useState } from "react";
import { SignalRContext } from "./providers/signalr-provider";
import { AuthContext } from "./providers/auth-provider";
import { invokeApiHub, postToApi } from "../api";
import React from "react";
import CreatePostPopup from "./common/create-post-popup";
import PostBox from "./post-box";
import ToolBar from "./index/tool-bar";
import Post from "./common/post";
import Loading from "./common/loading";
import { addPendingMessage, getSlug } from "../utils";
import { navigateTo } from "gatsby";

interface IPostsProps {
  fetchCommand: string;
  groupId?: string;
  groupName?: string;
}

const PostsArea: React.FC<IPostsProps> = ({ fetchCommand, groupId, groupName }) => {
  const { token, appUser } = useContext(AuthContext);
  const connection = useContext(SignalRContext);
  const [loading, setLoading] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState<IPostModel[]>([]);
  const [errors, setErrors] = useState<string[] | undefined>();

  const [newPost, setNewPost] = useState<FormValues>({
    title: {},
    body: {},
    group: {
      value: groupId,
    },
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
    if (!token || !connection) return;

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

    postToApi<string>(
      connection,
      token,
      "/posts",
      post,
      (postId) => {
        addPendingMessage(localStorage, { success: true, message: "New post created!" });
        navigateTo(`/g/${post.groupId}/post/${postId}/${getSlug(post.title)}`);
      },
      () => setLoading(true),
    );

    setLoading(true);
  };

  useEffect(() => {
    if (posts.length === 0) {
      invokeApiHub<IPayloadEvent<IPostModel[]>>(
        connection,
        fetchCommand,
        (ev) => {
          if (ev.errors) {
            setErrors(ev.errors);
          } else if (ev.payload && ev.payload.length > 0) {
            setPosts(ev.payload);
          }
          setLoadingPosts(false);
        },
        () => setLoadingPosts(false),
        groupId,
        [],
      );
    }
  }, [connection, posts]);

  let defaultOptions = [];

  if (groupId && groupName) {
    defaultOptions.push({ key: groupId, value: groupId, text: groupName });
  }
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
            defaultOptions={defaultOptions}
            group={newPost.group}
            onCancel={handleNewPostCancel}
            onSubmit={handleNewPostSubmitted}
            loading={loading}
            onChange={handleNewPostChanged}
          />
        )}
      </PostBox>
      <ToolBar />
      {loadingPosts ? (
        <section id="posts">
          <Loading />
        </section>
      ) : (
        <>
          {errors && errors.map((error, key) => <p key={key}>{error}</p>)}
          {posts.length === 0 && <p>No one has posted here yet. Why not be the first?</p>}
          {posts.map((post, key) => {
            const url = `/g/${post.groupId}/post/${post.postId}/${getSlug(post.title)}`;
            return <Post key={key} url={url} post={post} />;
          })}
        </>
      )}
    </>
  );
};

export default PostsArea;
