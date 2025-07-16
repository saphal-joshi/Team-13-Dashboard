document.addEventListener("DOMContentLoaded", () => {
  AWS.config.region = "us-east-1";
  AWS.config.credentials = new AWS.Credentials({
    accessKeyId: "ASIA27PR364I3OX3VLTI",
    secretAccessKey: "1d7WuxmM/sdgrqjfe6Io+afW99kG4ZJE3vo3tKIO",
    sessionToken: "IQoJb3JpZ2luX2VjEEkaCXVzLWVhc3QtMSJIMEYCIQCjcPDkhCFuKhYVxFjHF+8QK6OYkBZu6Jc4OXACM2r1FQIhANcS+eUNadT/kC1XF4h8KfULFYbK9WvTGtwdL+65lLOzKvkCCGIQABoMNzU0ODEwODc3NzEzIgxrc41rJbjFCaIgA+Uq1gKg5tmHP8BIPRoT8xPy39jv65x04Y1TxdHpqs+emCWS5xCjWlIdybvIdSy5i317sAikuW2EUBwcySd+KtJS7y8szb7qtwdO6cbExRDaoIFyc4r4LwdlyXUSzdNeXFNL+f6KhutuVBrIy6fdxLnPPVojOILxCoD4ALG4MLNqrIG4ItoZg/eJwPsdiaV2QNXeWGzBwol6ygXTZPe4F/BBSG52lMiTJWp4MbZvvq44hXqgzVWCWjaLHffhugdLPdVzFx/c5Sxm+H/KAi1em0wPIvDWrJ4pLFS2R22fVcGMuylYI6yvgGLfJuNemRQAJBjC9wC85h1IYgansYiHqyU6/EaXRe1VXn5ujdz1KBUW63X86gO6sijGgtoaGGREyFgoOqI6v98fWwH8JdNEVomC6IlshdDYtBO8gE/vZglSw3lj9D5rv52Mb44Y+3+QPGBRQgcFvCay3qMwgrDfwwY6pgGBvWhBzhrY3PrwKBUuaFDY7en0y9/JvbkKzxHZtNvQZO6mjql/i++W3mftpdxbE8QqA05AuDsL3u/5OmxoZjP2n7NdUYUk9UoLcAkYrMQCWeU/X5HjYeBI2jVD8eJrFGCt9VhMDWvj6VM0bKfFCLl3p5Gb6oKoCmGc0KzzerdzYgq5ZuVTS24rGxQtn0rw8zggDKBndwZ42VbILl98uuodjT6sBnX7"
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
      botAliasId: "XL3HUOOBXE", // e.g. "TSTALIASID"
      botId: "J04J53KVTF",        
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
 