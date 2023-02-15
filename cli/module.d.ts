interface CleanFileOptions {
  additionalPaths?: string[];
}

interface ProcessOptions {
  command: string;
  arguments: string[];
  environment?: SpawnOptions;
  wait?: number;
}
