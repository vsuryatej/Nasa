import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const GreenhouseGasDetail = () => {
  const { name } = useParams();

  return (
    <Container>
      <h1>{name}</h1>
      <p>Details about {name} and its effects on the environment.</p>
    </Container>
  );
};

export default GreenhouseGasDetail;
