import { WIDTH_SLIDER, HEIGHT_SLIDER, DPI_HEIGHT_SLIDER, DPI_WIDTH_SLIDER, VIEW_HEIGHT_SLIDER, VIEW_WIDTH_SLIDER } from './constans.js'

import { getBoundaries, line, toCoords } from './utils.js'

export function slider( root, data = {} ) {
  const canvas = root.querySelector('canvas')
  const slider = document.querySelector('[data-type="slider"]')
  
  slider.addEventListener('mousedown',mousedown)
  canvas.style.width = WIDTH_SLIDER + 'px'
  canvas.style.height = HEIGHT_SLIDER + 'px'
  canvas.height = DPI_HEIGHT_SLIDER
  canvas.width = DPI_WIDTH_SLIDER
  const ctx = canvas.getContext('2d');

  function mousedown(e) {
    if( e.target.dataset.type === 'resize' ) {
      const $el = e.target.closest('[data-el]')
      // console.log($el.dataset.el);
      if( $el.dataset.el === 'left' ) {
        // $el.style.left = `calc( 2px - 45% + ${e.offsetX}px)`
        slider.onmousemove = ( e ) => {
          // console.log(e.offsetX);
          $el.style.left = `calc( 2px - 45% + ${e.offsetX}px)`
        }
        slider.onmouseup = ( e ) => {
          $el.style.left = `calc( 2px - 45% + ${e.offsetX}px)`
          // $el.style.width = e.offsetX + 'px'
          slider.onmousemove = null
        }
      } else if( $el.dataset.el === 'right' ) {
        slider.onmousemove = ( e ) => {
          // $el.style.width = ( WIDTH_SLIDER - e.offsetX ) + 'px'
        }
        slider.onmouseup = ( e ) => {
          // $el.style.width = ( WIDTH_SLIDER - e.offsetX ) + 'px'
          slider.onmousemove = null
        }
      }
    } else if( e.target.dataset.el === 'window' ){
      // console.log(e.target.dataset.el);
    }
  }

  function paint() {
    
    const [ minY, maxY ] = getBoundaries(data)
    const yRatio = VIEW_HEIGHT_SLIDER /  ( maxY - minY )
    const xRatio = VIEW_WIDTH_SLIDER / (data.columns[0].length - 2)
   
      
    const dataY = data.columns.map( column => {
      if( data.types[column[0]] !== 'line' ) {
        return
      }
      return column
    })

    dataY.forEach(( coords ) => {
      if( Array.isArray( coords ) ) {
        const xyCoords = coords.map( 
          toCoords( xRatio, yRatio, DPI_HEIGHT_SLIDER + 80 ) 
          ).filter( (_,i) => i > 0 )
          const type = coords[0]
          line(
            ctx, 
            xyCoords, 
            { color: data.colors[type] }
            )
          }
        })
        }
        
        return {
          init() {
            paint()
          }
        }
      }
      