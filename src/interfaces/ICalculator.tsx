
export interface IDrinkSelectorProps {
  setDrink: (drinkType: string) => void
}

export interface IDrinkSelectorState {}

export interface IDrink {
  name: string,
  src: string,
  alcPercent: number
}

export interface IAlcSelectorProps {
  alc: IDrink[],
  setAlcPercent: (alcPercent: number) => void,
  enterAlcPercent: (enteredPercent: string) => void
}

export interface IAlcSelectorState {
  myRef: string
}

export interface IConsumerDetailsProps {
  placeholder?: string
}

export interface IConsumerDetailsState {
}
