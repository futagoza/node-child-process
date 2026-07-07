> See [commit history](https://github.com/futagoza/node-child-process/commits) for a full list of changes.

<a name="2.0.1"></a>
## [v2.0.1](https://github.com/futagoza/node-child-process/compare/v2.0.0...v2.0.1) (2026-07-07)

* Fix types missing from exports

<a name="2.0.0"></a>
## [v2.0.0](https://github.com/futagoza/node-child-process/compare/v1.1.0...v2.0.0) (2026-07-07)

* DEV: Upgraded to ESLint 10+ while updating all devDependencies
* DEV: Switch to NPM lockfile
* DEV: Remove VScode settings file
* DEV: Switch to using `bump-updated` for release's instead of `npm version`
* Set minimum Node version to Node v20
* Ensure `src/types.ts` (now `src/types.d.ts`) isn't moved to `out`
* Replaced type `ChildProcessResult` with `ChildProcessPromise` and `ChildProcessOutput`
* Added `x` which either calls `exec` when given a callback otherwise calls `run`
* Added `$`, a simple wrapper for `exec` (for a bash-like experience with template strings)
* Added `create`, which create's a wrapper for `spawn` to use on template strings
* Added a fix for `options.shell` and `argv` use due to deprecation warning in Node v22.15+
* Updated `README.md`

<a name="1.1.0"></a>
## [v1.1.0](https://github.com/futagoza/node-child-process/commits/v1.0.0) (2019-12-05)

* Move codebase to [https://github.com/futagoza/node-child-process](https://github.com/futagoza/node-child-process)
* Set minimum requirement of Node to 10
* Convert codebase to TypeScript (all types are exported)
* Arguments to the spawning methods can now be in any order
* Change entry file to the generated `out/index.js`
* Include the `out` and `src` directories only on publish
* Use `argv` instead of `args` within the codebase when referring to command line arguments
* Ensure the main exported methods throw Promise-based rejection errors
* Update `README.md` to reflect recent changes

<a name="1.0.0"></a>
## v1.0.0 (2018-10-04)

* Initial release.
