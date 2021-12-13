import React, { useState } from "react"
import { useQuery } from "react-query"
import { Button, Text } from "@geist-ui/react"
import { predictWithModel } from "../helpers/predictWithModel"

const DataComponent = ({ covidData }) => {
  const { isLoading, isError, data, error } = useQuery(
    "covid-train-model",
    () => predictWithModel(covidData)
  )
  if (isLoading) {
    return <span>Predicting...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  console.log({ data })

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
export const TrainComponent = ({ covidData }) => {
  const [retrain, setRetrain] = useState(false)

  if (!retrain)
    return (
      <Button onClick={() => setRetrain(true)}>Predict with old model</Button>
    )
  else return <DataComponent covidData={covidData} />
}
