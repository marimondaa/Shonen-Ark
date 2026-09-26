// The head stays inside the artwork; input is observed across overlays and controls.
export function dragonTarget(clientX, clientY, rect) {
  const faceX = rect.left + rect.width * .25;
  const faceY = rect.top + rect.height * .72;
  const dx = clientX - faceX, dy = clientY - faceY;
  const distance = Math.hypot(dx, dy);
  const retreat = distance < 100 ? -(100 - distance) / 100 : 1;
  return {
    x: Math.max(-24, Math.min(24, dx * .06 * retreat)),
    y: Math.max(-18, Math.min(18, dy * .05 * retreat)),
  };
}
