const tf = require("@tensorflow/tfjs")
// def transform_to_timesteps(data, seq_length = 3, seq_out_length = 1):
//   dataX = []
//   dataY = []
//   for i in range(0, len(data) - seq_length - (seq_out_length - 1), 1):
//     seq_in = data[i:i + seq_length]
//     seq_out = data[i + seq_length : i + seq_length + seq_out_length]
//     dataX.append([[*data] for  data in seq_in])

//     dataY.append(seq_out)
//   X = np.array(dataX)
//   return X, numpy.array(dataY)

exports.transformToTimesteps = (data, seq_length = 10, seq_out_length = 7) => {
  const dataX = []
  const dataY = []
  for (let i = 0; i < data.length - seq_length - (seq_out_length - 1); i++) {
    const seq_in = data.slice(i, i + seq_length)
    const seq_out = data.slice(i + seq_length, i + seq_length + seq_out_length)
    dataX.push(seq_in)
    dataY.push(seq_out)
  }
  return [tf.tensor(dataX), tf.tensor(dataY)]
}
