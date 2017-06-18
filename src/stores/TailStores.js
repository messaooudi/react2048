import dispatcher from '../Dispatcher.js'
import { EventEmitter } from "events";

let tails = [];
let history = [];
class TailStore extends EventEmitter {
    constructor() {
        super()
        dispatcher.register((payload) => {
            history.push(tails);
            switch (payload.type) {
                case 'CREATE':
                    tails.push(payload.tail)

                    break;
                case 'MOVE':
                    tails[tails.indexOf(payload.tail)] = payload.tail;
                    break;
                case 'REMOVE':
                    tails = tails.filter(tail => tail.id !== payload.tail.id)
                    break;
                case 'CLEAR':
                    tails = []
                    break;
                default:
                    return;
            }
            this.emit('TAILS_CHANGE');
        })
    }
    addChangeListener(callback) {
        this.on('TAILS_CHANGE', callback)
    }
    removeChangeListener(callback) {
        this.removeListener('TAILS_CHANGE', callback);
    }
    getTails() {
        return tails;
    }
    getHistory() {
        let t = history.pop();
        t = t || tails
        return t
    }
}
export default new TailStore();