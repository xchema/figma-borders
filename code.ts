// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);


// NOTE: resizing the ui window for plugin
// figma.ui.resize(300,500)

// verify if selection has correct type to apply border
let correctType = function () {
  const elem = figma.currentPage.selection[0]; // get first element on selection
  // return (elem.type === 'RECTANGLE' || elem.type === 'FRAME') ? true : false;
  return (elem.type === 'FRAME') ? true : false;
};

figma.on('selectionchange', () => {
  if (figma.currentPage.selection.length) {
    const elem = figma.currentPage.selection[0];
    const kind = figma.currentPage.selection[0].type;
    figma.ui.postMessage({ type: 'selectionChange', elem, kind });
  } else {
    const elem = null;
    figma.ui.postMessage({ type: 'selectionChange', elem });
  }
})

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = () => {

  const line = figma.createLine();
  const selected = figma.currentPage.selection[0];

  // append line to document
  figma.currentPage.appendChild(line);

  // change line default properties
  // line.x = selected.x;
  // line.y = selected.y + selected.height;
  line.resize(selected.width, line.height);
  line.opacity = 0.2;

  //place line inside frame element
  selected.appendChild(line);
  line.y = selected.height;
  // line.width = 300;
  // line.y = selected.height - 1;



  // if (msg.type === 'border-bottom' && selected.length && correctType()) {
  //   // console.log(figma.currentPage.selection[0].parent.type);
  //   const line = figma.createLine();
  //   selected[0].appendChild(line);
  //   line.y = 1;
  //
  //
  //
  //   // const line = figma.createLine();
  //   // line.x = 100
  // } else {
  //   console.log("select correct node");
  // }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.

  // figma.closePlugin();
};
