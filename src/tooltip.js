export function template( data ) {
    /*html*/
    return `
        <div class="date">${data.title}</div>
        <div class="data">
            ${data.items.map( item => `<div class="data__item" style="color: ${item.color};">${item.value}</div>`).join('')}
        </div>
    `
}


export const tooltip = ($el) => {
    const clear = () => $el.innerHTML = ''
    return {
        hide() {
            $el.style.display = 'none'
        },
        
        show({ left, top }, data) {
            clear()
            const { height, width } = $el.getBoundingClientRect()
            $el.style.display = 'block'
            $el.style.top = ( top - height ) + 'px'
            $el.style.left = ( left + width / 2 ) + 'px'
            $el.insertAdjacentHTML('afterbegin', template( data ))
        },
    
    }
}    