const arr = [10,3,4,11,32,5,-4,-7,12,33,42,12,32,43,22]

const quickSort = ( arr ) => {
    if( arr.length < 2 ) return arr
    let left = []
    let right = []
    let pivotInd = 0
    let pivot = arr[pivotInd]
    for( let i = 0; i < arr.length; i++ ) {
        if( i !== pivotInd ) {
            if( arr[ i ] > pivot ) {
                right.push( arr[i] )
            } else {
                left.push( arr[i] )
            }
        }
    }
    return [ ...sort(left), pivot, ...sort(right) ]
}

const sortBubble = ( arr ) => {
    for( let j = 0; j < arr.length; j++ ) {
        for( let i = 0; i < arr.length - 1 - j; i++ ) {
            if( arr[i] > arr[i+1] ) {
                let buff = arr[i]
                arr[i] = arr[i + 1]
                arr[i+1] = buff
            }
        }
    }
    return arr
}

const sortInsertion = ( arr ) => {
    for( let i = 1; i < arr.length; i++ ) {
        let current = arr[i]
        let j = i;
        while( j > 0 && arr[j - 1] > current) {
            arr[j] = arr[j - 1]
            j--
        }
        arr[j] = current
    }
    return arr
}

const selectionSort = ( arr ) => {
    for( let i = 0; i < arr.length; i++ ) {
        let minIndex = i
        for( let j = i + 1; j < arr.length; j++ ) {
            if( arr[j] < arr[minIndex] ) {
                minIndex = j
            }
        }
        const buff = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = buff
    }
    return arr
}


// console.log(sortBubble(arr));
// console.log(sortInsertion(arr));
console.log(selectionSort(arr));
// console.log(arr);