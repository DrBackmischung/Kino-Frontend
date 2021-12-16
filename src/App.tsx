import React, { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import TestPage from "./app/pages/TestPage";
import MenuBar from "./app/components/layouts/MenuBar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MenuBar />
    </QueryClientProvider>
  );
}

export default App;
