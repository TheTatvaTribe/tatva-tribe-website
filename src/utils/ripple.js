/**
 * Click ripple for CTA buttons. The original attached a global click
 * listener per `.ripple-btn` with no teardown; as a handler prop it dies
 * with the element.
 */
export function addRipple(event) {
  const host = event.currentTarget;
  const rect = host.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  host.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}
