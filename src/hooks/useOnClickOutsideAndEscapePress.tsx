import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent | KeyboardEvent;

function useOnClickOutsideAndEscapePress<T extends HTMLElement = HTMLElement>(
   ref: RefObject<T>,
   handler: (event: Event) => void
): void   {
   useEffect(() => {
      const listener = (event: Event) => {
         // Do nothing if clicking ref's element or descendent elements
         if (!ref.current || ref.current.contains(event.target as Node)) {
            return;
         }

         // Handle escape key press
         if (event instanceof KeyboardEvent && event.key === 'Escape') {
            handler(event);
            return;
         }

         handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      document.addEventListener('keydown', listener);

      return () => {
         document.removeEventListener('mousedown', listener);
         document.removeEventListener('touchstart', listener);
         document.removeEventListener('keydown', listener);
      };
   }, [ref, handler]);
}

export default useOnClickOutsideAndEscapePress;
