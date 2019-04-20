let search_ticker = async ( ticker ) => {

    let data = await retrieve_ticker_info( ticker )
    
    console.log( 'data', data)
}

let retrieve_ticker_info = async ( ticker ) => {

    return new Promise( resolve => {

        const TIME_TIL_REFRESH = 12 * 60 * 60 * 1000
        let time_series_type = 'TIME_SERIES_DAILY_ADJUSTED'
        let data = JSON.parse( localStorage.getItem( `${ticker}` ) )

        if ( !data || Date.now() > data.timestamp + TIME_TIL_REFRESH ) {
            console.log('FETCHING NEW INFO')
            fetch( `${ALPHA_VANTAGE_API_URL}function=${time_series_type}&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}` )
                .then( res => res.json() )
                .then( res => {
                    data = { ...res, timestamp: Date.now() }
                    localStorage.setItem( `${ticker}`, JSON.stringify( data ) )

                    console.log(' RESOLVING DATA')
                    resolve( data )
                })
        } else {

            resolve( data )
        }
    })
}

let build_tables = ( d ) => {

    // Build Table1
    let table1 = s('.table1')

    let str = `
        <tr>
            <th>Date</th>
            <th>Open Price</th>
            <th>High Price</th>
            <th>Low Price</th>
            <th>Close Price</th>
            <th>Volume</th>
        </tr>
    `
    for ( let i = 0; i < d.date.length; i++ ) {

        str += `
            <tr>
                <td>${format_date(d.date[i])}</td>
                <td>${parseFloat(d.open_price[i]).toFixed(2)}</td>
                <td>${parseFloat(d.high_price[i]).toFixed(2)}</td>
                <td>${parseFloat(d.low_price[i]).toFixed(2)}</td>
                <td>${parseFloat(d.close_price[i]).toFixed(2)}</td>
                <td>${format_number(parseInt(d.vol[i]))}</td>
            </tr>
        `
    }

    table1.innerHTML = str

    // Build Table2
    let table2 = s('.table2')
    str = `
        <tr>
            <th>Formatted Open Price</th>
            <th>Formatted Close Price</th>
            <th>Difference EOD</th>
        </tr>
    `
    for ( let i = 0; i < d.date.length; i++ ) {

        let value = d.close_price_formatted[i] - d.open_price_formatted[i]
        let res = value <= 0 ? 'negative' : 'positive'

        str += `
            <tr>
                <td>${d.open_price_formatted[i].toFixed(2)}</td>
                <td>${d.close_price_formatted[i].toFixed(2)}</td>
                <td class='${res}'>${(d.close_price_formatted[i] - d.open_price_formatted[i]).toFixed(2)}</td>
            </tr>
        `
    }

    table2.innerHTML = str


}

let build_chart = ( d, days = 20 ) => {

    days = days > d.date.length ? d.date.length : days

    console.log('build chart firing with data:', d)
    let ctx = s('.main-chart').getContext('2d')
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: d.date.slice(d.date.length-days, d.date.length),
            datasets: [{
                label: 'Open Price',
                data: d.open_price.slice(d.open_price.length-days, d.open_price.length),
                fill: false,
                borderColor: 'black',
                lineTension: 0
            }, {
                label: 'Close Price',
                data: d.close_price.slice(d.close_price.length-days, d.close_price.length),
                fill: false,
                borderColor: 'gray',
                lineTension: 0
            }]

        },
        options: {
            title: {
                display: true,
                text: `SPY chart for the last ${ days } days`
            }
        }
    })

    console.log( chart )
}

let build_predictions = ( d ) => {

    let avg;
    let accumulator = 0

    for ( let i = 0; i < d.date.length; i++ ) {
        accumulator += d.close_price_formatted[i] - d.open_price_formatted[i]
    }

    avg = accumulator/d.date.length

    let contents = s('.prediction-contents')
    
    let str = `
        <p>Reginald thinks that the stock will go ${ avg <= 0 ? '<span class="negative">DOWN</span>' : '<span class="positive">UP</span>' } within the next trading EOD.</p>
        <p>Reginald sees a ${ avg.toFixed(2) }% change</p>
    `


    contents.innerHTML = str

    console.log( 'average:', avg )

}

let csv = Papa.parse( csv_data ).data

let data = {
    date: [],
    open_price: [],
    open_price_formatted: [],
    high_price: [],
    low_price: [],
    close_price: [],
    adjusted_close_price: [],
    close_price_formatted: [],
    difference_eod: [],
    difference_eod_formatted: [],
    vol: []
}

let highest_open_price, lowest_open_price,
    highest_high_price, lowest_high_price,
    highest_low_price, lowest_low_price,
    highest_close_price, lowest_close_price,
    highest_eod_price, lowest_eod_price

for ( let i in csv ) {

    data.date.push( csv[ i ][ 0 ] )

    // OPEN PRICE
    data.open_price.push( csv[ i ][ 1 ] )
    if ( highest_open_price ) {
        if ( csv[ i ][ 1 ] > highest_open_price ) highest_open_price = csv[ i ][ 1 ]
    } else {
        highest_open_price = csv[ i ][ 1 ]
    }
    if ( lowest_open_price ) {
        if ( csv[ i ][ 1 ] < lowest_open_price ) lowest_open_price = csv[ i ][ 1 ]
    } else {
        lowest_open_price = csv[ i ][ 1 ]
    }
    
    // HIGH PRICE
    data.high_price.push( csv[ i ][ 2 ] )

    // LOW PRICE
    data.low_price.push( csv[ i ][ 3 ] )

    // CLOSE PRICE
    data.close_price.push( csv[ i ][ 4 ] )
    if ( highest_close_price ) {
        if ( csv[ i ][ 4 ] > highest_close_price ) highest_close_price = csv[ i ][ 4 ]
    } else {
        highest_close_price = csv[ i ][ 4 ]
    }
    if ( lowest_close_price ) {
        if ( csv[ i ][ 4 ] < lowest_close_price ) lowest_close_price = csv[ i ][ 4 ]
    } else {
        lowest_close_price = csv[ i ][ 4 ]
    }

    data.vol.push( csv[ i ][ 6 ] )

}

for ( let i in data.open_price ) {
    data.open_price_formatted[i] = 1 - Math.abs((data.open_price[i] - highest_open_price)/(highest_open_price - lowest_open_price))
}

for ( let i in data.close_price) {
    data.close_price_formatted[i] = 1 - Math.abs(( data.close_price[i] - highest_close_price)/(highest_close_price - lowest_close_price))
    data.difference_eod[i] = data.close_price_formatted[i] - data.open_price_formatted[i]
}

for ( let i in data.difference_eod ) {

    if ( highest_eod_price ) {
        if ( data.difference_eod[i] > highest_eod_price ) highest_eod_price = data.difference_eod[i]
    } else {
        highest_eod_price = data.difference_eod[i]
    }

    if ( lowest_eod_price ) {
        if ( data.difference_eod[i] < lowest_eod_price ) lowest_eod_price = data.difference_eod[i]
    } else {
        lowest_eod_price = data.difference_eod[i]
    }
}

for ( let i in data.difference_eod ) {
    data.difference_eod_formatted[i] = (data.difference_eod[i] - highest_eod_price )/(highest_eod_price - lowest_eod_price)
}

build_tables( data )
build_chart( data )
build_predictions( data )


s('form#ticker_form').addEventListener('submit', (e) => {

    e.preventDefault()
    let input = s('input')


    search_ticker( input.value )

    input.value = ''

})