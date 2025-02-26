import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
import{app} from "./app.js"


dotenv.config({
    path: "./env"
})

dbConnection()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.error("Error connecting to database: ", error);
})
