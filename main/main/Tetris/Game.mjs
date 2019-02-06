import Board from                   './Game/Board.mjs'
import constant from                './constant.mjs'
let initialY=[-2,-1,-1,0,-1,-1,-1]
function Game(){
    this._history=[]
    this.status={
        godChoice:[0,0,0,0,0,0,0],
    }
    this.board=new Board
}
Game.prototype._setCurrent=function(type){
    this.status.current={
        type,
        direction:0,
        x:5+Math.floor(-constant.shape[type][0].length/2),
        y:20+initialY[type],
    }
}
Game.prototype._setNext=function(next){
    if(this.status.current==undefined)
        this._setCurrent(next)
    else
        this.status.next=next
    this.status.godChoice[next]=1
    if(this.status.godChoice.reduce((a,b)=>a+b)==7)
        this.status.godChoice=[0,0,0,0,0,0,0]
    if(this.status.next==undefined)
        this.god.getNext(this.status.godChoice)
}
Game.prototype._hold=function(){
    if(typeof this.status.hold=='undefined'){
        this.status.hold=this.status.current.type
        this.getCurrent()
    }else{
        let temp=this.status.hold
        this.status.hold=this.status.current.type
        this._setCurrent(temp)
    }
}
Game.prototype._rotate=function(mode){
    /*
     *  Rotate the tetromino with given mode.
     *  Return value: Return the order of wallkick if success,
     *      otherwise return 5.
     */
    let dd=mode==0?-1:1,wk=constant.srsWallKick[this.status.current.type][2*this.status.current.direction+mode]
    for(let i=0;i<5;i++)

        if(this.transfer(
            wk[i][0],
            wk[i][1],
            dd
        )==0)
            return i
    return 5
}
Game.prototype.in=function(event){
console.log(event)
    this._history.push(event)
    switch(event[1]){
        case'setNext':
            this._setNext(event[2])
            break
        case'key':
            switch(event[2]){
                case'C':
                case'c':
                    this._hold()
                break
                case'Z':
                case'z':
                    this._rotate(0)
                break
                case'ArrowUp':
                case'X':
                case'x':
                    this._rotate(1)
                break
            }
    }
}
Game.prototype.drop=function(){
    this.board.put(
        this.status.current.type,
        this.status.current.direction,
        this.status.current.x,
        this.status.current.y,
    )
    this.board.update()
    this.getCurrent()
}
Game.prototype.valid_transfer=function(dx,dy,dd){
    let
        direction_new=((this.status.current.direction+dd)%4+4)%4,
        shape=constant.shape[this.status.current.type][direction_new],
        n=shape.length
    for(let r=0;r<n;r++)
    for(let c=0;c<n;c++)
    if(shape[r][c]){
        let x=this.status.current.x+dx+c
        let y=this.status.current.y+dy+n-1-r
        if(!(
            0<=x&&x<10&&0<=y&&y<24&&
            this.board.array[x][y]==undefined
        ))
            return 0
    }
    return 1
}
Game.prototype.transfer=function(dx,dy,dd){
    if(!this.valid_transfer(dx,dy,dd))
        return 1
    this.status.current.x+=dx
    this.status.current.y+=dy
    this.status.current.direction=((this.status.current.direction+dd)%4+4)%4
    return 0
}
Game.prototype.getCurrent=function(){
    if(this.status.next==undefined)
        return
    this._setCurrent(this.status.next)
    delete this.status.next
    this.god.getNext(this.status.godChoice)
}
export default Game