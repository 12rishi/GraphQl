import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import CompleteRegister from "./pages/CompleteRegister";
export const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/complete-register" element={<CompleteRegister />} />
        </Routes>
      </ApolloProvider>
    </>
  );
}

export default App;
