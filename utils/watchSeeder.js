const chokidar = require('chokidar');
const path = require('path');
const { spawn } = require('child_process');
const colors = require('colors');

// Initialize watcher
const watcher = chokidar.watch(path.join(__dirname, '../data'), {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
});

// Function to run seeder
const runSeeder = (type) => {
    console.log(colors.yellow(`Changes detected! Running ${type} seeder...`));
    
    const seeder = spawn('node', ['utils/seeder.js', 'import', type], {
        cwd: path.join(__dirname, '..')
    });

    seeder.stdout.on('data', (data) => {
        console.log(colors.green(data.toString()));
    });

    seeder.stderr.on('data', (data) => {
        console.error(colors.red(data.toString()));
    });

    seeder.on('close', (code) => {
        if (code === 0) {
            console.log(colors.green(`✓ ${type} data updated successfully!`));
        } else {
            console.error(colors.red(`✗ Error updating ${type} data`));
        }
    });
};

// Map files to their seeder types
const fileToSeederMap = {
    'administrationSeeder.js': 'administration',
    'news.json': 'news',
    'notices.json': 'news',
    'events.json': 'news'
};

// Watch for changes
watcher
    .on('change', (filePath) => {
        const fileName = path.basename(filePath);
        const seederType = fileToSeederMap[fileName];
        
        if (seederType) {
            runSeeder(seederType);
        }
    })
    .on('ready', () => {
        console.log(colors.cyan('👀 Watching for changes in data files...'));
        console.log(colors.cyan('The following files are being monitored:'));
        Object.keys(fileToSeederMap).forEach(file => {
            console.log(colors.cyan(`  - ${file}`));
        });
    });
