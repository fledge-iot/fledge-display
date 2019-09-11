# fledge-display
Mini Display for Fledge

App to be used on screen on a Raspberry Pi (or other small device). Displays a tab with ping results, and auto-populated tabs, one for each asset. For each tab, the current value is shown and a graph showing recent asset readings.

## Initial Setup
Dependent libraries have not been committed (since they will be different on different platforms). Before executing, run `yarn` to pull all needed libraries. These will be pulled into [root]/node_modules

## Configuration
Set the IP address of the device into [root]/src/environments/environment.ts. The app really should automatically figure out it's own address.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. The parameter --port can be used to set the port.

## Creating and Installing Debian Package
[Debian packaging and usage](debian-readme.md)

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Clean

Run `yarn clean` to clean the build and dependencies.

## Running unit tests

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `yarn e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

