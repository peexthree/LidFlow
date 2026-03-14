import { useEffect, useState } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  onDecryptionComplete?: () => void;
  animateOn?: 'view' | 'hover';
}

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = defaultChars,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  onDecryptionComplete,
  animateOn = 'hover',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovering && !isAnimating) {
      setIsAnimating(true);
      let iterations = 0;
      interval = setInterval(() => {
        if (iterations >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsAnimating(false);
          if (onDecryptionComplete) onDecryptionComplete();
        } else {
          const newText = text.split('').map((char) => {
            if (char === ' ') return ' ';
            return characters[Math.floor(Math.random() * characters.length)];
          }).join('');
          setDisplayText(newText);
          iterations++;
        }
      }, speed);
    } else if (!isHovering && !isAnimating) {
      setDisplayText(text);
    }
    return () => clearInterval(interval);
  }, [isHovering, text, speed, maxIterations, characters, isAnimating, onDecryptionComplete]);

  return (
    <span
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => animateOn === 'hover' && setIsHovering(true)}
      onMouseLeave={() => animateOn === 'hover' && setIsHovering(false)}
    >
      <span className={isAnimating ? encryptedClassName : className}>
        {displayText}
      </span>
    </span>
  );
};
