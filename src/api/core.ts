import { exec } from "child_process";
import { open } from "fs/promises";

// fetch data by gem module githubstats
export const fetchRawDataRb = (owner: string) => {
  return new Promise<string>((resolve) => {
    exec(
      `ruby ${__dirname}/githubstats.rb "${owner}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        resolve(stdout);
      }
    );
  });
};

// fetch data by js module ???

// fetch data by octokit

// generate JSON file from the string data.
export const generateJsonFile = async (json: string) => {
  let filehandle;

  try {
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth}-${date.getDate()}`;
    filehandle = await open(`./asserts/contributions${dateStr}.json`, "a+");
    await filehandle.write(Buffer.from(json));
  } catch (error) {
    console.error(error);
  } finally {
    filehandle?.close();
  }
};
