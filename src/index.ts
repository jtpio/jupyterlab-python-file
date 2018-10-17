import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import { ILauncher } from '@jupyterlab/launcher';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { IMainMenu } from '@jupyterlab/mainmenu';

import '../style/index.css';

const FACTORY = 'Editor';
const ICON_CLASS = 'jp-PythonIcon';

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
  ],
  activate: (
    app: JupyterLab,
    browserFactory: IFileBrowserFactory,
    launcher: ILauncher,
    menu: IMainMenu | null
  ) => {
    const { commands } = app;

    commands.addCommand(CommandIDs.createNew, {
      label: 'Python File',
      caption: 'Create a new Python file',
      iconClass: ICON_CLASS,
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

    if (launcher) {
      launcher.add({
        command: CommandIDs.createNew,
        category: 'Other',
        rank: 1
      });
    }
    menu.fileMenu.newMenu.addGroup([{ command: CommandIDs.createNew }], 30);

    console.log("JupyterLab extension jupyterlab-python-file is activated!");
  }
};

export default extension;
