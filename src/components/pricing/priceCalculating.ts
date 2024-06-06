import { PricesCalcState } from "../../types";

export const priceCalculating = (
  pricesCalc: PricesCalcState,
  setPricesCalc: (value: PricesCalcState) => void
) => {
  const oneMinVersion = pricesCalc.versionPrice - pricesCalc.modOneMinVersion;
  setPricesCalc({
    ...pricesCalc,
    versionPrice: oneMinVersion,
  });
};
