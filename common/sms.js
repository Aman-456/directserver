// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "AC9be08bdcf5c1208a59acc6f366f82875";
const authToken = "fc4af2199a63d00a26042a914b6d34e7";
const client = require("twilio")(accountSid, authToken);

module.exports.send = () => {
  return;
  try {
    client.messages
      .create({
        body: "Anni deya mzaak eee",
        from: "+14789997993",
        to: "+923030888007",
      })
      .then((message) => console.log(message.sid))
      .done();
  } catch (e) {
    console.log(e.message);
  }
};
