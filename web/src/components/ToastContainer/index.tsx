import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';

interface ContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ContainerProps> = ({ messages }) => {
  const messagesWithTransition = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0, transform: 'rotateZ(200deg)' },
      enter: { right: '0%', opacity: 1, transform: 'rotateZ(360deg)' },
      leave: { right: '-120%', opacity: 0, transform: 'rotateZ(200deg)' },
    },
  );

  return (
    <Container>
      {messagesWithTransition.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
