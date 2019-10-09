export function createPanel(width,height,title){
  let uiPanel = NSPanel.alloc().init();
  let panelId = 0

  uiPanel.setFrame_display(NSMakeRect(0, 0, width, height),true);
  //uiPanel.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask);
  //uiPanel.setBackgroundColor(NSColor.controlColor());
  uiPanel.setLevel(NSFloatingWindowLevel);
  uiPanel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
  uiPanel.standardWindowButton(NSWindowZoomButton).setHidden(true);
  uiPanel.makeKeyAndOrderFront(null);
  uiPanel.center();
  uiPanel.title = title;

  COScript.currentCOScript().setShouldKeepAround_(true);
  //Thread, Identifier staff...
  var threadDictionary = NSThread.mainThread().threadDictionary(),
      identifier = "com.freeman.sketchplugins.fs-textlayer-select";
  if (threadDictionary[identifier]) return;
  threadDictionary[identifier] = uiPanel;

  var closeButton = uiPanel.standardWindowButton(NSWindowCloseButton);
  closeButton.setCOSJSTargetFunction(function(sender) {
      uiPanel.close();
      threadDictionary.removeObjectForKey(identifier);
      COScript.currentCOScript().setShouldKeepAround_(false);
  });

  //Actual content panel, swithced by segmented contorl
  //let contentPanel = NSView.alloc().initWithFrame(NSMakeRect(0, 0, winWidth, winHeight-59))

  return uiPanel
}

export function createCheckBox(name, value, onstate, enabled, frame){
  var checkbox = NSButton.alloc().initWithFrame(frame);
  checkbox.setButtonType(NSSwitchButton);
  //checkbox.setBezelStyle(1);
  checkbox.setTitle(name);
  checkbox.setTag(value);
  checkbox.setState(onstate ? NSOnState : NSOffState);
  checkbox.setEnabled(enabled);

  return checkbox;
}

export function createLabel(text, size, frame, alpha) {
  var label = NSTextField.alloc().initWithFrame(frame),
      alpha = (alpha) ? alpha : 1.0;

  label.setStringValue(text);
  label.setFont(NSFont.systemFontOfSize(size));
  //label.setTextColor(NSColor.colorWithCalibratedRed_green_blue_alpha(255/255, 255/255, 255/255, alpha));
  label.setBezeled(false);
  label.setDrawsBackground(false);
  label.setEditable(false);
  label.setSelectable(false);

  return label;
}

export function NSColorWithHex(h) {
  let r = 0, g = 0, b = 0, a = 1;

  if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
    a = 1

  } else if (h.length == 9) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
    a = "0x" + h[7] + h[8];
  }
  a = +(a / 255).toFixed(3);
  //return "rgba(" + +r + "," + +g + "," + +b + "," + a + ")";
  return NSColor.colorWithRed_green_blue_alpha(Number(r)/255, Number(g)/255, Number(b)/255,a*255)
}