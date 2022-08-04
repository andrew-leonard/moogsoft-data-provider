# moogsoft-data-provider
Package to allow random data to be sent into Moogsofts Observability platform

## Get Started
npm install

Grab your API key from your namespace

Add it to the index.js 

## Scripts

you can run the script with `node index.js` or with the npm scripts `npm run events` or `npm run metrics`

# Arguments

you can privide an api key with the apiKey argument: `--apiKey=<key>`

you can also specify what functions to run with arguments:
`--events`
`--metrics`
`--cyoiMetrics`
`--cyoiEvents`
`--credentials`

pass arguments to npm scrips -> `npm run events -- --apiKey=<key>`

This will give you 10 events sent at every 5 seconds and 5 metrics sent every 10 seconds. 

Metric values fluctuate based on a random number generator.

