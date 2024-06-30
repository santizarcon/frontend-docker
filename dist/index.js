import app from "./app.js";

app.listen(app.get("port"), ()=>{
    console.log(`FRONTEND Server in the port: ${app.get("port")}`);
})