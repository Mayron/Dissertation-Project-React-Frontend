import React, { useContext, useEffect, useState } from "react";
import Post from "../../common/post";
import { RouteComponentProps, useMatch } from "@reach/router";
import Comment from "../../common/comment";
import ProfilePic from "../../../images/placeholder-profile-pic.svg";
import { GroupContext } from "../../providers/group-provider";
import { SignalRContext } from "../../providers/signalr-provider";
import { invokeApiHub, postToApi } from "../../../api";
import Loading from "../../common/loading";
import { getTimeAgoUtc, formatStatistic } from "../../../utils";
import { AuthContext } from "../../providers/auth-provider";
import TimeAgo from "react-timeago";
import { Icons } from "../../icons";

interface ICommentModel {
  commentId: string;
  authorDisplayName: string;
  when: string;
  body: string;
  votes: number;
}

interface INewCommentModel {
  body: string;
  postId: string;
}

const ViewPostView: React.FC<RouteComponentProps> = () => {
  const { groupId } = useContext(GroupContext);
  const connection = useContext(SignalRContext);
  const { token, appUser } = useContext(AuthContext);

  const match = useMatch("/g/:groupId/post/:postId/*");
  const postId = match?.postId as string;

  const [post, setPost] = useState<IPostModel | null>(null);
  const [comments, setComments] = useState<ICommentModel[]>([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);

  const [newComment, setNewComment] = useState("");

  const handleCommentChanged = (value: string) => {
    setNewComment(value);
  };

  const upVote = (commentId: string) => {
    // if (!newComment || !appUser) return;
    // (async () => {
    //   const config = await getAuthConfig(token);
    //   const model: IChangeVoteInputModel = {
    //     postId: postId,
    //     vote: 1,
    //     commentId: commentId,
    //   };
    //   // await api.post<IApiResponse>("/posts/vote", model, config).then((response) => {
    //   //   if (!(response.status === 202 && response.data.isValid)) {
    //   //     toast.error(response.data.message);
    //   //   }
    //   // });
    // })();
  };

  const handleCommentSubmitted = () => {
    if (!newComment || !appUser || !connection || !token) return;

    const comment: INewCommentModel = {
      body: newComment,
      postId: postId,
    };

    postToApi<string>(
      connection,
      token,
      "/posts/comment",
      comment,
      (commentId) => {
        const addedComment: ICommentModel = {
          commentId: commentId,
          authorDisplayName: appUser?.displayName,
          body: newComment,
          votes: 1,
          when: "just now",
        };

        setNewComment("");
        setSubmittingComment(false);
        setComments([...comments, addedComment]);
      },
      () => setSubmittingComment(false),
    );

    setSubmittingComment(true);
  };

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
          <Post
            post={post}
            commentValue={newComment}
            onCommentSubmitted={handleCommentSubmitted}
            onCommentChanged={handleCommentChanged}
            submitting={submittingComment}
          />
          <div className="comment-toolbar" role="toolbar">
            <div className="row-10">
              <h4>Comments ({comments.length})</h4>
              {/* {comments.length > 0 && <SearchBox placeholder="Search comments" />} */}
            </div>

            {/* {comments.length > 0 && (
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
            )} */}
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
                      <Comment key={key} body={comment.body}>
                        <img src={ProfilePic} alt="profile" />

                        <div className="post-user">
                          <a className="user">{comment.authorDisplayName}</a>
                          <p>
                            <TimeAgo date={getTimeAgoUtc(post.when)} />
                          </p>
                        </div>
                        <Icons.Heart
                          text={formatStatistic(post.votes)}
                          onClick={() => upVote(comment.commentId)}
                        />
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
