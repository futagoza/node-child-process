import { normalizeArguments } from "./normalizeArguments.ts"
import { promise } from "./promise.ts"
import { preprocess } from "./template.ts"
import type {

    ChildProcessOptions,
    ChildProcessPromise,
    UnsortedArguments,
    XCallback,

} from "../src/types.d.ts"

/**
 * Spawns a new process.
 * 
 * __NOTE:__ On `options.stdio = "pipe"` _(default)_ generated output will be buffered unless
 * the option `options.buffer` is set to _false_.
 * 
 * @param command Path of the executable to run as a child process.
 * @param argv Arguments that will be passed to the child process.
 * @param options Options passed to `child_process.spawn()`.
 */

export function spawn( command: string ): ChildProcessPromise
export function spawn( command: string, options: ChildProcessOptions ): ChildProcessPromise
export function spawn( command: string, argv: string[] ): ChildProcessPromise
export function spawn( command: string, argv: string[], options: ChildProcessOptions ): ChildProcessPromise
export function spawn( options: ChildProcessOptions ): ChildProcessPromise

export function spawn( ..._arguments: UnsortedArguments ) {

    const [ command, argv, options ] = normalizeArguments( _arguments )

    if ( typeof options.buffer !== "boolean" ) options.buffer = true
    if ( ! options.hasOwnProperty( "encoding" ) ) options.encoding = "buffer"
    options.stdio ??= "pipe"

    return promise( command, argv, options )

}

/**
 * Spawns a shell, executing the command inside the shell and buffering any generated output.
 * 
 * @param command Path of the executable to run as a child process.
 * @param argv Arguments that will be passed to the child process.
 * @param options Options passed to `child_process.spawn()`.
 */

export function exec( command: string ): ChildProcessPromise
export function exec( command: string, options: ChildProcessOptions ): ChildProcessPromise
export function exec( command: string, argv: string[] ): ChildProcessPromise
export function exec( command: string, argv: string[], options: ChildProcessOptions ): ChildProcessPromise
export function exec( options: ChildProcessOptions ): ChildProcessPromise

export function exec( ..._arguments: UnsortedArguments ) {

    const [ command, argv, options ] = normalizeArguments( _arguments )

    if ( ! options.hasOwnProperty( "encoding" ) ) options.encoding = "utf8"
    if ( typeof options.shell !== "string" ) options.shell = true
    options.stdio = "pipe"
    options.buffer = true

    return promise( command, argv, options )

}

/**
 * Spawns a shell, executing the command inside the shell and sending any output to the current process.
 * 
 * @param command Path of the executable to run as a child process.
 * @param argv Arguments that will be passed to the child process.
 * @param options Options passed to `child_process.spawn()`.
 */

export function run( command: string ): ChildProcessPromise
export function run( command: string, options: ChildProcessOptions ): ChildProcessPromise
export function run( command: string, argv: string[] ): ChildProcessPromise
export function run( command: string, argv: string[], options: ChildProcessOptions ): ChildProcessPromise
export function run( options: ChildProcessOptions ): ChildProcessPromise

export function run( ..._arguments: UnsortedArguments ) {

    const [ command, argv, options ] = normalizeArguments( _arguments )

    if ( typeof options.shell !== "string" ) options.shell = true
    options.stdio = "inherit"

    return promise( command, argv, options )

}

/**
 * A simple to use wrapper for either `exec` (with callback) or `run` (i/o piped to current process)
 * 
 * @param command The command to run (should contain both the executable path and arguments)
 * @param buffer If provided will buffer stdout and stderr
 * @param callback If provided will buffer stdout and stderr, then pass the usuall result to this function
 * @param cwd The current working directory to call the command from (should default to `process.cwd()`)
 */

export function x( command: string ): ChildProcessPromise
export function x( command: string, cwd: string ): ChildProcessPromise
export function x( command: string, buffer: boolean ): ChildProcessPromise
export function x( command: string, buffer: boolean, cwd: string ): ChildProcessPromise
export function x<R = unknown>( command: string, callback: XCallback<R> ): Promise<R>
export function x<R = unknown>( command: string, callback: XCallback<R>, cwd: string ): Promise<R>

export function x( command: string, callback?: string | boolean | XCallback, cwd?: string ) {

    if ( typeof callback === "string" ) {

        cwd = callback
        callback = void 0

    }

    const fn = callback ? exec : run
    const p = fn( command, { cwd } )

    return typeof callback === "function" ? p.then( callback ) : p

}

/**
 * Simple wrapper for `exec` to use on template strings.
 */

export function $( command: string | string[], ...values: unknown[] ) {

    return exec( preprocess( command, values ) )

}

/**
 * Create a wrapper for `spawn` to use on template strings.
 * 
 * **NOTE:** If `options.shell` isn't a string, will default this property to `true`; otherwise behaves the same.
 */

export function create( options: ChildProcessOptions = {} ) {

    if ( typeof options.shell !== "string" ) options.shell = true

    return function $( command: string | string[], ...values: unknown[] ) {

        return spawn( preprocess( command, values ), options )

    }

}

// Other exports

import { ErrorSymbol, isSpawnError } from "./isSpawnError.ts"

export type * from "./types.ts"
export {

    ErrorSymbol,
    isSpawnError,
    normalizeArguments,
    promise,

}
