import { fetchRawDataRb, generateJsonFile } from "./core";

export enum RunMode {
  Default = 1,
  Ruby = 2,
  JS = 3,
}

export const run = async (owner: string, mode = RunMode.Default) => {
  let json = "";
  if (mode === RunMode.Default) {
    // ...
  } else if (mode === RunMode.Ruby) {
    json = await fetchRawDataRb(owner);
  } else {
    // ...
  }

  await generateJsonFile(json);
};
