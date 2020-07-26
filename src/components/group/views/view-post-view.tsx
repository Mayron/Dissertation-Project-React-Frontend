import React, { useContext, useEffect, useState } from "react";
import Post from "../../common/post";
import SearchBox from "../../common/search-box";
import Filter from "../../common/filter";
import { RouteComponentProps, useMatch } from "@reach/router";
import Comment from "../../common/comment";
import ProfilePic from "../../../images/placeholder-profile-pic.svg";
import { GroupContext } from "../../providers/group-provider";
import { SignalRContext } from "../../providers/signalr-provider";
import { invokeApiHub } from "../../../api";
import Loading from "../../common/loading";
import { getTimeAgoUtc } from "../../../utils";

interface ICommentModel {
  authorDisplayName: string;
  when: string;
  body: string;
  votes: number;
}

const ViewPostView: React.FC<RouteComponentProps> = () => {
  const { groupId } = useContext(GroupContext);
  const connection = useContext(SignalRContext);

  const match = useMatch("/g/:groupId/post/:postId/*");
  const postId = match?.postId as string;

  const [post, setPost] = useState<IPostModel | null>(null);
  const [comments, setComments] = useState<ICommentModel[]>([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    if (connection && loadingPost) {
      invokeApiHub<IPayloadEvent<IPostModel[]>>(
        connection,
        "FetchGroupPost",
        (ev) => {
          if (ev.payload) {
            setPost(ev.payload[0]);
          }
          setLoadingPost(false);
        },
        () => setLoadingPost(false),
        groupId,
        postId,
      );
    }

    if (connection && loadingComments) {
      invokeApiHub<IPayloadEvent<ICommentModel[]>>(
        connection,
        "FetchComments",
        (ev) => {
          if (ev.errors) {
          } else if (ev.payload) {
            debugger;
            setComments(ev.payload);
          }
          setLoadingComments(false);
        },
        () => setLoadingComments(false),
        postId,
      );
    }
  }, [connection, post, comments]);

  return (
    <>
      {loadingPost && <Loading />}
      {!loadingPost && !post && <div id="unavailable">Post unavailable</div>}
      {!loadingPost && post && (
        <>
          <Post post={post} includeCommentBox>
            <h4>This is the Title of this post! Why do they all do it?</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque
              elit arcu, et fringilla mauris dignissim sit amet. Maecenas facilisis
              dignissim erat. Praesent faucibus facilisis tortor vel ornare. Sed lacinia
              eu urna nec condimentum. Suspendisse molestie mauris ac ligula molestie
              malesuada. Duis sed tellus ipsum.
            </p>
          </Post>
          <div className="comment-toolbar" role="toolbar">
            <div className="row-10">
              <h4>Comments ({comments.length})</h4>
              {comments.length > 0 && <SearchBox placeholder="Search comments" />}
            </div>

            {comments.length > 0 && (
              <Filter
                label="Sort by"
                tooltip="Sort by"
                selected={0}
                items={[
                  "Most replies",
                  "Least replies",
                  "Most upvoted",
                  "Least upvoted",
                  "Newest",
                  "Oldest",
                ]}
              />
            )}
          </div>
          <section id="comments">
            {loadingComments && <Loading />}
            {!loadingComments && (
              <>
                {comments.length === 0 ? (
                  <p>No comments yet. Why not be the first?</p>
                ) : (
                  <>
                    {comments.map((comment, key) => (
                      <Comment key={key} body={comment.body} votes={comment.votes}>
                        <img src={ProfilePic} alt="profile" />
                        <div className="post-user">
                          <a className="user">{comment.authorDisplayName}</a>
                          <p>{getTimeAgoUtc(comment.when)}</p>
                        </div>
                      </Comment>
                    ))}
                  </>
                )}
              </>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default ViewPostView;
