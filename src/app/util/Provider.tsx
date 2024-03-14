"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // Perbaikan: tambahkan kurung kurawal pada impor

export default function Provider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} /> {/* Perbaikan: perbaiki penulisan prop initialIsOpen */}
            {children}
        </QueryClientProvider>
    );
}
