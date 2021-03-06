import { Flex } from "@chakra-ui/layout";
import { CreatePost } from "..";
import { useState, useEffect } from "react";
import { Post } from "../../comps/";
import { firestore } from "../../services/firebaseConfig";

const PostFeeds = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    firestore
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  return (
    <Flex
      flexDirection="column"
      flexWrap="nowrap"
      alignItems="center"
      justifyContent="center"
    >
      <CreatePost />
      {posts.map(({ id, post }) => {
        return (
          <Post
            key={id}
            id={id}
            userId={post.userId}
            likes={post.likes}
            timestamp={post.timestamp}
            imageUrl={post.imageUrl}
            userName={post.userName}
            photoUrL={post.photoUrl}
            caption={post.caption}
            comments={post.comments}
          />
        );
      })}
    </Flex>
  );
};

export default PostFeeds;
