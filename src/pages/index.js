import * as React from "react"
import { useQuery } from "react-query"

import Layout from "../components/layout"

import { trainModel, loadModel } from "../helpers/asyncFetch"

const DataComponent = () => {
  const { isLoading, isError, data, error } = useQuery("covid-data", trainModel)
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // We can assume by this point that `isSuccess === true`
  return <p>{JSON.stringify(data, null, 2)}</p>
}

loadModel()

const IndexPage = () => {
  return (
    <Layout>
      <p>hola gente</p>
      <DataComponent />
    </Layout>
  )
}

export default IndexPage
