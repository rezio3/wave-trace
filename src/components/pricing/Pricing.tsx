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

function valuetext(value: number) {
  return `${value}°C`;
}

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

  const [oneMinuteVersion, setOneMinuteVersion] =
    React.useState("free-version");

  const [modSampleVersionCheck, setModSampleVersionCheck] =
    React.useState(false);
  const [extendCheck, setExtendCheck] = React.useState(false);
  const [modExtendedMusicCheck, setModExtendedMusicCheck] =
    React.useState(false);
  const handleChange = (event: SelectChangeEvent) => {
    setOneMinuteVersion(event.target.value as string);
  };

  const modSampleVersionCheckHandler = () => {
    setModSampleVersionCheck(!modSampleVersionCheck);
  };
  const extendCheckHandler = () => {
    setExtendCheck(!extendCheck);
  };
  const modExtendedMusicCheckHandler = () => {
    setModExtendedMusicCheck(!modExtendedMusicCheck);
  };
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
          <table className="pricing-table">
            <tr>
              <td className="pricing-cell">
                A one-minute version of the music as a sample for the client to
                evaluate whether they like it or not. The music has a watermark
                applied.
              </td>
              <td className="pricing-cell">Free</td>
            </tr>
            <tr>
              <td className="pricing-cell">
                Modification of the one-minute version of the music to better
                suit the client's needs. The modification price is already
                included and reduced from the total order amount. The version of
                the music still with a watermark.
              </td>
              <td className="pricing-cell">$5</td>
            </tr>
            <tr>
              <td className="pricing-cell">
                A one-minute version of the ordered music, in full quality and
                without a watermark. The product is ready to be downloaded and
                used. The total price for the unmodified version.
              </td>
              <td className="pricing-cell">$49</td>
            </tr>
            <tr>
              <td className="pricing-cell">
                Extension of the track to a specific length based on the
                proposed one-minute sample. Price is for each additional minute
                excluding the first one.
              </td>
              <td className="pricing-cell">$39</td>
            </tr>
            <tr>
              <td className="pricing-cell">
                Modification of the extended track (longer than one minute). The
                price is additional and does not reduce the total order amount.
              </td>
              <td className="pricing-cell">$15</td>
            </tr>
          </table>
        </div>
        <div>
          <h4 className="pb-4">Pricing calculator</h4>
          <div className="d-flex flex-column align-items-start gap-3">
            <FormControl>
              <InputLabel id="demo-simple-select-label">Version</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={oneMinuteVersion}
                label="Version"
                onChange={handleChange}
              >
                <MenuItem value="free-version">
                  Free 1-minute version with watermark
                </MenuItem>
                <MenuItem value="one-min-full-version">
                  1-minute version without watermark
                </MenuItem>
              </Select>
            </FormControl>
            {oneMinuteVersion === "one-min-full-version" ? (
              <div className="d-flex flex-column align-items-start gap-3">
                <FormControlLabel
                  control={<Checkbox checked={modSampleVersionCheck} onChange={modSampleVersionCheckHandler} />}
                  label="Modify the sample version"
                />
                {modSampleVersionCheck ? (
                  <div>
                    <Slider
                      aria-label="modification-quantity"
                      defaultValue={1}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      shiftStep={1}
                      step={1}
                      marks
                      min={1}
                      max={10}
                      className="ms-2"
                    />
                    <span className="text-secondary">
                      Quantity of modifications
                    </span>
                  </div>
                ) : null}
                <FormControlLabel
                  control={<Checkbox checked={extendCheck} onChange={extendCheckHandler} />}
                  label="Extend your music"
                />
                {extendCheck ? (
                  <div>
                    <Slider
                      aria-label="modification-quantity"
                      defaultValue={2}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      shiftStep={1}
                      step={1}
                      marks
                      min={2}
                      max={10}
                      className="ms-2"
                    />
                    <span className="text-secondary">
                      Length of music extension (in minutes).
                    </span>
                  </div>
                ) : null}
                <FormControlLabel
                  control={<Checkbox checked={modExtendedMusicCheck} onChange={modExtendedMusicCheckHandler} />}
                  label="Modify the extended version"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;


// NAPRAWIĆ CHECKBOXY !!!! VALUE MA BYĆ TAKIE JAK W STATE