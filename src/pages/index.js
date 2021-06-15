import * as React from "react"
import { useQuery } from "react-query"

import Layout from "../components/layout"

import DataFrame from "dataframe-js"
import * as tf from "@tensorflow/tfjs"
import * as scaler from "../helpers/scaler"
import { transformToTimesteps } from "../helpers/model"

const asyncFetch = async () => {
  // const df = await DataFrame.fromCSV(
  //   "https://covid.ourworldindata.org/data/owid-covid-data.csv"
  // )
  const df = await DataFrame.fromCSV(
    "http://localhost:8000/owid-covid-data.csv"
  )
  const filtered = df.filter(row => row.get("iso_code") === "CHL")

  const lastUpdate = filtered.select("date").toArray().slice(-1)
  const cases = filtered.select("new_cases").toArray()

  return [cases, lastUpdate]
}

const data = [
  [
    [8920.0],
    [7690.0],
    [6928.0],
    [5533.0],
    [5351.0],
    [7709.0],
    [7942.0],
    [7573.0],
    [7481.0],
    [6190.0],
  ],
]
const trainModel = async () => {
  const [[cases, lastUpdate], model] = await Promise.all([
    asyncFetch(),
    loadModel(),
  ])
  console.log(cases)
  const [X, y] = transformToTimesteps(scaler.transform2(cases), 10, 7)
  console.log(X.shape, y.shape)
  model.summary()
  model.compile({
    optimizer: "rmsprop",
    loss: "meanSquaredError",
    metrics: ["mse"],
  })
  const yReshaped = y.reshape([y.shape[0], y.shape[1]])
  console.log(yReshaped.shape, "holashape")

  const info = await model.fit(X, yReshaped, {
    epochs: 40,
    batchSize: 16,
  })
  console.log("Final accuracy", info.history.mse)

  const a = tf.tensor(scaler.transform(data))
  const prediction = await model.predict(a).array()

  const finalPrediction = scaler.inverseTransform(prediction)
  console.log("aloooooo", finalPrediction)
}
function onBatchEnd(batch, logs) {
  console.log("Accuracy", logs.mse)
}

const loadModel = async () => {
  const model = await tf.loadLayersModel("./model/model.json")

  const a = tf.tensor(scaler.transform(data))
  const prediction = await model.predict(a).array()

  scaler.inverseTransform(prediction)
  return model
}

// const trainModel = (model, X, y) => {
//   // Train for 5 epochs with batch size of 32.
//   model
//     .fit(X, y, {
//       epochs: 40,
//       batchSize: 16,
//       callbacks: { onBatchEnd },
//     })
//     .then(info => {
//       console.log("Final accuracy", info.history.acc)
//     })
// }

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
