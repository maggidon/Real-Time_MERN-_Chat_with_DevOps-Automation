import React from 'react';
import PropTypes from 'prop-types';

const PATTERN_CELLS = Array.from({ length: 9 }, (_, i) => ({
  id: `pattern-cell-${i}`,
  animated: i % 2 === 0,
}));

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {PATTERN_CELLS.map(({ id, animated }) => (
            <div
              key={id}
              className={`aspect-square rounded-2xl bg-primary/10 ${animated ? 'animate-pulse' : ''}`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

AuthImagePattern.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default AuthImagePattern;
