import { BaseSyntheticEvent } from "react";

export interface IDrinkSelectorProps {
  setDrink: (e: BaseSyntheticEvent) => void;
}

export interface IDrinkSelectorState {}

export interface IDrink {
  name: string,
  src: string,
  alcPercent: number
}

export interface IAlcSelectorProps {
  alc: IDrink[]
}

export interface IAlcSelectorState {}
