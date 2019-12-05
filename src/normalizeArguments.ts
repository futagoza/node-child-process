import {

    ChildProcessOptions,
    NormalizedArguments,
    UnsortedArguments,

} from "./types";

/**
 * Will return a normalized set of arguments to use with `cp.promise` based on the types:
 * 
 * - `string`: Path of the executable to run as a child process.
 * - `string[]`: Arguments to pass to the child process.
 * - `ChildProcessOptions`: Options passed to `child_process.spawn()`.
 */

export function normalizeArguments( args: UnsortedArguments ): NormalizedArguments {

    // These `null as unknown as ...` type statements are required so that typing works correctly within this function
    let command = null as unknown as string;
    let argv = null as unknown as string[];
    let options = null as unknown as ChildProcessOptions;

    args.forEach( arg => {

        if ( typeof arg === "string" ) {

            if ( command != null ) throw new TypeError( "`command` was passed multiple times!" );

            command = arg;
            return;

        }

        if ( Array.isArray( arg ) ) {

            if ( argv != null ) throw new TypeError( "`argv` was passed multiple times!" );

            argv = arg;
            return;

        }

        if ( typeof arg === "object" ) {

            if ( options != null ) throw new TypeError( "`options` was passed multiple times!" );

            options = arg;
            return;

        }

        throw new TypeError( "An unkown argument type was passed!" );

    } );

    if ( command == null ) {

        if ( options == null ) throw new TypeError( "Neither `command` or `options` were passed!" );

        command = ( options.command ?? options.file ) as string;

        if ( typeof command !== "string" ) throw new TypeError( "Neither `options.command` or `options.file` were passed!" );

    }

    if ( argv == null ) {

        if ( options == null ) throw new TypeError( "Neither `argv` or `options` were passed!" );

        argv = ( options.args ?? options.argv ) as string[];

        if ( ! Array.isArray( argv ) ) {

            argv = command.split( options.ws ?? " " );
            command = argv.shift() as string;

        }

    }

    if ( command.trim() === "" ) throw new TypeError( "`command` must not be an empty string!" );

    // Shallow-clone to ensure we don't modify consumer's `options`
    options = options ? Object.assign( {}, options ) : {};

    options.stdio = options.stdio ?? (

        options.silent === true || options.pipe === true
            ? "pipe"
            : options.inherit === true
                ? "inherit"
                : options.ignore === true
                    ? "ignore"
                    : void 0

    );

    return [ command, argv, options ];

}
