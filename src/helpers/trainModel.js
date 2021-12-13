import { fetchCases } from "./fetchCases"
import { loadModel } from "./loadModel"
import scaler from "./scaler"

export const trainModel = async ([cases, lastUpdate]) => {
  // load all at the same time
  const [model, tf, transformToTimesteps] = await Promise.all([
    loadModel(),
    import("@tensorflow/tfjs"),
    import("./model").then(mod => mod.transformToTimesteps),
  ])

  const data = [cases.slice(-10)]
  console.log(cases, { lastUpdate })
  const [X, y] = transformToTimesteps(scaler.transform2(cases), 10, 7)
  console.log(X.shape, y.shape)
  model.summary()

  model.compile({
    optimizer: "rmsprop",
    loss: "meanSquaredError",
    metrics: ["mse"],
  })
  const yReshaped = y.reshape([y.shape[0], y.shape[1]])
  console.log(yReshaped.shape, "shape")

  console.log({ yReshaped })

  const info = await model.fit(X, yReshaped, {
    epochs: 40,
    batchSize: 16,
  })
  console.log("Final accuracy", info.history.mse)

  const a = tf.tensor(scaler.transform(data))
  const prediction = await model.predict(a).array()

  const finalPrediction = scaler.inverseTransform(prediction)
  console.log({ finalPrediction })
  return finalPrediction
}
