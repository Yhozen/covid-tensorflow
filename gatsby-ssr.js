/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { GeistProvider, CssBaseline } from "@geist-ui/react"

// Create a client
const queryClient = new QueryClient()

export const wrapRootElement = ({ element }) => (
  <QueryClientProvider client={queryClient}>
    <GeistProvider>
      <CssBaseline />
      {element}
    </GeistProvider>
  </QueryClientProvider>
)
