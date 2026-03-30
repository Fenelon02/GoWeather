import { QueryClient } from "@tanstack/react-query";

function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 60 * 1000, 
            },
        },
    });
}

let BrowserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
    const isServer = typeof window === "undefined";
    if (isServer) {
        return createQueryClient();
    }

    if (!BrowserQueryClient) {
        BrowserQueryClient = createQueryClient();
    }

    return BrowserQueryClient;
}
