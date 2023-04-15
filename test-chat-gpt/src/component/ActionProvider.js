import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleResponse = (param) => {
    const headers = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ param })
    }
    const urlReq = 'http://localhost:8080/chat';
    fetch(urlReq, headers).then(async (res) => {
      if (res?.ok) {
        const response = await res.json();
        printData(response.data);
      } else if (!res.ok) {
        // get error message from body or default to res status
        const error = (res && res.message) || res.status;
        return Promise.reject(error);
      }
    }).catch(err => console.error("Error in post", err));
  };

  const printData = (result) => {
    const botMessage = createChatBotMessage(
      result,
      {
        delay: 1000,
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleResponse,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;