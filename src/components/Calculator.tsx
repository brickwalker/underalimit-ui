import React, { BaseSyntheticEvent } from "react";
import {
  Button,
  Grid,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
} from "@mui/material";
import cocktailImg from "../images/cocktail.png";
import pintImg from "../images/pint.png";
import shotImg from "../images/shot.png";
import wineImg from "../images/wine.png";
import guinnessImg from "../images/guinness.png";
import smithwicksImg from "../images/smithwicks.png";
import heinekenImg from "../images/heineken.png";
import bulmersImg from "../images/bulmers.png";
import redImg from "../images/red.png";
import whiteImg from "../images/white.png";
import portImg from "../images/port.png";
import gintonicImg from "../images/gintonic.png";
import wgingeraleImg from "../images/wgingerale.png";
import mojitoImg from "../images/mojito.png";
import spritzImg from "../images/aperolspritz.png";

import {
  IDrinkSelectorProps,
  IDrinkSelectorState,
  IDrink,
  IAlcSelectorProps,
  IAlcSelectorState,
} from "../interfaces/ICalculator";

const drinks = [
  { name: "Pints", src: pintImg },
  { name: "Wine", src: wineImg },
  { name: "Cocktails", src: cocktailImg },
  { name: "Booze", src: shotImg },
];

const alcPlaceholder: IDrink[] = [{ name: "", src: "", alcPercent: 0 }];

const pints: IDrink[] = [
  { name: "Guinness", src: guinnessImg, alcPercent: 4.2 },
  { name: "Smithwicks", src: smithwicksImg, alcPercent: 4.5 },
  { name: "Heineken", src: heinekenImg, alcPercent: 5 },
  { name: "Bulmers", src: bulmersImg, alcPercent: 4.5 },
];

const wines: IDrink[] = [
  { name: "Red Wine", src: redImg, alcPercent: 13.5 },
  { name: "White Wine", src: whiteImg, alcPercent: 13 },
  { name: "Port Wine", src: portImg, alcPercent: 19.5 },
];

const cocktails: IDrink[] = [
  { name: "Gin & Tonic", src: gintonicImg, alcPercent: 10 },
  { name: "Whiskey Ginger Ale", src: wgingeraleImg, alcPercent: 5 },
  { name: "Mojito", src: mojitoImg, alcPercent: 13 },
  { name: "Aperol Spritz", src: spritzImg, alcPercent: 11 },
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
    let alc = alcPlaceholder;
    switch (this.state.drinkType) {
      case "pints":
        alc = pints;
        break;
      case "wine":
        alc = wines;
        break;
        case "cocktails":
          alc = cocktails;
          break;
      default:
        break;
    }
    return this.state.drinkType === "" ? (
      <DrinkSelector setDrink={this.setDrink} />
    ) : (
      <AlcSelector alc={alc} />
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

class AlcSelector extends React.Component<
  IAlcSelectorProps,
  IAlcSelectorState
> {
  render() {
    return (
      <Grid container mt={5} justifyContent="center">
        <Grid item>
          <Typography variant="h3" color="primary.light">
            Choose your drink...
          </Typography>
        </Grid>
        <Grid item container mt={5} justifyContent="center" spacing={2}>
          {this.props.alc.map(({ name, src, alcPercent }) => (
            <Grid
              item
              key={name}
              style={{ maxWidth: "15em" }}
              // onClick={this.props.setDrink}
            >
              <ImageListItem>
                <img src={src} alt={name} />
                <ImageListItemBar
                  title={name}
                  position="bottom"
                  actionIcon={
                    <Typography variant="subtitle2" color="common.white">
                      {alcPercent}%
                    </Typography>
                  }
                  style={{ paddingRight: "0.5em" }}
                />
              </ImageListItem>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={10} mt={5}>
          <Typography variant="h4" color="primary.light" align="center">
            ...or enter alcohol percentage
          </Typography>
          <Typography variant="subtitle1" color="primary.light" align="center">
            (eg {this.props.alc[0].alcPercent} for {this.props.alc[0].name})
          </Typography>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item>
              <TextField
                type="number"
                required
                id="input-box"
                label="Required"
                value={this.props.alc[0].alcPercent}
              />
            </Grid>
            <Grid item alignItems="stretch" style={{ display: "flex" }}>
              <Button variant="contained">Submit</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
