import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
const getAllPost = gql`
  {
    allPost {
      id
      title
      description
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(getAllPost);
  const [fetchProduct, { data: PostData }] = useLazyQuery(getAllPost);
  const { state, dispatch } = useContext(AuthContext);
  const handleDispatch = () => {
    dispatch({ type: "LOGGED_IN", payload: "Rishi" });
  };

  if (loading) return <h1>loading.........</h1>;
  return (
    <div>
      {data.allPost.map((datas) => (
        <>
          <h1>{datas.id}</h1>
          <h2>{datas.title}</h2>
          <h3>{datas.description}</h3>
        </>
      ))}
      <button onClick={() => fetchProduct()}>fetch more</button>
      {JSON.stringify(PostData)}
      <button onClick={() => handleDispatch()}>
        CLick for change userName
      </button>
      {state.user}
    </div>
  );
};

export default Home;
