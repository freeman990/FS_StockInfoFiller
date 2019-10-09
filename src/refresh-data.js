import sketch from 'sketch'
import * as ui from './ui'
import * as ut from './util'
import * as sf from './SummaryFill'
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  const doc = sketch.getSelectedDocument()

  //Stock Summary data
  const summaries = sf.csvToSummaries('summaryData.json')

  //const mainUI = ui.createPanel(400,400,'Stock Summary')
  
  //Build textlayer array
  const textLayers = ut.loopSeachText(doc.pages[0])

  //List all the changes
  const changes = sf.listAllTheChange(textLayers, summaries)

  //Do the replace
  for(let c of changes){
    c.layer.text = c.option.data[c.dataID]
    const cName = c.option.chn[c.chnID]
    const cID = c.dataID === 0 ? '': c.dataID
    c.layer.name = '{' + cName + cID + '}'
  }

  sketch.UI.message(changes.length+' layers changed')
}




