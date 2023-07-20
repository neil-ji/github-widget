import { property } from "lit/decorators";

export * as Constant from "./constant";
export const validateCssUnit = (unit: any): boolean => {
  if (typeof unit === "number") return true;
  if (typeof unit === "string") return /\d+px/.test(unit);

  console.log("Invalidated css unit: ", unit);
  return false;
};

export const getCssUnit = (unit: any, defaultUnit?: string): string => {
  if (!validateCssUnit(unit)) return defaultUnit || "0";
  if (typeof unit === "string") return unit;
  return `${unit}px`;
};

export const injectJsonFile = async (url: string) => {
  const { body } = await fetch(url);
  console.log(body)
};
