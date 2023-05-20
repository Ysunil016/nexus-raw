oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @ys-tools/nexus-raw
$ nexus-raw COMMAND
running command...
$ nexus-raw (--version)
@ys-tools/nexus-raw/0.0.0 darwin-arm64 node-v16.20.0
$ nexus-raw --help [COMMAND]
USAGE
  $ nexus-raw COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nexus-raw download`](#nexus-raw-download)
* [`nexus-raw help [COMMANDS]`](#nexus-raw-help-commands)
* [`nexus-raw plugins`](#nexus-raw-plugins)
* [`nexus-raw plugins:install PLUGIN...`](#nexus-raw-pluginsinstall-plugin)
* [`nexus-raw plugins:inspect PLUGIN...`](#nexus-raw-pluginsinspect-plugin)
* [`nexus-raw plugins:install PLUGIN...`](#nexus-raw-pluginsinstall-plugin-1)
* [`nexus-raw plugins:link PLUGIN`](#nexus-raw-pluginslink-plugin)
* [`nexus-raw plugins:uninstall PLUGIN...`](#nexus-raw-pluginsuninstall-plugin)
* [`nexus-raw plugins:uninstall PLUGIN...`](#nexus-raw-pluginsuninstall-plugin-1)
* [`nexus-raw plugins:uninstall PLUGIN...`](#nexus-raw-pluginsuninstall-plugin-2)
* [`nexus-raw plugins update`](#nexus-raw-plugins-update)
* [`nexus-raw upload`](#nexus-raw-upload)

## `nexus-raw download`

Download Nexus Artifact Command

```
USAGE
  $ nexus-raw download -r <value> -p <value> [-c <value>]

FLAGS
  -c, --nexus-cred=<value>
  -p, --artifact-path=<value>  (required)
  -r, --registry=<value>       (required)

DESCRIPTION
  Download Nexus Artifact Command
```

_See code: [dist/commands/download/index.ts](https://github.com/local/nexus-raw/blob/v0.0.0/dist/commands/download/index.ts)_

## `nexus-raw help [COMMANDS]`

Display help for nexus-raw.

```
USAGE
  $ nexus-raw help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for nexus-raw.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `nexus-raw plugins`

List installed plugins.

```
USAGE
  $ nexus-raw plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ nexus-raw plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `nexus-raw plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ nexus-raw plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ nexus-raw plugins add

EXAMPLES
  $ nexus-raw plugins:install myplugin 

  $ nexus-raw plugins:install https://github.com/someuser/someplugin

  $ nexus-raw plugins:install someuser/someplugin
```

## `nexus-raw plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ nexus-raw plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ nexus-raw plugins:inspect myplugin
```

## `nexus-raw plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ nexus-raw plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ nexus-raw plugins add

EXAMPLES
  $ nexus-raw plugins:install myplugin 

  $ nexus-raw plugins:install https://github.com/someuser/someplugin

  $ nexus-raw plugins:install someuser/someplugin
```

## `nexus-raw plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ nexus-raw plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ nexus-raw plugins:link myplugin
```

## `nexus-raw plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ nexus-raw plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nexus-raw plugins unlink
  $ nexus-raw plugins remove
```

## `nexus-raw plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ nexus-raw plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nexus-raw plugins unlink
  $ nexus-raw plugins remove
```

## `nexus-raw plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ nexus-raw plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nexus-raw plugins unlink
  $ nexus-raw plugins remove
```

## `nexus-raw plugins update`

Update installed plugins.

```
USAGE
  $ nexus-raw plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `nexus-raw upload`

Upload Artifact Command

```
USAGE
  $ nexus-raw upload -n <value> -p <value> -r <value> -t <value> -u <value> [-c <value>]

FLAGS
  -c, --nexus-cred=<value>   Nexus Creds, to upload artifact in `user:password` format
  -n, --name=<value>         (required) Artifact Name, that will be used as predix to uploaded artifact
  -p, --path=<value>         (required) Path of artifact, which locates the artifact bundle
  -r, --registry=<value>     (required) Nexus Registry Base URL
  -t, --target-path=<value>  (required) Target Namespace, Component Path where artifact needs to be uploaded
  -u, --unique-id=<value>    (required) Unique Id, to identify artifact uniqely e.g Commit SHA

DESCRIPTION
  Upload Artifact Command
```

_See code: [dist/commands/upload/index.ts](https://github.com/local/nexus-raw/blob/v0.0.0/dist/commands/upload/index.ts)_
<!-- commandsstop -->
