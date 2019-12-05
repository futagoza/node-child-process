> See [commit history](https://github.com/futagoza/node-child-process/commits) for a full list of changes.

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
