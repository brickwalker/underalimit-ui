export interface IDrinkSelectorProps {
  setDrink: (drinkType: string) => void;
}

export interface IDrinkSelectorState {}

export interface IDrink {
  name: string;
  src: string;
  alcPercent: number;
}

export interface IAlcSelectorProps {
  alc: IDrink[];
  setAlcPercent: (alcPercent: number) => void;
  enterAlcPercent: (enteredPercent: string) => void;
}

export interface IAlcSelectorState {}

export interface IConsumerDetailsProps {
  enterConsumerDetails: (
    enteredWeight: string,
    gender: string,
    learner: string
  ) => void;
  loading: boolean;
}

export interface IConsumerDetailsState {}

export interface ICalcResultProps {
  data: any;
}

export interface ICalcResultState {}
