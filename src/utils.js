import { DPI_HEIGHT, PENDING, DPI_WIDTH, ROWS_COUNT, VIEW_HEIGHT, RADIUS_CIRCLE } from './constans.js'

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function circle(ctx, [x,y], color) {
  ctx.beginPath()
  ctx.fillStyle="#fff"
  ctx.strokeStyle=color
  ctx.arc(x,y,RADIUS_CIRCLE,0,2*Math.PI)
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
}

export function getBoundaries( { columns, types } ) {
    let valuesY = []
    columns.forEach( column => {
        if( types[column[0]] !== 'line' ) {
            return
        }
        valuesY.push(...column.slice(1))
    });
    return [Math.min(...valuesY), Math.max(...valuesY)]
}

export function toDate(timestamp, withDay) {
  const date = new Date(timestamp)
  if (withDay) {
    return `${shortDays[date.getDay()]}, ${shortMonths[date.getMonth()]} ${date.getDate()}`
  }
  return `${shortMonths[date.getMonth()]} ${date.getDate()}`
}

export function line( ctx, coords, { color } ) {
    ctx.beginPath()
    ctx.lineWidth = 4
    ctx.strokeStyle = color
    
    for( let [x, y] of coords ) {
        ctx.lineTo( x, y )
    }
        
    ctx.stroke()
    ctx.closePath()
}

export function toCoords(xRatio, yRatio, height) {
    return( y, ind ) => {
      return [
          Math.floor((ind - 1)*xRatio),
          Math.floor(height - PENDING - y*yRatio),
      ]
  }
  }
  
export  function isOver(mouse, x, length) {
    if( !mouse ) {
      return false
    }
    // console.log(mouse.x, x);
    const width = DPI_WIDTH/length
    return Math.abs(mouse.x - x) < width/2
  }

export function yAxis( 
    ctx, 
    maxY, 
    minY
    ) {
    const step = VIEW_HEIGHT / ROWS_COUNT
    const textStep = (maxY - minY) / ROWS_COUNT
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle="#cee"
    ctx.fillStyle = "#234"
    ctx.font = "22px sans-serif"
    for( let i = 1; i <= ROWS_COUNT; i++ ) {
        const y = step * i
        ctx.moveTo(0, y + PENDING)
        ctx.lineTo( DPI_WIDTH, y + PENDING )
        const text = Math.round( maxY - textStep * i )
        ctx.fillText( text, 5, y + PENDING - 10 )
    }
    ctx.stroke()
    ctx.closePath()
}

export function xAxis( ctx, data, xRatio, { mouse } ) {
    let count = 6
    let step = Math.round( data.length / count ) 
    ctx.beginPath()
    ctx.fillStyle = "#234"
    ctx.font = "22px sans-serif"
    for( let i = 1; i < data.length; i++ ) {
      const x = i * xRatio
      if( (i - 1) % step === 0 ) {
        const text = toDate( data[i-1] )
        ctx.fillText( text , x, DPI_HEIGHT - 10 )
      }
      if( isOver(mouse, x, data.length ) ) {
        // console.log('over');
        ctx.save()
        ctx.moveTo( x, PENDING )
        ctx.lineTo( x, DPI_HEIGHT - PENDING )
        ctx.restore()
      }
    }
    ctx.stroke()
    ctx.closePath()
}