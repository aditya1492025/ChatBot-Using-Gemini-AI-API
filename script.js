import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyDsFwhaRKuD114HEODxxW9KEFMq8Yrn-F8"; 
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const chatHistory = document.querySelector(".chat-history");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", async () => {
  const userMessage = userInput.value;
  userInput.value = "";

  const messageElement = document.createElement("div");
  messageElement.classList.add("user-message");
  messageElement.textContent = userMessage;
  chatHistory.appendChild(messageElement);

  try {
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const botResponse = response.text();

    const botMessageElement = document.createElement("div");
    botMessageElement.classList.add("bot-message");
    botMessageElement.textContent = botResponse;
    chatHistory.appendChild(botMessageElement);
  } catch (error) {
    console.error("Error:", error);
    // Handle errors gracefully, e.g., display an error message to the user
  }

  chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom
});


