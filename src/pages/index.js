import React from "react"
import { useQuery } from "react-query"

import { Card, Grid, Text } from "@geist-ui/react"
import { fetchCases } from "../helpers/fetchCases"
import { RetrainComponent } from "../components/retrain-component"
import { TrainComponent } from "../components/train-component"

const IndexPage = () => {
  const { isLoading, isError, data, error } = useQuery("covid-data", fetchCases)

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "10px",
        flexDirection: "column",
      }}
    >
      <Text h1>RNN covid cases predictor</Text>
      <Grid xs={8}>
        <Card shadow>
          <h4>Predict using an old model</h4>
          <p>
            This will predict covid cases in Chile using a model trained on June
            2021, and the latest data available on{" "}
            <a href="https://covid.ourworldindata.org/">ourworldindata</a>
          </p>
          {isLoading && <p>Loading data...</p>}
          {!isLoading && <TrainComponent covidData={data} />}
        </Card>
      </Grid>
      <Grid xs={8}>
        <Card shadow>
          <h4>Train a model with new data and predict</h4>
          <p>
            This will retrain the old model with current data and then it will
            predict next week for Chile
          </p>
          {isLoading && <p>Loading data...</p>}

          {!isLoading && <RetrainComponent covidData={data} />}
        </Card>
      </Grid>
    </div>
  )
}

export default IndexPage
