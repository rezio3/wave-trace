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
import {
  HandleVersionCheckbox,
  handleModifyVersionCheckboxHandler,
  handleModVersionSlider,
  handleExtendCheckbox,
  handleExtendedSlider,
  handleModExtendedVersionCheck,
} from "./priceCalculating";

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
  const [checkboxes, setCheckboxes] = React.useState({
    modifyVersionCheckbox: false,
    extendCheck: false,
    modExtendedVersionCheck: false,
  });
  const { modifyVersionCheckbox, extendCheck, modExtendedVersionCheck } =
    checkboxes;

  const [pricesCalc, setPricesCalc] = React.useState({
    versionPrice: 0,
    modifyVersionPrice: 0,
    extendedVersion: 0,
    modExtendedVersion: 0,
  });
  const [totalPrice, setTotalPrice] = React.useState(0);

  const versionCheckboxHandler = (event: SelectChangeEvent) => {
    HandleVersionCheckbox(
      event,
      version,
      setVersion,
      pricesCalc,
      setPricesCalc,
      setCheckboxes
    );
  };

  const modifyVersionCheckboxHandler = () => {
    handleModifyVersionCheckboxHandler(
      modifyVersionCheckbox,
      checkboxes,
      setCheckboxes,
      pricesCalc,
      setPricesCalc
    );
  };
  const modVersionSliderHandler = (e: Event, value: number | number[]) => {
    handleModVersionSlider(value, pricesCalc, setPricesCalc);
  };
  const extendCheckboxHandler = () => {
    handleExtendCheckbox(
      extendCheck,
      checkboxes,
      setCheckboxes,
      pricesCalc,
      setPricesCalc
    );
  };
  const extendedSliderHandler = (e: Event, value: number | number[]) => {
    handleExtendedSlider(value, pricesCalc, setPricesCalc);
  };
  const modExtendedVersionCheckHandler = () => {
    handleModExtendedVersionCheck(
      modExtendedVersionCheck,
      checkboxes,
      setCheckboxes,
      pricesCalc,
      setPricesCalc
    );
  };
  React.useEffect(() => {
    const price = Object.values(pricesCalc).reduce(
      (total, value) => total + value,
      0
    );
    setTotalPrice(price);
  }, [pricesCalc]);
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
          <h4 className="pb-4">Calculator</h4>
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
                          onChange={extendedSliderHandler}
                        />
                      </div>
                      <span className="price-span">
                        ${pricesCalc.extendedVersion}
                      </span>
                    </div>
                    <span className="text-secondary">
                      Length of music extension (in minutes).
                    </span>
                  </div>
                ) : null}
                {checkboxes.extendCheck ? (
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={modExtendedVersionCheck}
                          onChange={modExtendedVersionCheckHandler}
                        />
                      }
                      label="Modify the extended version"
                    />
                    {checkboxes.modExtendedVersionCheck ? (
                      <span className="price-span">
                        ${pricesCalc.modExtendedVersion}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )}
            <div className="pt-3 w-100 d-flex justify-content-between align-items-center total-price-container">
              <span>Total price: </span>
              <span className="price-span">${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
