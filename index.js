const PORT = 8000;
const express = require("express");
const database = require("./components/database");
const helpers = require("./components/helpers");
const fs = require("fs");

async function main() {
    await database.initialize();

    let actions = {};
    for(let file of fs.readdirSync("./actions")){
        Object.assign(actions, require("./actions/" + file));
    }

    let app = express();
    app.use(express.json());

    app.all("/", async (req, res) => {

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");

        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }

        let output_response = { results: [], errors: [], timestamp: Date.now() };
        let body = req.body;

        if (body.action == undefined || actions[body.action] == undefined) {
            output_response.errors.push("action_not_found");
            res.status(400);
            res.send(output_response);
            return;
        }

        let caller = {};
        if (body.parameters |= undefined && body.parameters.user_token != undefined) {
            caller = await helpers.get_user_by_token(body.parameters.user_token);
        }

        try {
            await actions[body.action](body, output_response, caller);
        } catch (e) {
            console.dir(e);
            output_response.errors.push(e.message);
        }

        res.send(output_response);
    });

    app.listen(PORT);
    console.log("App started on port: " + PORT);
}

main();