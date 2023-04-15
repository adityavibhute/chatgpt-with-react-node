import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'ChatBot-React';

const config = {
  initialMessages: [createChatBotMessage(`Hello world`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;