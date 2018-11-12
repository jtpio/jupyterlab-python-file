# jupyterlab-python-file

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/jtpio/jupyterlab-python-file/master?urlpath=lab)
[![npm](https://img.shields.io/npm/v/jupyterlab-python-file.svg)](https://www.npmjs.com/package/jupyterlab-python-file)

Create Python Files from JupyterLab

![screenshot](./doc/screenshot.png)

## Prerequisites

* JupyterLab 0.35

## Installation

```bash
jupyter labextension install jupyterlab-python-file
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
npm run build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

