import React from "react";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  ImageListItem,
  ImageListItemBar,
  Radio,
  RadioGroup,
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
import whiskeyImg from "../images/whiskey.png";
import tequilaImg from "../images/tequila.png";
import vodkaImg from "../images/vodka.png";
import brandyImg from "../images/brandy.png";

import {
  IDrinkSelectorProps,
  IDrinkSelectorState,
  IDrink,
  IAlcSelectorProps,
  IAlcSelectorState,
  IConsumerDetailsProps,
  IConsumerDetailsState,
  ICalcResultProps,
  ICalcResultState,
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

const booze: IDrink[] = [
  { name: "Whiskey", src: whiskeyImg, alcPercent: 40 },
  { name: "Tequila", src: tequilaImg, alcPercent: 40 },
  { name: "Vodka", src: vodkaImg, alcPercent: 40 },
  { name: "Brandy", src: brandyImg, alcPercent: 40 },
];
export default class Calculator extends React.Component {
  state = {
    drinkType: "",
    alcPercent: 0,
    weightKg: 0,
    gender: "",
    isLearner: false,
    requestSent: false,
    serverReply: null, // TODO
  };

  setDrink = (drinkType: string): void => {
    this.setState({ drinkType: drinkType.toLowerCase() });
  };

  setAlcPercent = (alcPercent: number): void => {
    this.setState({ alcPercent });
  };

  enterAlcPercent = (enteredPercent: string): void => {
    const alcPercent = parseFloat(enteredPercent);
    if (alcPercent < 0.5 || alcPercent > 100) {
      alert("Should be between 0.5 and 100");
    } else {
      this.setAlcPercent(alcPercent);
    }
  };

  enterConsumerDetails = (
    enteredWeight: string,
    gender: string,
    learner: string
  ): void => {
    const bodyWeight = parseFloat(enteredWeight);
    const isLearner: boolean = learner === "true";
    if (bodyWeight < 40 || bodyWeight > 140) {
      alert("Body weight should be between 40 and 140kg");
    } else {
      this.setState({ weightKg: bodyWeight });
      this.setState({ gender });
      this.setState({ isLearner });
      const requestData = JSON.stringify({
        drinkType: this.state.drinkType,
        alcPercent: this.state.alcPercent,
        weightKg: bodyWeight,
        gender,
        isLearner,
      });
      const init = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestData,
      };
      this.setState({ requestSent: true });
      fetch("http://localhost:4141/portion", init)
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== "OK") {
            console.log("Data not OK", data);
            this.setState({ requestSent: false });
            alert("Error happened. Please try again.");
          } else {
            this.setState({ serverReply: data });
          }
        })
        .catch((error) => {
          this.setState({ requestSent: false });
          alert("Error happened. Please try again.");
          console.log(error);
        });
    }
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
      case "booze":
        alc = booze;
        break;
    }

    if (this.state.drinkType === "") {
      return <DrinkSelector setDrink={this.setDrink} />;
    } else if (this.state.alcPercent === 0) {
      return (
        <AlcSelector
          alc={alc}
          setAlcPercent={this.setAlcPercent}
          enterAlcPercent={this.enterAlcPercent}
        />
      );
    } else if (this.state.serverReply === null) {
      return (
        <>
          <ConsumerDetails
            enterConsumerDetails={this.enterConsumerDetails}
            loading={this.state.requestSent}
          />
        </>
      );
    } else {
      return <CalcResult data={this.state.serverReply} />;
    }
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
              onClick={() => this.props.setDrink(name)}
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
              onClickCapture={() => this.props.setAlcPercent(alcPercent)}
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
                defaultValue={this.props.alc[0].alcPercent}
              />
            </Grid>
            <Grid item alignItems="stretch" style={{ display: "flex" }}>
              <Button
                variant="contained"
                onClick={() =>
                  this.props.enterAlcPercent(
                    (document.getElementById("input-box") as HTMLInputElement)
                      .value
                  )
                }
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

class ConsumerDetails extends React.Component<
  IConsumerDetailsProps,
  IConsumerDetailsState
> {
  render() {
    return (
      <Grid container mt={5} direction="column">
        <Grid item container justifyContent="center">
          <Typography variant="h3" color="primary.light" align="center">
            Please specify
          </Typography>
        </Grid>
        <Grid item container justifyContent="center" mt={3}>
          <Typography variant="subtitle2" color="primary" align="center">
            Your body weight, kg
          </Typography>
        </Grid>
        <Grid item container justifyContent="center">
          <TextField
            type="number"
            required
            id="input-box"
            label="Required"
            defaultValue={65}
            style={{ marginTop: "1em" }}
          />
        </Grid>
        <Grid item container justifyContent="center" mt={3}>
          <Typography variant="subtitle2" color="primary" align="center">
            Your birth gender
          </Typography>
        </Grid>
        <Grid item container justifyContent="center">
          <RadioGroup
            row
            aria-label="gender"
            defaultValue="notProvided"
            name="gender-options"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="notProvided"
              control={<Radio />}
              label="Other"
            />
          </RadioGroup>
        </Grid>
        <Grid item container justifyContent="center" mt={3}>
          <Typography variant="subtitle2" color="primary" align="center">
            Whether you are a learner driver
          </Typography>
        </Grid>
        <Grid item container justifyContent="center">
          <RadioGroup
            row
            aria-label="isLearner"
            defaultValue="false"
            name="learner-options"
          >
            <FormControlLabel value={false} control={<Radio />} label="No" />
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
          </RadioGroup>
        </Grid>
        <Grid item container justifyContent="center" mt={3}>
          {this.props.loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                this.props.enterConsumerDetails(
                  (document.getElementById("input-box") as HTMLInputElement)
                    .value,
                  (
                    document.querySelector(
                      '[name="gender-options"]:checked'
                    ) as HTMLInputElement
                  ).value,
                  (
                    document.querySelector(
                      '[name="learner-options"]:checked'
                    ) as HTMLInputElement
                  ).value
                );
              }}
            >
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    );
  }
}

class CalcResult extends React.Component<ICalcResultProps, ICalcResultState> {
  private result = this.props.data.result;

  state = {
    quantity: this.result[1].portions[0],
    hours: 0,
  };

  updateLabel = (drinkSize: string, quantity: number): string => {
    let result: string;
    switch (drinkSize) {
      case "pint":
        quantity > 1 ? (result = "pints") : (result = "pint");
        break;
      case "bottle":
        quantity > 1 ? (result = "0.5L bottles") : (result = "0.5L bottle");
        break;
      case "smallBottle":
        quantity > 1 ? (result = "0.33L bottles") : (result = "0.33L bottle");
        break;
      case "smallCan":
        quantity > 1 ? (result = "0.25L cans") : (result = "0.25L can");
        break;
      case "wineGlass":
        quantity > 1 ? (result = "0.18L glasses") : (result = "O.18L glass");
        break;
      case "cocktailGlass":
        quantity > 1 ? (result = "0.25L glasses") : (result = "0.25L glass");
        break;
      case "shot":
        quantity > 1 ? (result = "35.5ml shots") : (result = "35.5ml shot");
        break;
      default:
        quantity > 1 ? (result = "litres") : (result = "litre");
        break;
    }
    return result;
  };

  changeMeasure = (value: string): void => {
    for (const item of this.result) {
      item.drinkSize === value &&
        this.setState({
          quantity: item.portions[this.state.hours],
        });
    }
  };

  decrementHour = (): void => {
    let currentState = this.state.hours;
    if (currentState > 0) {
      this.setState({ hours: --currentState });
    }
    this.changeMeasure(
      (document.querySelector('[name="measures"]:checked') as HTMLInputElement)
        .value
    );
  };

  incrementHour = (): void => {
    let currentState = this.state.hours;
    if (currentState < 24) {
      this.setState({ hours: ++currentState });
    }
    this.changeMeasure(
      (document.querySelector('[name="measures"]:checked') as HTMLInputElement)
        .value
    );
  };

  render() {
    return (
      <Grid container mt={5} alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h3" color="primary.light">
            You can have
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h3"
            color="warning.light"
            style={{ fontWeight: "bold" }}
          >
            {this.state.quantity}
          </Typography>
        </Grid>
        <Grid item>
          <RadioGroup
            row
            defaultValue={this.result[1].drinkSize}
            name="measures"
          >
            {this.result.map(({ drinkSize }: { drinkSize: string }) => (
              <FormControlLabel
                key={drinkSize}
                value={drinkSize}
                control={<Radio />}
                label={this.updateLabel(drinkSize, this.state.quantity)}
                onClick={(e) =>
                  this.changeMeasure((e.target as HTMLInputElement).value)
                }
              />
            ))}
          </RadioGroup>
        </Grid>
        <Grid item>
          <Typography variant="h3" color="primary.light">
            if you drive in
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={this.decrementHour} style={{ fontSize: "2em" }}>
            -
          </Button>
          <Typography
            variant="h3"
            display="inline"
            color="warning.light"
            style={{ fontWeight: "bold" }}
          >
            {this.state.hours}
          </Typography>
          <Button onClick={this.incrementHour} style={{ fontSize: "2em" }}>
            +
          </Button>
          {this.state.hours === 1 ? "hour" : "hours"}
        </Grid>
        <Grid item>
          <Typography variant="h3" color="primary.light">
            after finishing your drink
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
