const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/database/connectDB");
require("dotenv").config();
const PORT = process.env.PORT || 3000;


const server = http.createServer(app);

async function startserver() {
    await connectDB();
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

startserver();

