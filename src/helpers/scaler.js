const [MIN, MAX] = [840, 9151]

// type TransformInput = number[][][]

exports.transform = input =>
  input.map(_ =>
    _.map(__ => __.map(number => Math.max(0, number - MIN) / (MAX - MIN)))
  )

exports.transform2 = input =>
  input.map(_ => _.map(number => Math.max(0, number - MIN) / (MAX - MIN)))

// type InverseTransformInput = number[][]

exports.inverseTransform = input =>
  input.map(_ => _.map(number => number * (MAX - MIN) + MIN))
