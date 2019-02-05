import PrototypeTetromino from './prototype_tetrominoes/PrototypeTetromino.js'
// I J L O S T Z
var prototype_tetrominoes=new Array(7)
prototype_tetrominoes[0]=new PrototypeTetromino(
0,'#00FFFF'/*Aqua*/,4,-2,'I',[
    [[0,0],[-1,0],[+2,0],[-1,+2],[+2,-1]],
    [[0,0],[-2,0],[+1,0],[-2,-1],[+1,+2]],
    [[0,0],[+2,0],[-1,0],[+2,+1],[-1,-2]],
    [[0,0],[-1,0],[+2,0],[-1,+2],[+2,-1]],
    [[0,0],[+1,0],[-2,0],[+1,-2],[-2,+1]],
    [[0,0],[+2,0],[-1,0],[+2,+1],[-1,-2]],
    [[0,0],[-2,0],[+1,0],[-2,-1],[+1,+2]],
    [[0,0],[+1,0],[-2,0],[+1,-2],[-2,+1]],
]);
prototype_tetrominoes[1]=new PrototypeTetromino(
1,'#0000FF'/*Standard Blue*/,3,-1,'J',[
    [[0,0],[+1,0],[+1,+1],[0,-2],[+1,-2]],
    [[0,0],[-1,0],[-1,+1],[0,-2],[-1,-2]],
    [[0,0],[+1,0],[+1,-1],[0,+2],[+1,+2]],
    [[0,0],[+1,0],[+1,-1],[0,+2],[+1,+2]],
    [[0,0],[-1,0],[-1,+1],[0,-2],[-1,-2]],
    [[0,0],[+1,0],[+1,+1],[0,-2],[+1,-2]],
    [[0,0],[-1,0],[-1,-1],[0,+2],[-1,+2]],
    [[0,0],[-1,0],[-1,-1],[0,+2],[-1,+2]],
]);
prototype_tetrominoes[2]=new PrototypeTetromino(
2,'#FFA500'/*Standard Orange*/,3,-1,'L',prototype_tetrominoes[1].wallkickdata);
prototype_tetrominoes[3]=new PrototypeTetromino(
3,'#FFFF00'/*Standard Yellow*/,2,0,'O',[
    [[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0]],
]);
prototype_tetrominoes[4]=new PrototypeTetromino(
4,'#00FF00'/*Standard Lime*/,3,-1,'S',prototype_tetrominoes[1].wallkickdata);
prototype_tetrominoes[5]=new PrototypeTetromino(
5,'#800080'/*Standard Purple*/,3,-1,'T',prototype_tetrominoes[1].wallkickdata);
prototype_tetrominoes[6]=new PrototypeTetromino(
6,'#FF0000'/*Standard Red*/,3,-1,'Z',prototype_tetrominoes[1].wallkickdata);
export default prototype_tetrominoes
