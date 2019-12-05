import { spawn } from "child_process";
import { ErrorSymbol } from "./isSpawnError";
import {

    ChildProcessOptions,
    ChildProcessResult,
    SpawnError,

} from "./types";


// Return's either a buffer or a string depending on `encoding`
function DECODE_BUFFER( data: unknown[], encoding?: string ) {

    if ( typeof encoding !== "string" ) return data.join( "" ).trim();

    const buffer = Buffer.concat( data as [] );

    return encoding === "buffer" || ! Buffer.isEncoding( encoding )
        ? buffer
        : buffer.toString( encoding );

}

/**
 * Will run `child_process.spawn()` wrapped in a `Promise`.
 * 
 * @param {String} command Path of the executable to run as a child process.
 * @param {String[]} [args] Arguments to pass to the child process.
 * @param {{}} [options] Options passed to `child_process.spawn()`.
 */

export function promise( command: string, args: string[] = [], options: ChildProcessOptions = {} ): ChildProcessResult {

    const STDIO_IS_PIPE = options.stdio === "pipe";
    const BUFFER = STDIO_IS_PIPE && options.buffer === true;
    const ENCODING = options.encoding;

    return new Promise( ( resolve, reject ) => {

        const child = spawn( command, args, options );

        let EXIT_CODE = 0;
        let EXIT_SIGNAL = null as unknown as string;
        const stdout: unknown[] = [];
        const stderr: unknown[] = [];

        /**
         * - If a string, create an error object; Otherwise assume it's an object.
         * - Attach `ErrorSymbol` to the error for use with `isSpawnError`.
         * - Attach stdio, Spawn and other usefull objects?
         * - Promise.reject
         */
        function handleError( reason: SpawnError | string ) {

            if ( typeof reason === "string" ) reason = new Error( reason ) as SpawnError;

            reason[ ErrorSymbol ] = true;
            reason.code = EXIT_CODE;
            reason.signal = EXIT_SIGNAL;
            reason.path = command;
            reason.spawnargs = args;
            reason.syscall = "spawn " + command;

            if ( BUFFER ) {

                reason.stdout = DECODE_BUFFER( stdout, ENCODING );
                reason.stderr = DECODE_BUFFER( stderr, ENCODING );

            }

            if ( child.stdout ) child.stdout.destroy();
            if ( child.stderr ) child.stderr.destroy();

            reject( reason );

        }

        if ( STDIO_IS_PIPE ) {

            child.stdout.on( "error", handleError );
            child.stderr.on( "error", handleError );

            if ( BUFFER ) {

                child.stdout.on( "data", data => stdout.push( data ) );
                child.stderr.on( "data", data => stderr.push( data ) );

            }

            if ( options.input ) {

                child.stdin.on( "error", handleError );
                child.stdin.end( options.input );

            }

        }

        child
            .on( "error", handleError )
            .on( "close", ( code, signal ) => {

                EXIT_CODE = code;
                EXIT_SIGNAL = signal;

                if ( code === 0 ) {

                    resolve( {

                        code,
                        signal,
                        path: command,
                        command,
                        args,
                        options,
                        stderr: BUFFER ? DECODE_BUFFER( stderr, ENCODING ) : void 0,
                        stdout: BUFFER ? DECODE_BUFFER( stdout, ENCODING ) : void 0,

                    } );

                    return;

                }

                handleError( `command exited with code: ${ code }` );

            } );

        if ( typeof options.ready === "function" ) options.ready( child, options );

    } );

}
