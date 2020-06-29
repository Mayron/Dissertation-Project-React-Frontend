import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import PostBox from "../components/post-box";
import ToolBar from "../components/index/tool-bar";
import { RouteComponentProps } from "@reach/router";
import Post from "../components/common/post";
import CreatePostPopup from "../components/common/create-post-popup";
import { getProtected } from "../api/test";

const IndexPage: React.FC<RouteComponentProps> = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getProtected();
  }, []);

  return (
    <Layout id="index">
      <PostBox togglePopup={setShowPopup} showPopup={showPopup}>
        <CreatePostPopup togglePopup={setShowPopup} />
      </PostBox>
      <ToolBar />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post">
        <h4>This is the Title of this post! Why do they all do it?</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque elit
          arcu, et fringilla mauris dignissim sit amet. Maecenas facilisis dignissim erat.
          Praesent faucibus facilisis tortor vel ornare. Sed lacinia eu urna nec
          condimentum. Suspendisse molestie mauris ac ligula molestie malesuada. Duis sed
          tellus ipsum.
        </p>
      </Post>
      <Post url="/u/mayron/post/this-is-the-title-of-the-post">
        <h4>Hello. I'm new and want to introduct myself!</h4>
        <p>How are you aLL/??</p>
        <p>
          I have nothing to contribute... Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Aspernatur aliquam itaque libero error alias magnam
          reprehenderit! Sapiente ipsam enim nis?
        </p>
      </Post>
      <Post url="/u/mayron/post/this-is-the-title-of-the-post">
        <h4>How do I install X on my laptop?</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cumque sed
          reprehenderit necessitatibus perferendis! Aliquid corrupti tempora sit aliquam.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit, debitis.
          Tempora dolor nemo quia corporis accusamus molestiae magnam minus deleniti
          corrupti ipsa beatae, odio nobis obcaecati vel aliquid omnis harum?
        </p>
        <p>
          Non magnam ullam deserunt fugiat at voluptate, perspiciatis illum necessitatibus
          iusto ab dolore placeat, quo nobis? Dolores expedita explicabo aspernatur neque
          quam! Dolorem, aliquid. Ea, nisi odit officia molestiae numquam reiciendis unde,
          quia aperiam ullam ab tempora dolore nemo dolorem! Ad alias nulla aut?
        </p>
      </Post>
    </Layout>
  );
};

export default IndexPage;
