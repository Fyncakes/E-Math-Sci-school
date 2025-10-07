import React from 'react';

const FloatingMath = () => {
  const mathSymbols = ['π', '∑', '∫', '√', '∞', 'α', 'β', 'γ', 'δ', 'ε', 'θ', 'λ', 'μ', 'σ', 'φ', 'ψ', 'ω'];

  return (
    <div className="floating-elements">
      {mathSymbols.map((symbol, index) => (
        <div 
          key={index} 
          className="floating-math"
          style={{
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${6 + (index % 3)}s`
          }}
        >
          {symbol}
        </div>
      ))}
    </div>
  );
};

export default FloatingMath;
