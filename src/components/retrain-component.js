import React, { useState } from "react"
import { useQuery } from "react-query"
import { Button, Text } from "@geist-ui/react"
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
  return (
    <>
      <Text h5> cases next days:</Text>
      <p>
        {data[0].map(cases => (
          <span>{Math.round(cases)} </span>
        ))}
      </p>
    </>
  )
}
export const RetrainComponent = ({ covidData }) => {
  const [retrain, setRetrain] = useState(false)

  if (!retrain)
    return <Button onClick={() => setRetrain(true)}>Retrain model</Button>
  else return <DataComponent covidData={covidData} />
}
