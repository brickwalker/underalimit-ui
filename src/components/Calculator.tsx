import React, { BaseSyntheticEvent } from "react";
import {
  Grid,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import cocktail from "../images/cocktail.png";
import pint from "../images/pint.png";
import shot from "../images/shot.png";
import wine from "../images/wine.png";
import {
  IDrinkSelectorProps,
  IDrinkSelectorState,
} from "../interfaces/ICalculator";

const drinks = [
  { name: "Pints", src: pint },
  { name: "Wine", src: wine },
  { name: "Cocktails", src: cocktail },
  { name: "Booze", src: shot },
];

export default class Calculator extends React.Component {
  state = {
    drinkType: "",
    alcPercent: 0,
    weightKg: 0,
    gender: "",
    isLearner: false,
  };

  setDrink = (e: BaseSyntheticEvent): void => {
    e.target.className === "MuiImageListItem-img"
      ? this.setState({ drinkType: e.target.alt.toLowerCase() })
      : this.setState({ drinkType: e.target.innerText.toLowerCase() });
  };

  render() {
    return this.state.drinkType === "" ? (
      <DrinkSelector setDrink={this.setDrink} />
    ) : (
      <AlcSelector />
    );
  }
}

class DrinkSelector extends React.Component<
  IDrinkSelectorProps,
  IDrinkSelectorState
> {
  render() {
    return (
      <Grid container mt={5} justifyContent="center">
        <Grid item>
          <Typography variant="h3" color="primary.light">
            Whatcha drinkin'?
          </Typography>
        </Grid>
        <Grid item container mt={5} justifyContent="center" spacing={2}>
          {drinks.map(({ name, src }) => (
            <Grid
              item
              key={name}
              style={{ maxWidth: "15em" }}
              onClick={this.props.setDrink}
            >
              <ImageListItem>
                <img src={src} alt={name} />
                <ImageListItemBar title={name} position="bottom" />
              </ImageListItem>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

class AlcSelector extends React.Component {
  render() {
    return "This is alc selection";
  }
}
