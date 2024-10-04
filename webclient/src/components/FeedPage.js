import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api";
import { fetchPosts, addPostItem, fetchAccountDetail } from "../store/actions";
import MainHeader from "./MainHeader";
import css from "../styles/FeedPage.module.css";

/*
state = [
  postItem, postItem, ...
]
postItem = {
  _id: String,
  content: String,
  author: String,
  createdAt: String,
}
*/

const PostItem = ({ post }) => {
  const renderContent = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className={css.post_link}
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <div className={css.post}>
      <div className={css.post_author}>{post.author}</div>
      <div className={css.post_content}>{renderContent(post.content)}</div>
      <div className={css.post_timestamp}>{post.createdAt}</div>
    </div>
  );
};

function FeedPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const isLogin = useSelector((state) => state.auth.isLogin);
  const acc_id = useSelector((state) => state.auth.account_id);
  const acc_detail = useSelector((state) => state.auth.account_detail);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    // console.log("FeedPage useEffect");
    // Goto Login page if no account is logged in
    if (!isLogin) {
      navigate("/login");
    }
    if (!acc_detail) {
      dispatch(fetchAccountDetail(acc_id));
    }
    dispatch(fetchPosts());
  }, [isLogin, acc_id, acc_detail, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content) {
      let newPost = {
        content,
        author: `${acc_detail.firstname} ${acc_detail.lastname}`,
      };

      try {
        const response = await createPost(newPost);
        // console.log(response.data);
        dispatch(addPostItem(response.data));
        setContent("");
      } catch (error) {
        // console.log(error.response.status);
        // console.log(error.message);
        // console.log(error.response.data.error);
        setErrMessage("An error occurred while signing up.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Feed</title>
      </Helmet>
      <div className={css.wrapper}>
        <MainHeader></MainHeader>
        <div className={css.container}>
          <div className={css.post_form}>
            <form action="#" method="post" onSubmit={handleSubmit}>
              <div>
                <p className={css.err_text}>{errMessage}</p>
              </div>
              <textarea
                name="post-content"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <button type="submit">Post</button>
            </form>
          </div>
          {posts.length > 0 ? (
            <>
              <div className={css.news_feed}>
                {posts.map((post, index) => {
                  // console.log(index);
                  return <PostItem key={index} post={post} />;
                })}
              </div>
            </>
          ) : (
            <>
              <p>There is currently no Post to show.</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default FeedPage;
