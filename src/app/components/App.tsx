import React from 'react';
import '../styles/ui-compiled.css';

function App() {
  onmessage = async (event) => {
    if(event.data.pluginMessage.type === "fetchedLicense") {
      checkLicense()
    }
      
  }

  async function getLicense() {
    parent.postMessage({
      pluginMessage: {
        action: "fetchLicense"
      } 
    }, "*")
  }

  async function checkLicense() {
    const req = await fetch("http://localhost:3000/api/checkLicense", {
      method: "POST",
      headers: {
            'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        "license": "lennardtest"
      })
    })

    const json = await req.json()

    const license = json.license
    const isPremium = json.isPremium

    if(isPremium) {
      const assetReq = await fetch("http://localhost:3000/api/generate", {
        method: "POST",
        headers: {
              'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          text: (document.getElementById("prompt-input") as HTMLInputElement).value,
          license
        })
      })

      const assets = await assetReq.json() 
      console.log(assets)
  
      parent.postMessage({
        pluginMessage: {
          action: "createPage",
          assets
        },
      }, "*")
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">demo 🪄</h1>

      <input id="prompt-input" type="text" placeholder="Enter your idea." />
      <button onClick={getLicense}>Create</button>
    </>
  );
}

export default App;
