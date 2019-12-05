import { ChildProcess, SpawnOptions } from "child_process";
import { ErrorSymbol } from "./isSpawnError";

/**
 * An unkown spawn error
 */

export interface UnkownSpawnError extends Error {

    spawnargs?: string[];

    syscall?: string;

}

/**
 * An error that is thrown when using `@futagoza/child-process` methods
 */

export interface SpawnError extends UnkownSpawnError {

    /**
     * Can be used to verify that the error was from `@futagoza/child-process`
     */

    [ ErrorSymbol ]: true;

    /**
     * Exit code
     */

    code: number;

    /**
     * Exit signal
     */

    signal: string;

    /**
     * The executable to run as a child process
     */

    path: string;

    /**
     * Alias of `SpawnError#path`
     */

    command: string;

    /**
     * Arguments passed to the child process
     */

    args: string[];

    /**
     * The normalized options passed to `cp.promise`
     */

    options: ChildProcessOptions;

    stderr?: string | Buffer;
    stdout?: string | Buffer;

}

/**
 * Options for the main methods from `@futagoza/child-process`
 */

export interface ChildProcessOptions extends SpawnOptions {

    /**
     * Alternative to passing an array as the second argument
     */

    args?: string[];

    /**
     * Alternative to passing an array as the second argument
     */

    argv?: string[];

    /**
     * On _options.pipe_ this will buffer the results from both `stdout` and `stderr`
     * 
     * __NOTE:__ This option is only used by `cp.spawn` _(optional)_ and `cp.exec` _(fixed)_
     */

    buffer?: boolean;

    /**
     * Alternative to passing the command as the first argument
     */

    command?: string;

    /**
     * Used alongside _options.buffer_, this specifies the character encoding used to decode the results
     *
     * __NOTE:__ Like _options.buffer_, this option is only used by `cp.spawn` and `cp.exec`
     */

    encoding?: string;

    /**
     * Alternative to passing the command as the first argument
     */

    file?: string;

    /**
     * Will set _options.stdio_ to __ignore__
     * 
     * __NOTE:__ Is ignored if _options.stdio_ is already set
     */

    ignore?: boolean;

    /**
     * Will set _options.stdio_ to __inherit__
     * 
     * __NOTE:__
     * - Is ignored if _options.stdio_ is already set
     * - Is a fixed option for _options.stdio_ with `cp.run`
     */

    inherit?: boolean;

    /**
     * Will be passed to the child process's `stdin`
     */

    input?: unknown;

    /**
     * Will set _options.stdio_ to __pipe__
     *
     * __NOTE:__
     * - Is ignored if _options.stdio_ is already set
     * - Is a fixed option for _options.stdio_ with `cp.exec`
     * - Is the default for _options.stdio_ on `cp.spawn`
     */

    pipe?: boolean;

    /**
     * A function called with the child process as it's argument once the promise is running
     * 
     * @param child The child process
     * @param options The normalized options
     */

    ready?: ( child: ChildProcess, options: ChildProcessOptions ) => unknown;

    /**
     * Will set _options.stdio_ to __pipe__
     *
     * __NOTE:__ Is ignored if _options.stdio_ is already set
     */

    silent?: boolean;

    /**
     * If there were no _args_ found, then this is used to split the _command_ string and extract the _args_
     */

    ws?: string;

}

/**
 * Represents the arguments passed to `cp.normalizeArguments` in any order
 */

export type UnsortedArguments = Array<string | string[] | ChildProcessOptions>;

/**
 * The array returned from `cp.normalizeArguments`
 */

export interface NormalizedArguments extends Array<unknown> {

    [ 0 ]: string;

    [ 1 ]: string[];

    [ 2 ]: ChildProcessOptions;

}

/**
 * The successful result of `@futagoza/child-process` methods
 */

export type ChildProcessResult = Promise<{

    /**
     * Exit code
     */

    code: 0;

    /**
     * Exit signal
     */

    signal: string;

    /**
     * Alias of `SpawnError#command`
     */

    path: string;

    /**
     * The executable to run as a child process
     */

    command: string;

    /**
     * Arguments passed to the child process
     */

    args: string[];

    /**
     * The normalized options passed to `cp.promise`
     */

    options: ChildProcessOptions;

    stderr?: string | Buffer;
    stdout?: string | Buffer;

}>;
