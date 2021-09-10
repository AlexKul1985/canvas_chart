import { WIDTH, HEIGHT, DPI_HEIGHT, DPI_WIDTH, VIEW_HEIGHT, VIEW_WIDTH } from './constans.js'
import { tooltip } from './tooltip.js'
import { getBoundaries, xAxis, yAxis, line, isOver, toCoords, circle, toDate } from './utils.js'

export function chart( root, data = {} ) {
  const canvas = root.querySelector('canvas')
  let raf
  let tip = tooltip(root.querySelector('[data-el="tooltip"]'))
  canvas.style.width = WIDTH + 'px'
  canvas.style.height = HEIGHT + 'px'
  canvas.height = DPI_HEIGHT
  canvas.width = DPI_WIDTH
  const ctx = canvas.getContext('2d');
  canvas.addEventListener('mousemove',mousemove)
  canvas.addEventListener('mouseleave',mouseleave)
  
  const proxy = new Proxy({}, {
    set(...args) {
      raf = requestAnimationFrame(paint)
      return Reflect.set(...args)
    }
  })
  
  function clear() {
    ctx.clearRect(0,0,DPI_WIDTH,DPI_HEIGHT)
  }
  
  function mouseleave() {
    proxy.mouse = null
    tip.hide()
  }
  
  function mousemove({ clientX, clientY }) {
    const { left, top } = canvas.getBoundingClientRect()
    proxy.mouse = {
      x: (clientX - left)*2,
      tooltip: {
        left: clientX - left,
        top: clientY - top
      }
    }
  }
  
  function paint() {
    clear()
    const [ minY, maxY ] = getBoundaries(data)
    const yRatio = VIEW_HEIGHT /  ( maxY - minY )
    const xRatio = VIEW_WIDTH / (data.columns[0].length - 2)
    const timestamps = data.columns[0].slice(1)
    yAxis(
      ctx, 
      maxY, 
      minY,
      )
    xAxis(
      ctx, 
      timestamps, 
      xRatio, 
      proxy
      )
      
    const dataY = data.columns.map( column => {
      if( data.types[column[0]] !== 'line' ) {
        return
      }
      return column
    })
    dataY.forEach(( coords ) => {
      if( Array.isArray( coords ) ) {
        const xyCoords = coords.map( 
          toCoords( xRatio, yRatio,DPI_HEIGHT ) 
          ).filter( (_,i) => i > 0 )
          const type = coords[0]
          line(
            ctx, 
            xyCoords, 
            { color: data.colors[type] }
            )
            xyCoords.forEach( ( [x,y], ind ) => {
              if( isOver( proxy.mouse, x, xyCoords.length) ) {
                circle( ctx, [x,y], data.colors[type])
                tip.show(proxy.mouse.tooltip, {
                  title: toDate( timestamps[ind], true ),
                  items: dataY.slice(1).map( ( v ) => v.filter( (_, i) => i == ind + 1) ).map( (value,index) => ({
                    value,
                    color: data.colors[data.columns.slice(1)[index][0]],
                  }))
                })
              }
            }
            )
                
          }
        })
        }
        
        return {
          destroy() {
            cancelAnimationFrame(raf)
            canvas.removeEventListener('mousemove',mousemove)
            canvas.removeEventListener('mouseleave',mouseleave)
          },
          init() {
            paint()
          }
        }
      }
      