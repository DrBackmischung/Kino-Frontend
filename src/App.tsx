import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import MenuBar from "./app/components/layouts/MenuBar";
import ChatBot from "./app/components/ChatBot";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MenuBar />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
