const fs = require('fs');
const readline = require('readline');
const { execSync } = require('child_process');

// Load versions from JSON files
const spigotVersions = require('./spigot.json');
const paperVersions = require('./paper.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displaySoftwareSelection() {
  console.log('Select the server software:');
  console.log('1. Spigot');
  console.log('2. Paper');
}

function displaySpigotVersions() {
  console.log('Select a Minecraft version to download:');
  Object.keys(spigotVersions[0]).forEach((version, index) => {
    console.log(`${index + 1}. ${version}`);
  });
}

function displayPaperVersions() {
  console.log('Select a Minecraft version to download:');
  Object.keys(paperVersions[0]).forEach((version, index) => {
    console.log(`${index + 1}. ${version}`);
  });
}

function handleSoftwareSelection(answer) {
  if (answer === '1') {
    // User selected Spigot
    displaySpigotVersions();
    rl.question('Enter the number corresponding to your choice: ', (versionIndex) => {
      const selectedVersion = Object.keys(spigotVersions[0])[versionIndex - 1];
      const downloadUrl = spigotVersions[0][selectedVersion];
      
      console.log(`Downloading Spigot version ${selectedVersion} from ${downloadUrl}...`);
      
      // Implement download logic using wget or any other method
      try {
        execSync(`wget ${downloadUrl} -P minecraft_server`);
        console.log(`Downloaded Spigot ${selectedVersion} successfully.`);
        
        // Create a directory for Minecraft server if it doesn't exist
        if (!fs.existsSync('minecraft_server')) {
          fs.mkdirSync('minecraft_server');
        }


        const fileName = downloadUrl.split('/').pop();
        const filePath = path.join(__dirname, fileName);
        const destinationPath = path.join(__dirname, 'minecraft_server', fileName);

        fs.renameSync(filePath, destinationPath);

        // Start the Minecraft server
        console.log('Starting Minecraft server...');
        execSync(`java -jar ${fileName}`, {cwd: 'minecraft-server-installer'},{ cwd: 'minecraft_server' });
      } catch (error) {
        console.error(`Error downloading or starting server: ${error}`);
      }

      rl.close();
    });
  } else if (answer === '2') {
    // User selected Paper
    displayPaperVersions();
    rl.question('Enter the number corresponding to your choice: ', (versionIndex) => {
      const selectedVersion = Object.keys(paperVersions[0])[versionIndex - 1];
      const downloadUrl = paperVersions[0][selectedVersion];
      
      console.log(`Downloading Paper version ${selectedVersion} from ${downloadUrl}...`);
      
      // Implement download logic using wget or any other method
      try {
        execSync(`wget ${downloadUrl} -P minecraft_server`);
        console.log(`Downloaded Paper ${selectedVersion} successfully.`);
        
        // Create a directory for Minecraft server if it doesn't exist
        if (!fs.existsSync('minecraft_server')) {
          fs.mkdirSync('minecraft_server');
        }

        // Move the downloaded file to minecraft_server directory
        const fileName = downloadUrl.split('/').pop();
        fs.renameSync(fileName, `minecraft_server/${fileName}`);

        // Start the Minecraft server
        console.log('Starting Minecraft server...');
        execSync(`java -jar ${fileName}`, {cwd: 'minecraft-server-installer'},{ cwd: 'minecraft_server' });
      } catch (error) {
        console.error(`Error downloading or starting server: ${error}`);
      }

      rl.close();
    });
  } else {
    console.log('Invalid selection. Please enter 1 or 2.');
    rl.close();
  }
}

// Start the script
displaySoftwareSelection();
rl.question('Enter the number corresponding to your choice: ', handleSoftwareSelection);
