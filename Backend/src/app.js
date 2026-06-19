import path from 'path'
import express from 'express';
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import restaurantRouter from "./routes/restaurant.route.js";
import foodRouter from "./routes/food.route.js";
import cartRouter from "./routes/cart.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser())

const frontendPath = path.join(path.resolve(), '../Frontend/dist');

app.use(express.static(frontendPath));

app.use('/api/auth/', authRouter);
app.use("/api", restaurantRouter);
app.use("/api", foodRouter);
app.use("/api/", cartRouter);

// Catch-all route to serve React Router index.html for Single Page App (SPA)
// Bypasses path-to-regexp syntax error in Express 5 by using a Regular Expression

// app.get(/^(?!\/api).*$/, (req, res) => {
//   res.sendFile(path.join(frontendPath, 'index.html'));
// });

app.get("*frontend", (req, res) => {
  res.sendFile("index.html", { root: frontendPath });
});

export default app;
