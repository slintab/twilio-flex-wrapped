async function getData(agent) {
  const path = Runtime.getAssets()["/data.csv"].path;
  const data = await readCsv(path);
  const record = data.find((row) => row[0] === agent);

  const result = {};

  if (record && data.length > 1) {
    record.forEach((element, index) => {
      if (index !== 0) {
        result[data[0][index]] = element;
      }
    });
  }

  return result;
}

function readCsv(path, options) {
  const csv = require("@fast-csv/parse");

  return new Promise((resolve, reject) => {
    const data = [];

    csv
      .parseFile(path, options)
      .on("error", reject)
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      });
  });
}

exports.handler = async (context, event, callback) => {
  const response = new Twilio.Response();

  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const results = await getData(event.workerSid);
    response.appendHeader("Content-Type", "application/json");
    response.setBody(results);
  } catch (error) {
    console.log(error.message);
    response.appendHeader("Content-Type", "plain/text");
    response.setBody(error.message);
    response.setStatusCode(500);
  }

  callback(null, response);
};
