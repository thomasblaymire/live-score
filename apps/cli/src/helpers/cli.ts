import { getRootPath } from "./location";
import { spawn } from "cross-spawn";
import del from "del";
import { ChildProcess, exec } from "child_process";

export const cleanFiles = async (options?: CleanFileOptions) => {
  const projectPath = getRootPath();
  try {
    const matches = await del(
      [
        `**/dist/**`,
        `**/api/build/**`,
        `**/client/build/**`,
        "**/*.log",
        "**/.DS_Store",
        "!**/node_modules/**",
        ...(options?.additionalPaths ? options.additionalPaths : []),
      ],
      {
        cwd: projectPath,
      }
    );
    matches.forEach((path: string) => {
      console.log(`Removed: ${path}`);
    });
  } catch (ex) {
    console.log(`Error removing: ${ex}`);
  }
};

export const spawnProcess = (options: ProcessOptions): Promise<ChildProcess> =>
  new Promise((resolve, reject) => {
    const wait = options.wait || 0;
    let childProcess = null;

    setTimeout(() => {
      childProcess = spawn(
        options.command,
        options.arguments,
        options.environment ? options.environment : { stdio: "inherit" }
      );

      const childProcessOutput = childProcess.stdout;
      if (childProcessOutput) {
        childProcessOutput.on("data", (data: Buffer) => {
          console.log(`${data.toString().trim()}`);
        });

        childProcessOutput.on("exit", (code: number) => {
          if (code !== 0) {
            reject(code);
          } else {
            resolve(null);
          }
        });

        childProcessOutput.on("close", () => {
          resolve(null);
        });

        childProcessOutput.on("end", () => {
          resolve(null);
        });
      }

      childProcess.stderr?.on("data", (data: Buffer) => {
        console.log(`${data.toString().trim()}`);
      });
    }, wait);
  });
