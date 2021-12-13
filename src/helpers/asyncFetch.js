const DataFrame = require("dataframe-js").DataFrame
const tf = require("@tensorflow/tfjs")
const scaler = require("./scaler")
const { transformToTimesteps } = require("./model")

const fetchCases = async () => {
  const df = await DataFrame.fromCSV(
    "https://covid.ourworldindata.org/data/owid-covid-data.csv"
  )

  const filtered = df.filter(row => row.get("iso_code") === "CHL")

  const lastUpdate = filtered.select("date").toArray().slice(-1)
  const cases = filtered.select("new_cases").toArray()

  return [cases, lastUpdate]
}

const loadModel = async () => {
  const model = await tf.loadLayersModel("./model/model.json")

  return model
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
exports.trainModel = async () => {
  const [[cases, lastUpdate], model] = await Promise.all([
    fetchCases(),
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
  console.log(finalPrediction)
}

exports.loadModel = loadModel
exports.fetchCases = fetchCases
