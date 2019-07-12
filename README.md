# Image Resizer <!-- omit in toc -->

An Electron app built with React for client-side image resizing leveraging WASM. All provided images are resized and written to the current user's download directory.

### Table of Contents

- [Getting Started](#Getting-Started)
- [Features](#Features)
- [Building a release](#Building-a-release)

## Getting Started

1. Clone the repo.
2. Run `yarn`
3. To develop locally: `yarn develop`
4. To build: `yarn electron-pack`. Ensure to change the flags to target the appropriate OS you are building for.

## Features

- WASM based image resizing. Runs client side only. Could be easily adapted to work on the web.
- Dark mode support. Listens to dark mode preference changes in realtime.

## Building a release

To test if a build will compile, run:

```bash
yarn compile
```

To publish a release to GitHub for auto-update support, run:

```bash
yarn release
```

After the app has been signed, built, and notarized, navigate to the releases section of this repo and publish the release. Users of the app will now automatically update their app when a release is published in this fashion.
