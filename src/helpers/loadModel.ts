export const loadModel = async () => {
  const tf = await import("@tensorflow/tfjs")
  const model = await tf.loadLayersModel("./model/model.json")

  return model
}
