import { run, RunMode } from "./index";

const owner = process.argv[1];

run(owner, RunMode.Ruby);
