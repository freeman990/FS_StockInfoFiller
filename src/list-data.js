import sketch from 'sketch'
import * as sf from './SummaryFill'

export default function(){
  const summaries = sf.csvToSummaries('summaryData.json')
  let chnList = []
  for(let s of summaries){
    chnList.push(s.chn)
  }

  sketch.UI.alert("可用的标签，记得加上'{ }'", chnList.join('\n'))
}