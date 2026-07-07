import { normalizeArguments } from "./normalizeArguments.ts"
import { promise } from "./promise.ts"
import type {

    ChildProcessOptions,
    ChildProcessPromise,
    UnsortedArguments,

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

export function spawn( command: string, argv: string[], options: ChildProcessOptions ): ChildProcessPromise
export function spawn( command: string, argv: string[] ): ChildProcessPromise
export function spawn( command: string ): ChildProcessPromise
export function spawn( command: string, options: ChildProcessOptions ): ChildProcessPromise
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

export function exec( command: string, argv: string[], options: ChildProcessOptions ): ChildProcessPromise
export function exec( command: string, argv: string[] ): ChildProcessPromise
export function exec( command: string ): ChildProcessPromise
export function exec( command: string, options: ChildProcessOptions ): ChildProcessPromise
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

export function run( command: string, argv: string[], options: ChildProcessOptions ): ChildProcessPromise
export function run( command: string, argv: string[] ): ChildProcessPromise
export function run( command: string ): ChildProcessPromise
export function run( command: string, options: ChildProcessOptions ): ChildProcessPromise
export function run( options: ChildProcessOptions ): ChildProcessPromise

export function run( ..._arguments: UnsortedArguments ) {

    const [ command, argv, options ] = normalizeArguments( _arguments )

    if ( typeof options.shell !== "string" ) options.shell = true
    options.stdio = "inherit"

    return promise( command, argv, options )

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
