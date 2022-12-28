var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import '../styles/ui.css';
function App() {
    onmessage = (event) => __awaiter(this, void 0, void 0, function* () {
        if (event.data.pluginMessage.type === "fetchedLicense") {
            checkLicense();
        }
    });
    function getLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            parent.postMessage({
                pluginMessage: {
                    action: "fetchLicense"
                }
            }, "*");
        });
    }
    function checkLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield fetch("http://localhost:3000/api/checkLicense", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "license": "7A2793F4-9655450D-AC38B7BF-7C373DFC"
                })
            });
            const json = yield req.json();
            const license = json.license;
            const isPremium = json.canGenerate;
            console.log(json);
            if (isPremium) {
                const assetReq = yield fetch("http://localhost:3000/api/generate", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: document.getElementById("prompt-input").value,
                        license
                    })
                });
                const assets = yield assetReq.json();
                console.log(assets);
                parent.postMessage({
                    pluginMessage: {
                        action: "createPage",
                        assets
                    },
                }, "*");
            }
            else {
                console.log("You can't do this!");
            }
        });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "demo \uD83E\uDE84"),
        React.createElement("input", { id: "prompt-input", type: "text", placeholder: "Enter your idea." }),
        React.createElement("button", { onClick: getLicense }, "Create w/ hardcoded license")));
}
export default App;
