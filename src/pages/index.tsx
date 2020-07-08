import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
import PostBox from "../components/post-box";
import ToolBar from "../components/index/tool-bar";
import { RouteComponentProps } from "@reach/router";
import Post from "../components/common/post";
import CreatePostPopup from "../components/common/create-post-popup";
import api, { getAuthConfig } from "../api";
import Marked from "marked";
import slugify from "slugify";
import { AuthContext } from "../components/auth-provider";
import { SignalRContext } from "../components/signalr-provider";

const IndexPage: React.FC<RouteComponentProps> = () => {
  const user = useContext(AuthContext);
  const connection = useContext(SignalRContext);

  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState<IPostModel[]>([]);

  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

  const handleNewPostChanged = (name: string, value: string) => {
    setNewPost({ ...newPost, [name]: value });
  };

  const handleNewPostCancel = () => {
    setShowPopup(false);
  };

  const handleNewPostSubmitted = () => {
    if (!user) return;

    const post: INewPostModel = {
      url: `/u/${slugify(user.displayName)}/post/${slugify(newPost.title)}`,
      author: user.displayName,
      body: newPost.body,
      header: newPost.title,
    };

    (async () => {
      const config = await getAuthConfig();
      await api.post("/posts", post, config).then((response) => {
        console.log(response);
      });
    })();

    setShowPopup(false);
    setNewPost({ title: "", body: "" });
  };

  useEffect(() => {
    debugger;
    const data = connection?.send("FetchNewsFeed");
    console.log(data);
    // TODO: No longer get posts via API - use hub!
    // (async () => {
    //   await api.get<IPostModel[]>("/posts").then((response) => {
    //     const newPosts = response.data;
    //     setPosts(newPosts);
    //   });
    // })();
  }, [user]);

  return (
    <Layout id="index">
      <PostBox
        displayName={user?.displayName}
        togglePopup={setShowPopup}
        showPopup={showPopup}
      >
        {user && (
          <CreatePostPopup
            displayName={user.displayName}
            title={newPost.title}
            body={newPost.body}
            onCancel={handleNewPostCancel}
            onPost={handleNewPostSubmitted}
            onChange={handleNewPostChanged}
          />
        )}
      </PostBox>
      <ToolBar />
      {posts.map((post, key) => (
        <Post key={key} url={post.url} author={post.author} when={post.when}>
          {post.header && <h4>{post.header}</h4>}
          {post.body && (
            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: Marked.parse(post.body) }}
            ></div>
          )}
        </Post>
      ))}
    </Layout>
  );
};

export default IndexPage;
