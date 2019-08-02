function getFormatFromAbi(eventName,ABIList)
{
  for(var i=0;i<ABIList.length;i++)
  {
    // console.log(ABIList[i].name);
    if(ABIList[i].name==eventName){
      return ABIList[i]["inputs"]
    }
  }
  return []
}

export default getFormatFromAbi