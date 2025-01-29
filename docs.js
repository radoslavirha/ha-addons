import { context } from '@actions/github'
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

Handlebars.registerHelper('ifIn', function(elem, list, options) {
    if (list && list.indexOf(elem) > -1) {
      return options.fn(this);
    }
    return options.inverse(this);
});

const getAddons = async () => {
    const paths = await fs.promises.readdir(path.join('addons'), { withFileTypes: true })
    
    return paths
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
};

const buildDocs = async (addon) => {
    const basePath = path.join('addons', addon);
    const readmeTemplate = await fs.promises.readFile(path.join(basePath, '.README.hbs'), 'utf8');
    const configRaw = await fs.promises.readFile(path.join(basePath, 'config.json'), 'utf8');
    const packageRaw = await fs.promises.readFile(path.join(basePath, 'package.json'), 'utf8');

    const template = Handlebars.compile(readmeTemplate);

    const data = {
        config: JSON.parse(configRaw),
        package: JSON.parse(packageRaw),
        github: context,
        archs: ['aarch64', 'amd64', 'armhf', 'armv7', 'i386'],
    };
    console.log(data);

    const result = template(data);

    await fs.promises.writeFile(path.join(basePath, 'README.md'), result);
};

for (const addon of await getAddons()) {
    await buildDocs(addon);
}