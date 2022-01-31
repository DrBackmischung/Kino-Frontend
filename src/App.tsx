import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import MenuBar from "./app/components/layouts/MenuBar";
import ChatBot from "./app/components/ChatBot";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MenuBar />
      <ChatBot />
    </QueryClientProvider>
  );
}

export default App;
