# Twilio Flex Wrapped

This [Twilio Flex](https://www.twilio.com/flex) plugin was inspired by [Spotify Wrapped](https://en.wikipedia.org/wiki/Spotify_Wrapped). It enables contact center agents to look at some interesting data about their activity. 


## Demo
![Demo](demo.jpg?raw=true)

## Design
![Architecture](architecture.png?raw=true)

The repository contains two folders:
- `flex-wrapped-function`: contains the code for a [Twilio Function](https://www.twilio.com/docs/runtime/functions) and a [Twilio Asset](https://www.twilio.com/docs/runtime/assets), used for fetching and storing the data that is to be displayed in the Wrapped report, respectively. 
- `flex-wrapped-plugin`: contains the code for a [Twilio Flex plugin](https://www.twilio.com/docs/flex/developer/plugins), which calls the `flex-wrapped-function` to fetch the data and displays the Wrapped report within Flex for the agents to view.

The data shown in the demo above was gathered using [Flex Insights](https://www.twilio.com/docs/flex/end-user-guide/insights) and then exported as a CSV file to `/Users/bszmolka/Projects/flex-wrapped/flex-wrapped-function/assets/data.private.csv`. 

The plugin uses the Worker SID to link the data from the .csv to the agent. The function expects the Worker SID to be present in the first column of the .csv containing the report data.


## Setup

1. ***Deploy the Twilio Function and Asset***
   1. Install the [Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit).
   2. Navigate to the function directory: `cd flex-wrapped-function`
   3. Deploy the function and the assets using the `twilio serverless:deploy` command.
   4. Make note of the newly deployed function's URL.

2. ***Install the Flex plugin:***
   1. Install the [Flex Plugins CLI](https://www.twilio.com/docs/flex/developer/plugins/cli).
   2. Navigate to the plugin directory: `cd flex-wrapped-plugin`
   3. Open the `flex-wrapped-plugin/src/components/Report.jsx` file. Replace `<YOUR_FUNCTION_URL>` with the URL of your Twilio function from step 1.
   4. Install the flex plugin using the `twilio flex:plugins:deploy` command. 
   
   Note that the plugin requires React 16.13.1. The instructions for updating the React version of your Flex instance can be found [here](https://www.twilio.com/docs/flex/developer/plugins/react-versions).

That's it! Navigate to your Flex instance to see your Flex Wrapped report!

## Maintainer
Thanks for reading this far!
If you have any questions, do not hesitate to reach out at `hello@slintab.dev`