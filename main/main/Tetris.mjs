import prototype_tetrominoes from   './Tetris/prototype_tetrominoes.js'
import Tetromino from               './Tetris/Tetromino.js'
import listenToKeys from            './Tetris/Tetris.prototype.listenToKeys.js'
import Game from                    './Tetris/Game.mjs'
import God from                     './Tetris/God.mjs'
import doe from                     '../../lib/doe.mjs'
import constant from                './Tetris/constant.mjs'
let color=[
    '#00FFFF',  // Aqua
    '#0000FF',  // Standard Blue
    '#FFA500',  // Standard Orange
    '#FFFF00',  // Standard Yellow
    '#00FF00',  // Standard Lime
    '#800080',  // Standard Purple
    '#FF0000',  // Standard Red
]
function Tetris(){
    this._uiDrawStatistics={
        history:[],
        start:performance.now(),
        frameCount:0,
        frameTime:0,
    }
    this._game=new Game
    this._game.god={
        getNext:choice=>{
            this._god.getNext(choice)
        },
    }
    this._game.getCurrent=()=>{
        if(this._game.status.next==undefined)
            return
        this._game._setCurrent(this._game.status.next)
        delete this._game.status.next
        this._game.god.getNext(this._game.status.godChoice)
    }
    this._game.hold=()=>{
        if(typeof this._game.status.hold=='undefined'){
            this._game.status.hold=this._game.status.current.type
            this._game.getCurrent()
        }else{
            let temp=this._game.status.hold
            this._game.status.hold=this._game.status.current.type
            this._game._setCurrent(temp)
        }
    }
    this._god=new God
    this._god.game={
        setNext:next=>{
            this._game.setNext(next)
        },
    }
    this._uiCache={}
    this._tetromino=new Tetromino(prototype_tetrominoes[0])
    this._game.drop=function(){
        this.board.put(
            this.status.current.type,
            this.status.current.direction,
            this.status.current.x,
            this.status.current.y,
        )
        setTimeout(()=>{this.board.update()},200)
        this.getCurrent()
    }
    this._game.valid_transfer=function(dx,dy,dd){
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
    this._game.transfer=function(dx,dy,dd){
        if(!this.valid_transfer(dx,dy,dd))
            return 1
        this.status.current.x+=dx
        this.status.current.y+=dy
        this.status.current.direction=((this.status.current.direction+dd)%4+4)%4
        return 0
    }
    this._tetromino.rotate=mode=>{
        /*
         *  Rotate the tetromino with given mode.
         *  Return value: Return the order of wallkick if success,
         *      otherwise return 5.
         */
        let dd=mode==0?-1:1,wk=constant.srsWallKick[this._game.status.current.type][2*this._game.status.current.direction+mode]
        for(let i=0;i<5;i++)

            if(this._game.transfer(
                wk[i][0],
                wk[i][1],
                dd
            )==0)
                return i
        return 5
    }
    this._tetromino.softdrop=()=>{
        if(this._game.transfer(0,-1,0))
            return 1
        this._tetromino.reset_autofall()
        return 0
    }
    this._tetromino.harddrop=()=>{
        while(this._game.transfer(0,-1,0)==0);
        this._game.drop()
    }
    this._tetromino.autofall=()=>{
        this._tetromino.set_autofall()
        if(this._game.transfer(0,-1,0))
            this._game.drop()
    }
    this._tetromino.set_autofall=()=>{
        this._tetromino.id_timeout_autofall=setTimeout(
            ()=>{this._tetromino.autofall()},
            this._tetromino.time_ms__autofall
        )
    }
    this._tetromino.unset_autofall=()=>{
        clearTimeout(this._tetromino.id_timeout_autofall)
    }
    this._tetromino.reset_autofall=()=>{
        this._tetromino.unset_autofall()
        this._tetromino.set_autofall()
    }
    this._tetromino.set_autofall()
    this.ui=doe.canvas({
        className:'tetris',tabIndex:-1,width:640,height:480
    })
    this._uiCache.context=this.ui.getContext('2d')
    listenToKeys.call(this)
    this._installation={}
}
Tetris.style=``
Tetris.prototype._drawBoardAt=function(atX,atY){
    for(let x=0;x<10;x++)
    for(let y=0;y<20;y++){
        this._uiCache.context.fillStyle=
            this._game.board.array[x][y]==undefined
        ?
            'black'
        :
            color[this._game.board.array[x][y]]
        this._uiCache.context.fillRect(atX+17*x,atY+17*(20-1-y),16,16)
    }
    if(this._game.status.current){
        let p=this._shadowPosition()
        this._drawTetrominoShapeAt(
            atX+17*p[0],
            atY+17*(20-(p[1]+constant.shape[this._game.status.current.type][0].length)),
            this._game.status.current.type,
            this._game.status.current.direction,
            'gray'
        )
        this._drawTetrominoAt(
            atX+17*this._game.status.current.x,
            atY+17*(20-(this._game.status.current.y+constant.shape[this._game.status.current.type][0].length)),
            this._game.status.current.type,
            this._game.status.current.direction
        )
    }
}
Tetris.prototype._drawTetrominoAt=function(atX,atY,id,direction=0){
    this._drawTetrominoShapeAt(atX,atY,id,direction,color[id])
}
Tetris.prototype._drawTetrominoShapeAt=function(atX,atY,id,direction,color){
    this._uiCache.context.fillStyle=color
    let
        shape=constant.shape[id][direction],
        n=shape.length
    for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(shape[r][c])
        this._uiCache.context.fillRect(atX+17*c,atY+17*r,16,16)
}
Tetris.prototype._shadowPosition=function(){
    let delta_y__shadow=0
    while(this._game.valid_transfer(0,delta_y__shadow-1,0))
        delta_y__shadow--
    return[this._game.status.current.x,this._game.status.current.y+delta_y__shadow]
}
Tetris.prototype.start=function(){
    this._start=~~performance.now()
    this._game.start()
}
Tetris.prototype.install=function(){
    let processAnimationFrame=()=>{
        let frameStart=performance.now()
        this._installation.animationFrameRequest=
            requestAnimationFrame(processAnimationFrame)
        this._uiCache.context.fillStyle='darkgray'
        this._uiCache.context.fillRect(0,0,640,480)
        this._drawBoardAt(160,80)
        if(this._game.status.next!=undefined)
            this._drawTetrominoAt(400,80,this._game.status.next)
        if(this._game.status.hold!=undefined)
            this._drawTetrominoAt(80,80,this._game.status.hold)
        let frameTime=performance.now()-frameStart
        if(1e3<=frameStart-this._uiDrawStatistics.start){
            this._uiDrawStatistics.history.push({
                start:          frameStart,
                frameCount:     this._uiDrawStatistics.frameCount,
                frameTime:      this._uiDrawStatistics.frameTime,
            })
            Object.assign(this._uiDrawStatistics,{
                start:frameStart,
                frameCount:0,
                frameTime:0,
            })
        }
        this._uiDrawStatistics.frameCount++
        this._uiDrawStatistics.frameTime+=frameTime
    }
    this._installation.animationFrameRequest=
        requestAnimationFrame(processAnimationFrame)
}
Tetris.prototype.uninstall=function(){
    cancelAnimationFrame(this._installation.animationFrameRequest)
}
export default Tetris
