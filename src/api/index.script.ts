import { run, RunMode } from "./index";

const owner = process.argv[2];

run(owner, RunMode.Ruby);
