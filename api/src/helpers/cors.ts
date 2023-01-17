import cors from "cors";

// CORS Configuration
const allowedOrigins = [
  "http://127.0.0.1:3001",
  "http://localhost:3001",
  "http://localhost:3000",
  "http://127.0.0.0",
];

export const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
};
