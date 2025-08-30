// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const chatArea = document.getElementById("chat-area");
    
    // Chat state
    let conversationStep = 0;
    let userName = "";
    
    // Conversation flow responses
    const botResponses = [
        "Thank you! Now, what service would you like to book? (e.g., Haircut, Beard trim, Hair wash)",
        "Great choice! What date and time would work best for you?",
        "Perfect! I have scheduled your appointment. Is there anything else I can help you with?",
        "Thank you for using our booking service! Have a great day!"
    ];
    
    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
        try {
            const messageElement = document.createElement("div");
            messageElement.classList.add("chat-message");
            messageElement.classList.add(isUser ? "user" : "bot");
            messageElement.textContent = text;
            
            chatArea.appendChild(messageElement);
            
            // Auto-scroll to bottom
            chatArea.scrollTop = chatArea.scrollHeight;
            
            return messageElement;
        } catch (error) {
            console.error("Error adding message:", error);
        }
    }
    
    // Function to simulate bot typing and response
    function simulateBotResponse(responseText, delay = 1500) {
        setTimeout(() => {
            addMessage(responseText, false);
        }, delay);
    }
    
    // Function to handle sending a message
    function sendMessage() {
        try {
            const messageText = messageInput.value.trim();
            
            if (!messageText) {
                // Shake the input to indicate it's required
                messageInput.style.animation = "shake 0.5s";
                setTimeout(() => {
                    messageInput.style.animation = "";
                }, 500);
                return;
            }
            
            // Add user message to chat
            addMessage(messageText, true);
            
            // Clear input
            messageInput.value = "";
            
            // Handle conversation flow
            handleConversationFlow(messageText);
            
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
    
    // Function to handle conversation flow
    function handleConversationFlow(userMessage) {
        try {
            switch (conversationStep) {
                case 0:
                    // User provided their name
                    userName = userMessage;
                    simulateBotResponse(`Nice to meet you, ${userName}! ${botResponses[0]}`);
                    conversationStep++;
                    break;
                    
                case 1:
                    // User selected a service
                    simulateBotResponse(botResponses[1]);
                    conversationStep++;
                    break;
                    
                case 2:
                    // User provided date/time
                    simulateBotResponse(botResponses[2]);
                    conversationStep++;
                    break;
                    
                case 3:
                    // Final response
                    simulateBotResponse(botResponses[3]);
                    conversationStep++;
                    break;
                    
                default:
                    // Default response for continued conversation
                    simulateBotResponse("Thank you for your message. How else can I assist you today?");
                    break;
            }
        } catch (error) {
            console.error("Error in conversation flow:", error);
        }
    }
    
    // Event listeners
    sendButton.addEventListener("click", sendMessage);
    
    // Handle Enter key press
    messageInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
    
    // Handle input focus for better UX
    messageInput.addEventListener("focus", function () {
        this.style.borderColor = "#007aff";
    });
    
    messageInput.addEventListener("blur", function () {
        this.style.borderColor = "#636366";
    });
    
    // Add shake animation for empty input validation
    const style = document.createElement("style");
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize chat with focus on input
    messageInput.focus();
    
    console.log("InBarber Chat initialized successfully");
});
