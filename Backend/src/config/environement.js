import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["PORT", "MONGO_URL", "JWT_SECRET"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`${envVar} is not defined in environment variables`);
    process.exit(1);
  }
}

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
