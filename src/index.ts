import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { IMainMenu } from '@jupyterlab/mainmenu';

import '../style/index.css';

const FACTORY = 'Editor';
const ICON_CLASS = 'jp-PythonIcon';
const PALETTE_CATEGORY = 'File Editor';

namespace CommandIDs {
  export const createNew = 'fileeditor:create-new-python-file';
};

const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab-python-file',
  autoStart: true,
  requires: [
    IFileBrowserFactory,
  ],
  optional: [
    ILauncher,
    IMainMenu,
    ICommandPalette,
  ],
  activate: (
    app: JupyterLab,
    browserFactory: IFileBrowserFactory,
    launcher: ILauncher,
    menu: IMainMenu | null,
    palette: ICommandPalette,
  ) => {
    const { commands } = app;

    commands.addCommand(CommandIDs.createNew, {
      label: args => (args['isPalette'] ? 'New Python File' : 'Python File'),
      caption: 'Create a new Python file',
      iconClass: args => (args['isPalette'] ? '' : ICON_CLASS),
      execute: args => {
        let cwd = args['cwd'] || browserFactory.defaultBrowser.model.path;
        return commands
          .execute('docmanager:new-untitled', {
            path: cwd,
            type: 'file',
            ext: 'py'
          })
          .then(model => {
            return commands.execute('docmanager:open', {
              path: model.path,
              factory: FACTORY
            });
          });
      }
    });

    // add to the launcher
    if (launcher) {
      launcher.add({
        command: CommandIDs.createNew,
        category: 'Other',
        rank: 1
      });
    }

    // add to the palette
    if (palette) {
      palette.addItem({
        command: CommandIDs.createNew,
        args: { isPalette: true},
        category: PALETTE_CATEGORY
      });
    }

    // add to the menu
    menu.fileMenu.newMenu.addGroup([{ command: CommandIDs.createNew }], 30);

    console.log("JupyterLab extension jupyterlab-python-file is activated!");
  }
};

export default extension;
