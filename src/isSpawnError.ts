import {

    SpawnError,
    UnkownSpawnError,

} from "./types";

/**
 * A unique symbol for Error's from `@futagoza/child-process`
 */

export const ErrorSymbol = Symbol( "@futagoza/child-process" );

/**
 * Confirm if the given error was thrown from a spawn'ed process.
 */

export function isSpawnError( object?: SpawnError | UnkownSpawnError ) {

    if ( ! object ) return false;

    return object[ ErrorSymbol ] ?? ( object.spawnargs && object.syscall );

}
