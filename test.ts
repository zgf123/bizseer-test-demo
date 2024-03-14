const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
type B = {
  a: string
}

interface A extends B {}

type C = B & A
