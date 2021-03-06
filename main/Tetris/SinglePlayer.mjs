import doe from                     '../../lib/doe/main/doe.mjs'
import Game from                    './Game.mjs'
import God from                     './God.mjs'
import Ui from                      './Ui.mjs'
function SinglePlayer(){
    this._game=new Game
    this._game.god={
        getNext:choice=>this._queue.push(()=>this._god.getNext(choice)),
    }
    this._game.ui={
        set:set=>this._setUi[set[0]]=set[1],
    }
    this._god=new God
    this._god.game={
        setNext:next=>this._queue.push(()=>this._inGame(['setNext',next])),
    }
    this._ui=new Ui
    this._ui.game={
        in:(t,event)=>{
            this._now=t-this._start
            this._inGame(event)
        },
    }
    this._setUi={}
    this._queue=[]
    this.ui=this._ui.node
}
SinglePlayer.prototype._outQueue=function(){
    for(;this._queue.length;)
        this._queue.shift()()
}
SinglePlayer.prototype._inGame=function(a){
    this._game.in([this._now,...a])
    this._outQueue()
}
SinglePlayer.prototype.start=function(t){
    this._start=t
    this._now=0
    this._god.getNext(this._game.status.godChoice)
    this._outQueue()
}
SinglePlayer.prototype.focus=function(){
    this._ui.node.focus()
}
SinglePlayer.prototype.processAnimationFrame=function(t){
    this._now=t-this._start
    this._game.to(this._now)
    this._outQueue()
    this._ui.set(this._setUi)
    this._setUi={}
}
Object.defineProperty(SinglePlayer.prototype,'image',{set(image){
    this._ui.image=image
}})
export default SinglePlayer
