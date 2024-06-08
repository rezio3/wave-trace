import { SelectChangeEvent } from "@mui/material";
import { prices } from "./prices";

type VersionType = {
  value: string;
  isFree: boolean;
};

type PricesCalcType = {
  versionPrice: number;
  modifyVersionPrice: number;
  extendedVersion: number;
  modExtendedVersion: number;
};

type CheckboxesType = {
  modifyVersionCheckbox: boolean;
  extendCheck: boolean;
  modExtendedVersionCheck: boolean;
};

export const HandleVersionCheckbox = ({
  version,
  event,
  setVersion,
  pricesCalc,
  setPricesCalc,
  setCheckboxes,
}: {
  event: SelectChangeEvent;
  version: VersionType;
  setVersion: (value: VersionType) => void;
  pricesCalc: PricesCalcType;
  setPricesCalc: (value: PricesCalcType) => void;
  setCheckboxes: (value: CheckboxesType) => void;
}) => {
  const price = !version.isFree ? 0 : prices.oneMinVersion;
  setVersion({
    value: event.target.value,
    isFree: !version.isFree,
  });
  if (!version.isFree) {
    setPricesCalc({
      versionPrice: 0,
      modifyVersionPrice: 0,
      extendedVersion: 0,
      modExtendedVersion: 0,
    });
    setCheckboxes({
      modifyVersionCheckbox: false,
      extendCheck: false,
      modExtendedVersionCheck: false,
    });
  } else {
    setPricesCalc({
      ...pricesCalc,
      versionPrice: price,
    });
  }
};

export const handleModifyVersionCheckboxHandler = ({
  modifyVersionCheckbox,
  checkboxes,
  setCheckboxes,
  pricesCalc,
  setPricesCalc,
}: {
  modifyVersionCheckbox: boolean;
  checkboxes: CheckboxesType;
  setCheckboxes: (value: CheckboxesType) => void;
  pricesCalc: PricesCalcType;
  setPricesCalc: (value: PricesCalcType) => void;
}) => {
  const price = modifyVersionCheckbox ? 0 : 5;
  const versionPriceReduce = !modifyVersionCheckbox
    ? prices.oneMinVersion - prices.modOneMinVersion
    : prices.oneMinVersion;
  setCheckboxes({
    ...checkboxes,
    modifyVersionCheckbox: !modifyVersionCheckbox,
  });
  setPricesCalc({
    ...pricesCalc,
    versionPrice: versionPriceReduce,
    modifyVersionPrice: price,
  });
};

export const handleModVersionSlider = (
  value: number | number[],
  pricesCalc: PricesCalcType,
  setPricesCalc: (value: PricesCalcType) => void
) => {
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

export const handleExtendCheckbox = ({
  extendCheck,
  checkboxes,
  setCheckboxes,
  pricesCalc,
  setPricesCalc,
}: {
  extendCheck: boolean;
  checkboxes: CheckboxesType;
  setCheckboxes: (value: CheckboxesType) => void;
  pricesCalc: PricesCalcType;
  setPricesCalc: (value: PricesCalcType) => void;
}) => {
  const price = extendCheck ? 0 : 39;
  setCheckboxes({
    ...checkboxes,
    extendCheck: !extendCheck,
  });
  setPricesCalc({
    ...pricesCalc,
    extendedVersion: price,
  });
};

export const handleExtendedSlider = (
  value: number | number[],
  pricesCalc: PricesCalcType,
  setPricesCalc: (value: PricesCalcType) => void
) => {
  const modSliderValue = Array.isArray(value) ? value[0] - 1 : value - 1;
  const price = modSliderValue * prices.extendedVersion;
  setPricesCalc({
    ...pricesCalc,
    extendedVersion: price,
  });
};

export const handleModExtendedVersionCheck = ({
  modExtendedVersionCheck,
  checkboxes,
  setCheckboxes,
  pricesCalc,
  setPricesCalc,
}: {
  modExtendedVersionCheck: boolean;
  checkboxes: CheckboxesType;
  setCheckboxes: (value: CheckboxesType) => void;
  pricesCalc: PricesCalcType;
  setPricesCalc: (value: PricesCalcType) => void;
}) => {
  const price = modExtendedVersionCheck ? 0 : 15;
  setCheckboxes({
    ...checkboxes,
    modExtendedVersionCheck: !modExtendedVersionCheck,
  });

  setPricesCalc({
    ...pricesCalc,
    modExtendedVersion: price,
  });
};
