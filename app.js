const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const routes = require("./routes/index.routes");
const errorHandler = require("./middleware/error_handling_middleware");
const cookieParser = require("cookie-parser");

const logger =require("./services/logger")

const port = config.get("port");

require("dotenv").config({path:`.env.${process.env.NODE_ENV}`})
// console.log(process.env.NODE_ENV);
// console.log(process.env.secret);
// console.log(config.get("secret"));
// console.log(config.get("access_key"));

logger.log("info","log ma'lumotlari");
logger.error("error ma'lumotlari")
logger.debug("debug ma'lumotlari")
logger.warn("warn ma'limotlari")
logger.info("info ma'lumotlari")
// console.trace("trace ma'lumotlari")
// console.table([
//     ["salim","36"],
//     ["KArim","32"],
//     ["Jamshid","34"]
// ])
process.on("uncaughtException",(ex)=>{
    console.log("uncaughtException",ex.message);
})
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.use(errorHandler);

async function start() {
    try {
        await mongoose.connect(config.get("dbUri"));
        app.listen(port, () => {
            console.log(`Server ${port}-portda ishga tushdi`);
        });
    } catch (error) {
        console.log(error);
        // errorHandler(res, error);
    }
}

start();
