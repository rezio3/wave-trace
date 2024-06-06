import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { UserDetails } from "../../types";
import "./pricing.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import PricingTable from "./Table";
import { priceCalculating } from "./priceCalculating";
import { prices } from "./prices";

const Pricing = (props: {
  isUserLoggedIn: boolean;
  handleBackButton?: () => void;
  user?: UserDetails;
}) => {
  const handleBackButton = () => {
    if (props.handleBackButton) {
      props.handleBackButton();
    }
  };

  const [version, setVersion] = React.useState({
    value: "free-version",
    isFree: true,
  });
  const [modifyVersionCheckbox, setModifyVersionCheckbox] =
    React.useState(false);
  // const [modOneMinVersionSlider, setModOneMinVersionSlider] = React.useState(1);
  // const [modExtendedVersionSlider, setModExtendedVersionSlider] =
  //   React.useState(2);
  const [extendCheck, setExtendCheck] = React.useState(false);
  const [modExtendedVersionCheck, setModExtendedVersionCheck] =
    React.useState(false);

  const [pricesCalc, setPricesCalc] = React.useState({
    versionPrice: 0,
    modifyVersionPrice: 0,
    extendedVersion: 0,
    modExtendedVersion: 0,
    totalPrice: 0,
  });

  const versionCheckboxHandler = (event: SelectChangeEvent) => {
    const price = !version.isFree ? 0 : prices.oneMinVersion;
    setVersion({
      value: event.target.value,
      isFree: !version.isFree,
    });
    setPricesCalc({
      ...pricesCalc,
      versionPrice: price,
      totalPrice: price,
    });
    // priceCalculating(pricesCalc, setPricesCalc);
  };
  const modifyVersionCheckboxHandler = () => {
    const price = modifyVersionCheckbox ? 0 : 5;
    const versionPriceReduce = modifyVersionCheckbox ? -5 : 5;
    setModifyVersionCheckbox(!modifyVersionCheckbox);
    setPricesCalc({
      ...pricesCalc,
      versionPrice: pricesCalc.versionPrice - versionPriceReduce,
      modifyVersionPrice: price,
    });
  };
  const modVersionSliderHandler = (e: Event, value: number | number[]) => {
    const modSliderValue = Array.isArray(value) ? value[0] : value;
    const price = modSliderValue * prices.modOneMinVersion;
    const versionPriceReduce =
      prices.oneMinVersion - price <= 0 ? 0 : prices.oneMinVersion - price;
    setPricesCalc({
      ...pricesCalc,
      versionPrice: versionPriceReduce,
      modifyVersionPrice: price,
    });
  };
  const extendCheckboxHandler = () => {
    setExtendCheck(!extendCheck);
    // priceCalculating(pricesCalc, setPricesCalc);
  };
  // const modExtendedVersionCheckHandler = () => {
  //   setModExtendedVersionCheck(!modExtendedVersionCheck);
  //   priceCalculating(pricesCalc, setPricesCalc);
  // };
  // const modExtendedSliderHandler = (e: Event, value: number | number[]) => {
  //   const modSliderValue = Array.isArray(value) ? value[0] : value;
  //   const price = modSliderValue * prices.extendedVersion;
  //   setPricesCalc({
  //     ...pricesCalc,
  //     modExtendedVersion: price,
  //   });
  //   priceCalculating(pricesCalc, setPricesCalc);
  // };
  return (
    <div
      className={
        !props.isUserLoggedIn ? "container w-100 mt-5 p-0" : "container w-100"
      }
    >
      <div className="p-5 w-100 glass-container d-flex">
        {!props.isUserLoggedIn ? (
          <Button
            variant="text"
            className="mb-4"
            name="back"
            onClick={handleBackButton}
          >
            <ArrowBackIosIcon />
            Back
          </Button>
        ) : null}
        <div className="w-50">
          <h4 className="pb-4">Pricing</h4>
          <PricingTable />
        </div>
        <div className="pricing-calc-container">
          <h4 className="pb-4">Pricing calculator</h4>
          <div className="w-100 d-flex flex-column align-items-start gap-3">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <FormControl>
                <InputLabel id="demo-simple-select-label">Version</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Version"
                  value={version.value}
                  onChange={versionCheckboxHandler}
                >
                  <MenuItem value="free-version">
                    Free 1-minute version with watermark
                  </MenuItem>
                  <MenuItem value="paid-version">
                    1-minute version without watermark
                  </MenuItem>
                </Select>
              </FormControl>
              <span className="price-span">${pricesCalc.versionPrice}</span>
            </div>
            {version.isFree ? null : (
              <div className="w-100 d-flex flex-column align-items-start gap-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={modifyVersionCheckbox}
                      onChange={modifyVersionCheckboxHandler}
                    />
                  }
                  label="Modify the sample version"
                />
                {modifyVersionCheckbox ? (
                  <div className="w-100">
                    <div className="w-100 d-flex justify-content-between align-items-center">
                      <div className="w-50">
                        <Slider
                          aria-label="modification-quantity"
                          defaultValue={1}
                          valueLabelDisplay="auto"
                          shiftStep={1}
                          step={1}
                          marks
                          min={1}
                          max={12}
                          className="ms-2"
                          name="mod-one-min"
                          onChange={modVersionSliderHandler}
                        />
                      </div>
                      <span className="price-span">
                        ${pricesCalc.modifyVersionPrice}
                      </span>
                    </div>
                    <span className="text-secondary">
                      Quantity of modifications
                    </span>
                  </div>
                ) : null}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={extendCheck}
                      onChange={extendCheckboxHandler}
                    />
                  }
                  label="Extend your music"
                />
                {extendCheck ? (
                  <div className="w-100">
                    <div className="w-100 d-flex justify-content-between align-items-center">
                      <div className="w-50">
                        <Slider
                          aria-label="modification-quantity"
                          defaultValue={2}
                          valueLabelDisplay="auto"
                          shiftStep={1}
                          step={1}
                          marks
                          min={2}
                          max={10}
                          className="ms-2"
                          name="mod-extended"
                          // onChange={modExtendedSliderHandler}
                        />
                      </div>
                      <span className="price-span">$39</span>
                    </div>
                    <span className="text-secondary">
                      Length of music extension (in minutes).
                    </span>
                  </div>
                ) : null}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={modExtendedVersionCheck}
                      // onChange={modExtendedVersionCheckHandler}
                    />
                  }
                  label="Modify the extended version"
                />
              </div>
            )}
            <span>Total Price: </span>
            <span className="price-span">${pricesCalc.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

// NAPRAWIĆ CHECKBOXY !!!! VALUE MA BYĆ TAKIE JAK W STATE
