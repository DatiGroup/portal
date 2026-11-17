// src/styles/scrollbarStyles.ts

export const scrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '8px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(0,0,0,0.3)'
    }
  }
};
