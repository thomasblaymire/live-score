import { cwd } from "process";

type PackageName = "api" | "client";

// TODO: Implement content aware package location
export const getRootPath = (packageName?: PackageName) => {
  const currentPath = cwd();

  if (!currentPath) {
    throw Error("Could not resolve path to application.");
  }

  return currentPath;
};
