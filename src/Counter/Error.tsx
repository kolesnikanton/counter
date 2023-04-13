import React from 'react';

export default function Error(props: {
  errorMessage: string
}) {
  const { errorMessage } = props;

  return (
    <h1 style={{ color: 'red' }}>
      Error
      {': '}
      {errorMessage}
    </h1>
  );
}
