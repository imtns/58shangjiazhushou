var quen=[];

function bindEvent(name,callback=new  Function()){
    quen.push({
        name,
        callback
    })
}
function emitEvent(eventName,detail){
    quen.map(({name,callback})=>{
        if(name==eventName){
            callback.call(null,detail)
        }
    })
}

module.exports={
    bindEvent,
    emitEvent
}