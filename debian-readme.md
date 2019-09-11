
#### Create debian package

Use `./make_deb` script to create debian package, the package will be placed in `packages/build/`

```
 $ ./make_deb
Operating System Type: Linux
The package root directory is         : /home/fledge/fledge-display
The Fledge display version is        : 1.0.0
The package will be built in          : /home/fledge/fledge-display/packages/build
The package name is                   : fledge-display-1.0.0

yarn run v1.9.2
$ rm -rf dist && rm -rf node_modules && yarn cache clean
success Cleared cache.
Done in 3.94s.
yarn install v1.9.2
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 557.10s.
yarn run v1.9.2
$ ng build --prod --build-optimizer

Date: 2018-09-22T04:02:09.987Z
Hash: 3d922b23346441514de4
Time: 44363ms
chunk {0} runtime.a66f828dca56eeb90e02.js (runtime) 1.05 kB [entry] [rendered]
chunk {1} styles.f733a29c855b5fe71f0b.css (styles) 156 kB [initial] [rendered]
chunk {2} polyfills.7a0e6866a34e280f48e7.js (polyfills) 59.6 kB [initial] [rendered]
chunk {3} main.b12941454ac286f642f6.js (main) 770 kB [initial] [rendered]
Done in 47.17s.
Populating the package and updating version file...Done.
Copying build artifacts for nginx webroot directory...
Done.
Building the new debian package...
dpkg-deb: building package 'fledge-display' in 'fledge-display-1.0.0.deb'.
Done.

```

#### Installing debian package

Use the ``apt`` or the ``apt-get`` command

```
$sudo cp packages/build/fledge-display-1.0.0.deb /var/cache/apt/archives/.
$sudo apt install /var/cache/apt/archives/fledge-display-1.0.0.deb
```

#### Uninstalling debian package

```
$ sudo apt remove fledge-display
```

> you may want to check debian package contents with `sudo dpkg -c fledge-display-1.0.0.deb` or can install in dev env with `sudo dpkg -i fledge-display-1.0.0.deb`