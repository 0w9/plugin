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
    function generateAssets() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = yield fetch("https://f-backend.vercel.app/api/generate", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: document.getElementById("prompt-input").value,
                    key: document.getElementById("key-input").value
                })
            });
            const assets = yield req.json();
            parent.postMessage({
                pluginMessage: {
                    action: "fetchedAssets",
                    assets: assets
                },
            }, "*");
        });
    }
    function getLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            localStorage.setItem("license", "123");
            const license = localStorage.getItem('license');
            console.log("license: " + license);
        });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "demo \uD83E\uDE84"),
        React.createElement("input", { id: "prompt-input", type: "text", placeholder: "Enter your idea." }),
        React.createElement("input", { id: "key-input", type: "text", placeholder: "Enter your OpenAI-Key (for testing)." }),
        React.createElement("button", { onClick: generateAssets }, "Create"),
        React.createElement("button", { onClick: getLicense }, "getLicense")));
}
export default App;
