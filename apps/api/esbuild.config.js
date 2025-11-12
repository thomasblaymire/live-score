const esbuild = require("esbuild");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    outfile: "dist/bundle.js",
    sourcemap: true,
    minify: isProduction,
    external: [
      // External packages that shouldn't be bundled
      "@prisma/client",
      ".prisma",
      "@supabase/supabase-js",
    ],
    logLevel: "info",
    define: {
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ),
    },
  })
  .then(() => {
    console.log("✅ Bundle created successfully!");
  })
  .catch((error) => {
    console.error("❌ Build failed:", error);
    process.exit(1);
  });
