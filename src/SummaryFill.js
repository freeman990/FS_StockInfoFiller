import * as ut from './util'

export function csvToSummaries(ResourcefileName){
  const dataPath = context.plugin.urlForResourceNamed(ResourcefileName)
  // Reading file with UTF8 but unable to show Chinese character
  //let summaries = JSON.parse(NSString.stringWithContentsOfFile_encoding_error(dataPath,NSUTF8StringEncoding,null))
  let summaries = JSON.parse( NSString.stringWithContentsOfFile(dataPath) )
  log(summaries == null ? 'Failed to load JSON':'JSON data load ready')

  //Array each item's data and shuffle data order
  const dataSample = summaries[0].data.split(',')
  const dataSetRandomOrder = ut.buildRandomOrder(dataSample)
  for(let item of summaries){
    item.chn = item.chn.split(',')
    item.data = ut.reorderArray(item.data.split(','), dataSetRandomOrder)
  }

  return summaries
}

export function listAllTheChange(textList, summaryList){
  let changeList = []
  const layerNameReg = /\{(\D+?)(\d{0,})\}/
  for(let tLayer of textList){
    const nameTags = layerNameReg.exec(tLayer.name)
    const textTags = layerNameReg.exec(tLayer.text)
    let summaryTag = ''
    let summaryID = null
    if(nameTags !== null){
      summaryTag = nameTags[1]
      summaryID = nameTags[2] === '' ? 0 : Number(nameTags[2])
    }
    if(textTags !== null){
      summaryTag = textTags[1]
      summaryID = textTags[2] === '' ? 0 : Number(textTags[2])
    }

    if(summaryTag !== ''){
      for(let item of summaryList){
        let chnFound = false
        for(let c in item.chn){
          if(summaryTag === item.chn[c]){
            //Match Found, list change
            chnFound = true
            changeList.push({
              layer: tLayer,
              option: item,
              chnID: Number(c),
              dataID: summaryID
            })
            break
          }
          //chn array loop finished
        }
        if(chnFound){
          break
        }
        //summary loop finished
      }
    }
  }

  return changeList

}