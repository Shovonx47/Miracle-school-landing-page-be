const chokidar = require('chokidar');
const path = require('path');
const { spawn } = require('child_process');
const colors = require('colors');

// Initialize watcher
const watcher = chokidar.watch(path.join(__dirname, '../data'), {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
        stabilityThreshold: 1000,
        pollInterval: 100
    }
});

// Function to run seeder
const runSeeder = (fileName) => {
    return new Promise((resolve) => {
        console.log(colors.yellow(`Changes detected in ${fileName}! Running seeder...`));
        
        const seeder = spawn('node', ['utils/seeder.js', 'import', fileName], {
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
                console.log(colors.green(`✓ ${fileName} data updated successfully!`));
                resolve(true);
            } else {
                console.error(colors.red(`✗ Error updating ${fileName} data`));
                resolve(false);
            }
        });
    });
};

let isProcessing = false;

// Watch for changes
watcher
    .on('change', async (filePath) => {
        if (isProcessing) return;
        
        const fileName = path.basename(filePath);
        
        // Only process .json files and files ending with Seeder.js
        if (fileName.endsWith('.json') || fileName.endsWith('Seeder.js')) {
            isProcessing = true;
            await runSeeder(fileName);
            isProcessing = false;
        }
    })
    .on('add', async (filePath) => {
        const fileName = path.basename(filePath);
        if (fileName.endsWith('.json') || fileName.endsWith('Seeder.js')) {
            console.log(colors.cyan(`New seeder file detected: ${fileName}`));
        }
    })
    .on('ready', () => {
        console.log(colors.cyan('👀 Watching for changes in data files...'));
        console.log(colors.cyan('The following file types are being monitored:'));
        console.log(colors.cyan('  - *.json'));
        console.log(colors.cyan('  - *Seeder.js'));
    });
