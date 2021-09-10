import './styles.sass'
import { chart } from './chart.js'
import { slider } from './slider.js'
import { getChartData } from './data.js' 

const mainChart = document.querySelector('.main-chart');
const sliderEl = document.querySelector('.slider');

const telegramChart = chart(mainChart, getChartData())
const sliderChart = slider(sliderEl, getChartData())

telegramChart.init()
sliderChart.init()

function groupBy( arr, prop ) {
    const isFunc = typeof prop === 'function'
    return arr.reduce( ( group, item ) => {
        const key = isFunc ? prop(item) : item[prop]
        if( !(key in group) ) {
            group[key] = [] 
        }
        group[key].push(item) 
        return group
    }, {} )
}


function differenceBy( firstArr, secondArr, prop ) {
    const isFunc = typeof prop === 'function'
    return [
        ...firstArr
        .filter( 
            valueFirst => !secondArr.map( 
                val => isFunc ? prop(val) : val[prop]
                ).includes(
                    isFunc ? prop(valueFirst) : valueFirst[prop]
                    ) ),
        ...secondArr
        .filter( 
            valueSecond => !firstArr.map( 
                val => isFunc ? prop(val) : val[prop]
                ).includes(
                    isFunc ? prop(valueSecond) : valueSecond[prop]
                    ) ),
    ]
}
function intersectionBy( firstArr, secondArr, prop ) {
    const isFunc = typeof prop === 'function'
    return firstArr
            .filter( 
            valueFirst => secondArr.map( 
                val => isFunc ? prop(val) : val[prop]
                ).includes(
                    isFunc ? prop(valueFirst) : valueFirst[prop]
                    ) )
            }
        
    

console.log(intersectionBy([{ 'x': 2,y:9 }], [{ x: 2, y: 9 },{ 'x': 1, y: 78 }], 'y'));
console.log(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor));
class Node {
    constructor(name) {
        this.name = name
        this.visited = false
    }
}
const A = new Node('A')
const B = new Node('B')
const C = new Node('C')
const D = new Node('D')
const F = new Node('F')

const adj = new Map
adj.set( A, [C,F])
adj.set( C, [D])

function dfs(adj, s, t ) {
    if( s.name === t.name ) return true
    if( s.visited ) return false

    s.visited = true
    const childs = adj.get(s)
    if( !childs ) return false
    for( let neighbor of childs ) {
        if( !neighbor.visited ) {
            let reached = dfs(adj, neighbor, t)
            if(reached) return true
        }
    }
    return false
}

function bfs(adj, s, t) {
    let queue = [];
    queue.push(s)

    s.visited = true
    while(queue.length > 0) {
        let s = queue.shift()
        const childs = adj.get(s)
        if( !childs ) return false
        for( let neighbor of childs ) {
            if( !neighbor.visited ) {
                queue.push(neighbor)
                neighbor.visited = true
                if( neighbor === t ) return true
            }
        }
    }
    return false
}

console.log(bfs(adj,A,D));