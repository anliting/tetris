module.export=function(tetromino){
    for(var r=0;r<tetromino.prototype.size;r++)
        for(var c=0;c<tetromino.prototype.size;c++)
            if(tetromino.prototype.array[tetromino.direction]
                [r][c]!=0)
                this.array[tetromino.x+c]
                    [tetromino.y+(tetromino.prototype.size-1-r)]
                    =tetromino.prototype.color;
    setTimeout(()=>{this.update()},125)
}
