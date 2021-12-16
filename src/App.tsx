import React, { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import TestPage from "./app/pages/TestPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TestPage />
    </QueryClientProvider>
  );
}

export default App;
