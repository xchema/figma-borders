// Borders by the Snapblocks team
// Figma plugin that add independent borders to each side of a FRAME element.
// https://github.com/xchema/figma-borders

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

// message from ui to figma sandbox
figma.ui.onmessage = msg => {

  const line = figma.createLine();
  const selected = figma.currentPage.selection[0];

  // append line to document
  figma.currentPage.appendChild(line);
  //place line inside frame element
  selected.appendChild(line);

  // change line default properties based on option selected
  if (msg.type === 'border-bottom') {
    line.name = "--border-bottom";
    line.resize(selected.width, line.height);
    line.y = selected.height;
    line.constraints = {
      horizontal: "STRETCH",
      vertical: "MIN"
    };
  }
  if (msg.type === 'border-right') {
    line.name = "--border-right";
    line.resize(selected.height, line.height);
    line.rotation = 90;
    line.x = selected.width;
    line.y = selected.height;
    line.constraints = {
      horizontal: "MAX",
      vertical: "STRETCH"
    };
  }
  if (msg.type === 'border-top') {
    line.name = "--border-top";
    line.resize(selected.width, line.height);
    line.y = 1; // might replace based on dynamic size generator in future release
    line.constraints = {
      horizontal: "STRETCH",
      vertical: "MIN"
    };
  }
  if (msg.type === 'border-left') {
    line.name = "--border-left";
    line.resize(selected.height, line.height);
    line.rotation = 90;
    line.x = 1; // might replace based on dynamic size generator in future release
    line.y = selected.height;
    line.constraints = {
      horizontal: "MIN",
      vertical: "STRETCH"
    };
  }

  // applying custom color to stroke
  line.strokes = [{
    type:"SOLID",
    visible:true,
    opacity:1,
    blendMode:"NORMAL",
    color:{
      r:0.8078431487083435,
      g:0.8313725590705872,
      b:0.8549019694328308
    }
  }];

  // figma.closePlugin();
};
