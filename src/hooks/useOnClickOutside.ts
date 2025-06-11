import { useEffect, RefObject } from 'react';

/**
 * Registers an event handler that will be called whenever the user clicks
 * outside of the given ref.
 *
 * @param ref The ref of the element to watch for clicks outside of.
 * @param handler The function to call when the user clicks outside of the
 * ref.
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}