import React from 'react';
import '../styles/ui.css';

function App() {
  
  async function generateAssets() {
    const req = await fetch("https://f-backend.vercel.app/api/generate", {
      method: "POST",
      headers: {
            'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        text: (document.getElementById("prompt-input") as HTMLInputElement).value,

        // Just for debugging!
        key: (document.getElementById("key-input") as HTMLInputElement).value
      })
    })

    const assets = await req.json()

    parent.postMessage({
      pluginMessage: {
        action: "fetchedAssets",
        assets: assets
      },
    }, "*")
  }

  return (
    <>
      <h1>demo 🪄</h1>

      <input id="prompt-input" type="text" placeholder="Enter your idea." />
      <input id="key-input" type="text" placeholder="Enter your OpenAI-Key (for testing)." />
      <button onClick={generateAssets}>Create</button>
    </>
  );
}

export default App;
