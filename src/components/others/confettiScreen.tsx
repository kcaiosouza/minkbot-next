import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const ConfettiScreen = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Esse código só roda no cliente
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateSize(); // Seta os valores iniciais
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Só renderiza quando já temos as dimensões
  if (dimensions.width === 0 || dimensions.height === 0) return null;

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      colors={['#142F54', '#3B67A4']}
    />
  );
};

export default ConfettiScreen;