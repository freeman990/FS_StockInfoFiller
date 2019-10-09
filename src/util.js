export function loopSeachText (container) {
  let results = []
  for(let layer of container.layers){
    switch(layer.type){
      case 'Artboard':
      case 'Group':
      case 'SymbolMaster':
          results = results.concat(loopSeachText(layer))
        break
      case 'Text':
          results.push(layer)
        break
      default:
        //Do Nothing
    }
  }

  return results
}

export function buildRandomOrder(ary){
  let tempAry = []
  for(let i=0; i<ary.length; i++){
    tempAry.push(i)
  }
  tempAry.sort(function(a,b){return Math.random()>0.5 ? 1 : -1})
  return tempAry
}

export function reorderArray(ary, order){
  if(ary.length === order.length){
    let tempAry = []
    for(let i=0; i<ary.length; i++){
      const oID = order[i]
      tempAry.push(ary[oID])
    }
    return tempAry
  }else{
    log("Can't reorder array, length not match")
  }
}