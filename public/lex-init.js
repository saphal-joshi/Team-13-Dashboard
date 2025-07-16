document.addEventListener("DOMContentLoaded", () => {
  AWS.config.region = "us-east-1";
  AWS.config.credentials = new AWS.Credentials({
    accessKeyId: "",
    secretAccessKey: "",
    sessionToken: ""
  });
 
  const lexruntimev2 = new AWS.LexRuntimeV2();
 
  const inputBox = document.createElement("input");
  inputBox.placeholder = "Type your message...";
  const sendButton = document.createElement("button");
  sendButton.textContent = "Send";
  const chatDiv = document.createElement("div");
  chatDiv.style.border = "1px solid #ccc";
  chatDiv.style.padding = "10px";
  chatDiv.style.marginTop = "10px";
  chatDiv.style.height = "300px";
  chatDiv.style.overflowY = "auto";
 
  const container = document.getElementById("lex-container");
  container.appendChild(inputBox);
  container.appendChild(sendButton);
  container.appendChild(chatDiv);
 
  // You need to create a unique session ID per user (for demo we use fixed string)
  const sessionId = "user-session-1";
 
  sendButton.onclick = () => {
    const message = inputBox.value.trim();
    if (!message) return;
 
    // Append user message to chatDiv
    chatDiv.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
 
    const params = {
      botAliasId: "", // e.g. "TSTALIASID"
      botId: "",        
      localeId: "en_US",                // or your bot locale
      sessionId: sessionId,
      text: message
    };
 
    lexruntimev2.recognizeText(params, (err, data) => {
      if (err) {
        console.error(err);
        chatDiv.innerHTML += `<p style="color:red;">Error: ${err.message}</p>`;
      } else {
        const responseMessage = data.messages?.map(m => m.content).join(" ") || "No response";
        chatDiv.innerHTML += `<p><strong>Bot:</strong> ${responseMessage}</p>`;
        chatDiv.scrollTop = chatDiv.scrollHeight; // auto scroll to bottom
      }
    });
 
    inputBox.value = "";
  };
});
 