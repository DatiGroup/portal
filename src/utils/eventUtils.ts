// ButtonBase (CardActionArea) starts its ripple from these events, and React bubbles them through portals (modals) too
const stopEvent = (e: React.SyntheticEvent) => e.stopPropagation();

export const stopPropagationEvents = {
  onClick: stopEvent,
  onMouseDown: stopEvent,
  onMouseUp: stopEvent,
  onTouchStart: stopEvent,
  onTouchEnd: stopEvent,
  onKeyDown: stopEvent,
  onKeyUp: stopEvent,
  onFocus: stopEvent,
  onBlur: stopEvent,
  onDragLeave: stopEvent
};
