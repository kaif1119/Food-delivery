import app from "./src/app.js";
import connectDB from "./src/config/database/database.js";
import config from "./src/config/environement.js";

connectDB()

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

