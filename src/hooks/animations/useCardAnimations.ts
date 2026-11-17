import { useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface UseCardAnimationsProps {
  doScale?: boolean;
  doOutline?: boolean;
}

const useCardAnimations = (properties: UseCardAnimationsProps = { doScale: true, doOutline: true }) => {
  const [isCardSelected, setIsCardSelected] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const cardScale = useMotionValue(1);
  const cardPosY = useMotionValue(0);

  // Visible segment of line 1 is [erase, draw]; line 2 mirrors it: [1 - draw, 1 - erase]
  const draw = useMotionValue(0);
  const erase = useMotionValue(0);
  const lineLength = useTransform([draw, erase], ([d, e]: number[]) => Math.max(0, d - e));
  const line2Offset = useTransform(draw, (d) => 1 - d);

  const lineWanted = useRef(false);
  const lineRunning = useRef(false);
  const isMounted = useRef(true);
  const drawStop = useRef<(() => void) | null>(null);

  // Phases never overlap: draw -> (erase up to where the tip stopped) -> next draw if still hovered
  const runLineAnimation = async () => {
    if (lineRunning.current) return;
    lineRunning.current = true;

    while (isMounted.current) {
      const tip = draw.get();

      if (tip === 0 && lineWanted.current) {
        await new Promise<void>((resolve) => {
          const controls = animate(draw, 0.5, {
            duration: 1,
            ease: 'easeInOut',
            type: 'tween',
            onComplete: resolve
          });
          drawStop.current = () => {
            controls.stop();
            resolve();
          };
        });
        drawStop.current = null;
      } else if (tip > 0 && (!lineWanted.current || tip < 0.5)) {
        await animate(erase, tip, { duration: Math.max(0.2, tip * 2), ease: 'easeInOut', type: 'tween' });
        draw.set(0);
        erase.set(0);
      } else {
        break;
      }
    }

    lineRunning.current = false;
  };

  useEffect(() => {
    if (isCardHovered || isCardSelected) {
      properties.doScale && animate(cardScale, 1.02, { duration: 0.3, ease: 'easeOut' });
      properties.doOutline && animate(cardPosY, -5, { duration: 0.3, ease: 'easeOut' });
    } else {
      properties.doScale && animate(cardScale, 1, { duration: 0.3, ease: 'easeOut' });
      properties.doOutline && animate(cardPosY, 0, { duration: 0.3, ease: 'easeOut' });
    }

    lineWanted.current = isCardHovered || isCardSelected;

    // Leaving mid-draw freezes the tip at its current point; the loop then erases up to it
    if (!lineWanted.current && drawStop.current) {
      drawStop.current();
    }

    runLineAnimation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCardHovered, isCardSelected]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      draw.stop();
      erase.stop();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isCardSelected, setIsCardSelected, isCardHovered, setIsCardHovered, cardScale, cardPosY, lineLength, line2Offset, erase, draw };
};

export default useCardAnimations;
