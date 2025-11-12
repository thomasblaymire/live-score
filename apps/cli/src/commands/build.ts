import { ChildProcess } from "child_process";
import { copy } from "fs-extra";
import { cleanFiles, spawnProcess } from "../helpers/cli";
import { getRootPath } from "../helpers/location";

// For now we just build both apps when the 'build' command is run
// in the future we can specify an options.path to do one or the other.
export const build = async (): Promise<ChildProcess> => {
  try {
    await buildClient();
    await buildApi();
  } catch (err) {
    console.log("Unable to build applications", err);
    throw err;
  }
};

export const buildClient = async (): Promise<ChildProcess> => {
  const path = getRootPath("client");
  await cleanFiles();

  spawnProcess({
    command: "next build && next export",
    arguments: [],
    environment: {
      cwd: path,
    },
  });

  await copy("/client/build", "/build/client");
};

export const buildApi = async (): Promise<ChildProcess> => {
  const path = getRootPath("api");
  await cleanFiles();

  spawnProcess({
    command: "npm run build",
    arguments: [],
    environment: {
      cwd: path,
    },
  });

  await copy("/api/build", "/build/api");
};
