import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import io from 'socket.io-client';

import { ExitSVG } from '~/svg';
import { formEnter, formatDatetime } from '~/helpers';
import { getMessagesAPI, sendMessageAPI, signOutAPI } from '~/api';
import { Input } from '~/components';

import './style.css';

const socket = io('localhost:5500');

let beScroll = true;

function Message() {
  console.log('Message');

  const navigator = useNavigate(); 
  const inputRef = useRef();
  const messagesRef = useRef();

  const [firstLoad, setFirstLoad] = useState(true);
  const [messages, setMessage] = useState([]);

  useQuery({
    queryKey: ['messages'],
    queryFn: () => getMessagesAPI(),
    onSuccess: data => {
      if ( !data.status ) navigator('/sign-in');
      setMessage(data.data.messages);
    }
  });

  const signUtHandle = async () => {
    await signOutAPI();

    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');

    navigator('/sign-in');
  }

  const sendMessageHandle = async () => {
    const content = inputRef.current.value;

    inputRef.current.value = '';

    await sendMessageAPI({ content });
  }

  useEffect(() => {
    if (messagesRef.current.children.length > 0) {
      if (firstLoad) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        setFirstLoad(false);
        return;
      }

      const scrollTop = messagesRef.current.scrollTop;
      const clientHeight = messagesRef.current.clientHeight;
      const scrollHeight = messagesRef.current.scrollHeight;
      const messageHeight = messagesRef.current.lastElementChild.clientHeight;
  
      if ((scrollTop + clientHeight + messageHeight) > (scrollHeight - 10)) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect')
    });

    socket.on('disconnect', () => {
      console.log('disconnect')
    });

    socket.on('pong', () => {
      console.log('pong');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  useEffect(() => {

    socket.on('message', data => {
      setMessage([...messages, data]);
    });
  });

  return (
    <div className="screen main__wrap">
      <div ref={messagesRef} className="messages">
        {!messages ? (
          <div>Ko có gì ở đây cả</div>
        ) : messages.map(message => (
          <div className="message" key={message._id}>
            <div className="message__username">{message.sender}</div>

            <div className="message__content">
              <div className="message__text">{message.content}</div>

              <div className="message__date">{formatDatetime(message.createdAt)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat__form">
        <div className="chat_control">
          <div onClick={signUtHandle} className="icon">
            <ExitSVG />
          </div>
        </div>

        <div className="chat__input" onKeyDown={formEnter(sendMessageHandle)}>
          <Input className="chat__text" ref={inputRef} />
          <button className="chat__submit" onClick={sendMessageHandle}>SEND</button>
        </div>
      </div>
    </div>
  );
}

export default Message;