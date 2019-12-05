import { normalizeArguments } from "./normalizeArguments";
import { promise } from "./promise";
import {

    ChildProcessOptions,
    ChildProcessResult,
    UnsortedArguments,

} from "./types";

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

export function spawn( command: string, argv: string[], options: ChildProcessOptions ): ChildProcessResult;
export function spawn( command: string, argv: string[] ): ChildProcessResult;
export function spawn( command: string ): ChildProcessResult;
export function spawn( command: string, options: ChildProcessOptions ): ChildProcessResult;
export function spawn( options: ChildProcessOptions ): ChildProcessResult;

export function spawn( ..._arguments: UnsortedArguments ) {

    const [ command, args, options ] = normalizeArguments( _arguments );

    if ( typeof options.buffer !== "boolean" ) options.buffer = true;
    if ( ! options.hasOwnProperty( "encoding" ) ) options.encoding = "buffer";
    if ( ! options.stdio ) options.stdio = "pipe";

    return promise( command, args, options );

}

/**
 * Spawns a shell, executing the command inside the shell and buffering any generated output.
 * 
 * @param command Path of the executable to run as a child process.
 * @param argv Arguments that will be passed to the child process.
 * @param options Options passed to `child_process.spawn()`.
 */

export function exec( command: string, argv: string[], options: ChildProcessOptions ): ChildProcessResult;
export function exec( command: string, argv: string[] ): ChildProcessResult;
export function exec( command: string ): ChildProcessResult;
export function exec( command: string, options: ChildProcessOptions ): ChildProcessResult;
export function exec( options: ChildProcessOptions ): ChildProcessResult;

export function exec( ..._arguments: UnsortedArguments ) {

    const [ command, args, options ] = normalizeArguments( _arguments );

    if ( ! options.hasOwnProperty( "encoding" ) ) options.encoding = "utf8";
    if ( typeof options.shell !== "string" ) options.shell = true;
    options.stdio = "pipe";
    options.buffer = true;

    return promise( command, args, options );

}

/**
 * Spawns a shell, executing the command inside the shell and sending any output to the current process.
 * 
 * @param command Path of the executable to run as a child process.
 * @param argv Arguments that will be passed to the child process.
 * @param options Options passed to `child_process.spawn()`.
 */

export function run( command: string, argv: string[], options: ChildProcessOptions ): ChildProcessResult;
export function run( command: string, argv: string[] ): ChildProcessResult;
export function run( command: string ): ChildProcessResult;
export function run( command: string, options: ChildProcessOptions ): ChildProcessResult;
export function run( options: ChildProcessOptions ): ChildProcessResult;

export function run( ..._arguments: UnsortedArguments ) {

    const [ command, args, options ] = normalizeArguments( _arguments );

    if ( typeof options.shell !== "string" ) options.shell = true;
    options.stdio = "inherit";

    return promise( command, args, options );

}

// Other exports

import { ErrorSymbol, isSpawnError } from "./isSpawnError";

export * from "./types";
export {

    ErrorSymbol,
    isSpawnError,
    normalizeArguments,
    promise,

};
