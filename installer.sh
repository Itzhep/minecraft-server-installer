#!/bin/bash

# Update package lists
echo "Updating package lists..."
sudo apt-get update
clear
# Install Node.js and npm
echo "Installing Node.js and npm..."
sudo apt-get install -y nodejs npm
npm install inquirer
npm install fs
npm install child_process
clear
# Install nvm if you haven't already
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Close and reopen your terminal (or run the next command in a new terminal session)

# Install the latest LTS version of Node.js
nvm install --lts

# Set the default version to the LTS version
nvm alias default 'lts/*'
npm install -g npm@10.8.2
# Install wget
echo "Installing wget..."
sudo apt-get install -y wget
clear
# Install Java 17
echo "Adding repository for Java 17..."
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:linuxuprising/java
sudo apt-get update
clear
echo "Installing Java 17..."
sudo apt-get install -y oracle-java17-installer oracle-java17-set-default
clear
# Verify installations
echo "Verifying installations..."

echo "Node.js version:"
node -v

echo "npm version:"
npm -v

echo "wget version:"
wget --version | head -n 1

echo "Java version:"
java -version


echo "All installations completed successfully."
node start.js