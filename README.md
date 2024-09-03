# Zen Connect
A lightweight node server for zen, providing connection to OSC, access to custom samples, and more.

## Dependencies
* Node
* NVM
* Yarn or NPM

## Setup
* Install dependencies
```bash
nvm use 
yarn # use yarn to install dependencies
# npm install # or use npm
```

## Usage
`npm run start` or `yarn start` runs the following services:
### OSC connection
Browsers can't send OSC messages directly. They have to send an OSC formatted message via a websocket, which is then sent on as a proper OSC message by a separate server. Spin up this server then reload Zen with `?osc=true` at the end of the url; e.g. `https://zen.cephasteom.co.uk?osc=true`. All being well you should see a message in the console informing you that Zen has connected and is sending OSC messages.

...
### Samples
Zen knows to look on localhost:6000 for samples. To serve your own samples:
* Drag folders of samples into `samples` folder. The file structure should look something like this:
```
├── samples  
│   ├── bd  
│   │   ├── *.wav  
│   ├── sd  
│   │   ├── *.wav  
│   ├── pads  
│   │   ├── *.wav
```
N.B. browsers don't like .aif or .aiff files.
* run `npm run start` to compile json file of file tree and spin up local server
* `serve` message should show address of local server
* fetch `http://<address>/samples.json` from a browser script to get a list of url paths, grouped by directory
* Zen automatically looks here for samples. Refresh Zen to see a list of new sample banks in the console.
