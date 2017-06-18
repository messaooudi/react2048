import dispatcher from '../Dispatcher.js'

class TailsActions{
    create(tail){
        dispatcher.dispatch({type : 'CREATE',tail : tail});
    }
    update(tail){
        dispatcher.dispatch({type : 'MOVE',tail : tail});
    }
    remove(tail){
        dispatcher.dispatch({type : 'REMOVE',tail : tail});
    }
    clear(){
        dispatcher.dispatch({type : 'CLEAR'});
    }
}
const TailsAction = new TailsActions()
export default TailsAction;