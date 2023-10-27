const express = require("express");
const app = express();
const router = require("./routes/routes");

app.use(express.json());
app.use(router);
const PORT = 6000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening to the PORT ${PORT}`);
});
