import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
};

export default App;
