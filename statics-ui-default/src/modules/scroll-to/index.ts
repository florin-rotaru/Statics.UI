import { scroll } from 'quasar';

export default function useScrollTo(
  elementId: string | undefined,
  offsetTop = 16
) {
  if (elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      const { getScrollTarget, setVerticalScrollPosition } = scroll;
      const target = getScrollTarget(element);
      const offset = element.offsetTop - offsetTop;
      setVerticalScrollPosition(target, offset, 64);
    }
  }
}
