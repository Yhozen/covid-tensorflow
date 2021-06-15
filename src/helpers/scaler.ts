const [MIN, MAX] = [840, 9151]

type TransformInput = number[][][]

export const transform = (input: TransformInput) =>
  input.map(_ =>
    _.map(__ => __.map(number => Math.max(0, number - MIN) / (MAX - MIN)))
  )

export const transform2 = (input: number[][]) =>
  input.map(_ => _.map(number => Math.max(0, number - MIN) / (MAX - MIN)))

type InverseTransformInput = number[][]

export const inverseTransform = (input: InverseTransformInput) =>
  input.map(_ => _.map(number => number * (MAX - MIN) + MIN))
