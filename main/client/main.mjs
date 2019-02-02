import doe from '../../lib/doe.mjs'
import Tetris from './main/Tetris.js'
let tetris=new Tetris
doe.html(
    n=>{doe(n.style,{
        height:'100%',
    })},
)
doe.body(
    n=>{doe(n.style,{
        height:'100%',
        margin:'0',
    })},
    doe.div(
        n=>{doe(n.style,{
            display:'table',
            width:'100%',
            height:'100%',
        })},
        doe.div(
            n=>{doe(n.style,{
                display:'table-cell',
                verticalAlign:'middle',
                textAlign:'center',
                lineHeight:'0',
            })},
            doe.div(
                n=>{doe(n.style,{
                    display:'inline-block',
                    position:'relative',
                    backgroundColor:'darkgray',
                    lineHeight:'1',
                })},
                tetris.view
            )
        )
    )
)
tetris.setup()