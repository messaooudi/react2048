class Dispatcher {
    constructor(){
        this.id = 0
        this.callbacks = {}
    }
    register(callback){
        this.callbacks[0] = callback;
        return this.id++;
    }
    unregister(id){
        delete this.callbacks[id]
    }
    dispatch(payload){
            for(let i in this.callbacks){
                this.callbacks[i](payload);
            }
        }  
}

const dispatcher = new Dispatcher();
export default dispatcher;