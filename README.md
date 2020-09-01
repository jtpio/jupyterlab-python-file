# jupyterlab-python-file

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/jtpio/jupyterlab-python-file/master?urlpath=lab)
[![npm](https://img.shields.io/npm/v/jupyterlab-python-file.svg)](https://www.npmjs.com/package/jupyterlab-python-file)

Create Python Files from JupyterLab

![screenshot](./doc/screenshot.png)

![screenshot2](./doc/screenshot2.png)

## Prerequisites

* JupyterLab 1.0+

## Installation

```bash
pip install jupyterlab_python_file
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
pip install -e .
jupyter labextension develop --overwrite .
```

To rebuild the package:

```bash
jlpm build
```
