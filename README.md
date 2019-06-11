# Image Resizer

An Electron app built with React for client-side image resizing leveraging WASM. All provided images are resized and written to the current user's download directory.

### Table of Contents

- [Image Resizer](#image-resizer)
    - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Features](#features)
  - [Stack and stuff used](#stack-and-stuff-used)
    - [Electron](#electron)
    - [React](#react)
    - [xStyled](#xstyled)
    - [Easy-Peasy](#easy-peasy)
    - [Lottie, react-spring](#lottie-react-spring)

## Getting Started

1. Clone the repo.
2. Run `yarn`
3. To develop locally: `yarn develop`
4. To build: `yarn electron-pack`. Ensure to change the flags to target the appropriate OS you are building for.

## Features

- WASM based image resizing. Runs client side only. Could be easily adapted to work on the web.
- Dark mode support. Listens to dark mode preference changes in realtime.

## Stack and stuff used

### Electron

JavaScript framework for building desktop applications. Builds are performed by [`electron-builder`](https://www.electron.build/).

### React

Declarative JS UI framework.

### xStyled

CSS-in-JS solution based on `styled-system` and `styled-components`. Allows for direct referencing of `theme` values in your `css` template literals. See their [docs](https://github.com/smooth-code/xstyled)

### Easy-Peasy

Abstraction over Redux with a simple API. See their [docs](https://github.com/ctrlplusb/easy-peasy).

### Lottie, react-spring

Animation libraries.
