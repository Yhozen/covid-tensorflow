import React, { useState } from "react"
import { useQuery } from "react-query"
import { Button } from "@geist-ui/react"
import { trainModel } from "../helpers/trainModel"

const DataComponent = ({ covidData }) => {
  const { isLoading, isError, data, error } = useQuery(
    "covid-train-model",
    () => trainModel(covidData)
  )
  if (isLoading) {
    return <span>Training model...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // We can assume by this point that `isSuccess === true`
  return <p>{JSON.stringify(data, null, 2)}</p>
}
export const RetrainComponent = ({ covidData }) => {
  const [retrain, setRetrain] = useState(false)

  if (!retrain)
    return <Button onClick={() => setRetrain(true)}>Retrain model</Button>
  else return <DataComponent covidData={covidData} />
}
