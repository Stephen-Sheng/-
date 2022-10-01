class EventBus{
    constructor() {
        this.eventObj = {}
        this.callbackId = 0
    }

    publish(eventName,...args){

        const callbackObj = this.eventObj[eventName]
        if(!callbackObj) throw new Error("Not found")
        for(let id in callbackObj){
            callbackObj[id](...args)
            if(id.startsWith("d")) delete this.eventObj[eventName][id]
        }
    }

    subscribe(eventName,callback){
        if(!this.eventObj[eventName]){
            this.eventObj[eventName] = {}
        }
        const id = this.callbackId++
        this.eventObj[eventName][id] = callback

        const unSubscribe = () => {

            delete this.eventObj[eventName][id]

            if(!Object.keys(this.eventObj[eventName]).length){
                delete this.eventObj[eventName]
            }
        }
        return {unSubscribe}
    }
    subscribeOnce(eventName,callback){
        if(!this.eventObj[eventName]){
            this.eventObj[eventName] = {}
        }
        const id = "d" + this.callbackId++
        this.eventObj[eventName][id] = callback

        const unSubscribe = () => {

            delete this.eventObj[eventName][id]

            if(!Object.keys(this.eventObj[eventName]).length){
                delete this.eventObj[eventName]
            }
        }
        return {unSubscribe}
    }
    clear(eventName){
        if(!eventName) this.eventObj = {}
        else delete this.eventObj[eventName]
    }

}

// 测试
const eventBus = new EventBus();

// 订阅事件eventX
eventBus.subscribe("eventX", (obj, num) => {
  console.log("模块A", obj, num);
});
eventBus.subscribe("eventX", (obj, num) => {
  console.log("模块B", obj, num);
});
const subscriberC = eventBus.subscribe("eventX", (obj, num) => {
  console.log("模块C", obj, num);
});

// 发布事件eventX
eventBus.publish("eventX", { msg: "EventX published!" }, 1);

// 模块C取消订阅
subscriberC.unSubscribe();

// 再次发布事件eventX，模块C不会再收到消息了
eventBus.publish("eventX", { msg: "EventX published again!" }, 2);
