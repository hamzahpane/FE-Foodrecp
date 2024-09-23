import dotenv from "dotenv";

// Memuat variabel dari file .env
dotenv.config();

const config = {
  host: process.env.HOST || "",
  urlAuth: process.env.URL_AUTH || "",
};

export default config;
