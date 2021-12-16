import React from "react";

import Navbar from "./app/components/navbar"
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();


export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <Navbar/>
             </div>
        </QueryClientProvider>
    );
}