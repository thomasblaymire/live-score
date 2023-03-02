interface CleanFileOptions {
  additionalPaths?: string[];
}

interface ProcessOptions {
  command: string;
  arguments: string[];
  environment?: any;
  wait?: number;
}
