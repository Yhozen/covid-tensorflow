import { fetchCases } from "./fetchCases"
import { loadModel } from "./loadModel"
import scaler from "./scaler"

export const predictWithModel = async ([cases, lastUpdate]) => {
  // load all at the same time
  const [model, tf] = await Promise.all([
    loadModel(),
    import("@tensorflow/tfjs"),
  ])

  const data = [cases.slice(-10)]

  model.compile({
    optimizer: "rmsprop",
    loss: "meanSquaredError",
    metrics: ["mse"],
  })

  const a = tf.tensor(scaler.transform(data))
  const prediction = await model.predict(a).array()

  const finalPrediction = scaler.inverseTransform(prediction)
  return finalPrediction
}
