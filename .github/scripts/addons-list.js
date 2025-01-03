module.exports = ({ github, context }) => {
    const addons = [];

    try {
        const fs = require('fs');

        const addonSubfolders = fs.readdirSync('addons', { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const subfolder of addonSubfolders) {
            if (fs.existsSync(`addons/${subfolder}/package.json`)) {
                const { name, version } = JSON.parse(fs.readFileSync(`./addons/${subfolder}/package.json`));
                addons.push({
                    name,
                    version,
                    subfolder
                });
            }
        }
    } catch (err) {
        core.error(err)
        core.setFailed(err)
    }

    return JSON.stringify(addons);
};