import type {

    SpawnError,
    UnkownSpawnError,

} from "./types.ts"

/**
 * A unique symbol for Error's from `@futagoza/child-process`
 */

export const ErrorSymbol = Symbol( "@futagoza/child-process" )

/**
 * Confirm if the given error was thrown from a spawn'ed process.
 */

export function isSpawnError( object?: SpawnError | UnkownSpawnError ) {

    if ( ! object ) return false

    return ( ErrorSymbol in object && object[ ErrorSymbol ] )
        || ( object.spawnargs && object.syscall )

}
