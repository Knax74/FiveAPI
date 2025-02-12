const express = require('express');
const Config = require("./config.js")

const app = express();
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({limit: '1mb', extended: false}));

app.post("/ping", (req, res) => {
    const Headers = req.headers
    if (Headers["secret"] != Config.Endpoint.Secret) {
        console.log("^8[API]^0 Recived Unauthorized ping")
        return res.status(401).send({ message: "Unauthorized.", status: "failed" });
    }
    console.log("^8[API]^0 Recived Ping")
    return res.status(200).send({
        status: "Recived Ping"
    })
})

app.post("/kickplayer", (req, res) => {
    const Headers = req.headers
    const body = req.body
    if (Headers["secret"] != Config.Endpoint.Secret) {
        console.log("^8[API]^0 Recived Unauthorized action")
        return res.status(401).send({ message: "Unauthorized.", status: "failed" });
    }
    if (!body.data.id || !body.data.reason) {
        console.log("^8[API]^0 Invalid request data")
        return res.status(401).send({ message: "Invalid.", status: "failed" });
    }
    const KickPlayer = exports[GetCurrentResourceName()].KickPlayer(body.data.id, body.data.reason)
    if (KickPlayer) {
        console.log("^8[API]^0 Successfully kicked player")
        return res.status(200).send({
            status: "Successfully kicked player"
        })
    } else {
        console.log("^8[API]^0 Failed to kick player")
        return res.status(401).send({ message: "Unknown player.", status: "failed" });
    }
})

app.listen(Config.Endpoint.Port, () => {
    console.log("^8[API]^0 Endpoint running on port " + Config.Endpoint.Port);
});