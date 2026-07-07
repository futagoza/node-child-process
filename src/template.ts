export function preprocess( strings: string | string[], values: unknown[] ) {

    if ( typeof strings === "string" ) strings = [ strings ]

    let output = ""

    strings.forEach( ( string, i ) => {

        output += string
        if ( values[ i ] ) output += values[ i ]

    } )

    return output

}
