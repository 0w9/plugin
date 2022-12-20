figma.showUI(__html__)

async function fetchAssets() {
}


figma.ui.onmessage = async (pluginmessage) => {
  if (pluginmessage.action === 'fetchedAssets') {
    console.log(JSON.stringify(pluginmessage.assets.header))

    console.log(pluginmessage.assets)
    const header = pluginmessage.assets.header;
    const subheader = pluginmessage.assets.subheader;
    const description = pluginmessage.assets.description;
    const cta = pluginmessage.assets.cta;
    const colors = pluginmessage.assets.colors;

    for(const color of colors) {
      if(color.r === 0) color.r = 0.1
      if(color.g === 0) color.g = 0.1
      if(color.b === 0) color.b = 0.1
    }

    console.log("Colors: " + colors)

    const nodes: SceneNode[] = [];

    const frame = figma.createFrame()

    const rec = figma.createRectangle()
    rec.fills = [{ type: 'SOLID', color: {r: Number(`0.${colors[0][0]}`), g: Number(`0.${colors[0][1]}`), b: Number(`0.${colors[0][2]}`)} }]
    
    const rec2 = figma.createRectangle()
    rec2.fills = [{ type: 'SOLID', color: {r: Number(`0.${colors[1][0]}`), g: Number(`0.${colors[1][1]}`), b: Number(`0.${colors[1][2]}`)} }]
    
    const rec3 = figma.createRectangle()
    rec3.fills = [{ type: 'SOLID', color: {r: Number(`0.${colors[2][0]}`), g: Number(`0.${colors[2][1]}`), b: Number(`0.${colors[2][2]}`)} }]
   
    const rec4 = figma.createRectangle()
    rec4.fills = [{ type: 'SOLID', color: {r: Number(`0.${colors[3][0]}`), g: Number(`0.${colors[3][1]}`), b: Number(`0.${colors[3][2]}`)} }]
   
    const rec5 = figma.createRectangle()
    rec5.fills = [{ type: 'SOLID', color: {r: Number(`0.${colors[4][0]}`), g: Number(`0.${colors[4][1]}`), b: Number(`0.${colors[4][2]}`)} }]

    
    rec2.x = 100
    rec3.x = 100 + rec3.height
    rec4.x = 100 + rec3.height + rec4.height
    rec5.x = 100 + rec3.height + rec4.height + rec5.height
    

    rec.name = "Rec"
    rec2.name = "Rec2"
    rec3.name = "Rec3"
    rec4.name = "Rec4"
    rec5.name = "Rec5"

    const component = figma.createComponent()
    component.appendChild(rec)
    component.appendChild(rec2)
    component.appendChild(rec3)
    component.appendChild(rec4)
    component.appendChild(rec5)

    component.y = -150
    component.x = 0

    frame.resizeWithoutConstraints(
      1200, 800
    )

    await figma.loadFontAsync({ family: "Inter", style: "Regular" })

    let title = figma.createText();

    title.textAutoResize = "WIDTH_AND_HEIGHT"
    title.textAlignHorizontal = "CENTER"

    title.characters = header;

    title.fontSize = 48
    title.resize(frame.width, title.height)

    title.x = frame.x
    title.y = 80

    let text = figma.createText();
    text.textAutoResize = "WIDTH_AND_HEIGHT"
    text.textAlignHorizontal = "CENTER"

    text.characters = subheader;

    text.fontSize = 36
    text.resize(frame.width, text.height)

    text.x = frame.x
    text.y = 280

    let button = figma.createRectangle()
    button.resize(329, 100)
    button.x = 435
    button.y = 515

    button.cornerRadius = 25
    
    button.fills = [{ type: 'SOLID', color: {r: Number(`0.${colors[4][0]}`), g: Number(`0.${colors[4][1]}`), b: Number(`0.${colors[4][2]}`)} }]

    let ctaText = figma.createText()
    ctaText.characters = cta
    ctaText.resize(329, 100)
    ctaText.x = 435
    ctaText.y = 515
    ctaText.fontSize = 14
    ctaText.textAutoResize = "WIDTH_AND_HEIGHT"
    ctaText.textAlignHorizontal = "CENTER"

    ctaText.textAlignVertical = "CENTER"

    ctaText.fills = [{ type: 'SOLID', color: {r: 1, g: 1, b: 1} }]

    ctaText.resize(button.width, button.height)

    nodes.push(title, text, button, component);

    figma.viewport.scrollAndZoomIntoView(nodes);


    figma.currentPage.selection = nodes;
  }
}