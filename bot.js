console.log("bot.js loaded");
const styleOptions = {
  // Add styleOptions to customize Web Chat canvas
  hideUploadButton: true,
};

// Add your BOT ID below
var BOT_ID = "227045c4-427a-45d3-b184-b43bb718b26b";
var theURL =
  "https://powerva.microsoft.com/api/botmanagement/v1/directline/directlinetoken?botId=" +
  BOT_ID;

const store = WebChat.createStore({}, ({ dispatch }) => (next) => (action) => {
  if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
    dispatch({
      type: "WEB_CHAT/SEND_EVENT",
    });
  }
  return next(action);
});

fetch(theURL)
  .then((response) => response.json())
  .then((conversationInfo) => {
    WebChat.renderWebChat(
      {
        directLine: WebChat.createDirectLine({
          token: conversationInfo.token,
        }),
        store,
        styleOptions,
      },
      document.getElementById("webchat")
    );
  })
  .catch((err) => console.error("An error occurred: " + err));
