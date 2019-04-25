export const theme = {
  breakpoints: [76, 96, 124].map(x => `${x}rem`),
  colors: {
    black: '#333',
    white: '#FFF',
    gray: {
      90: '#F0F4F8',
      80: '#D9E2EC',
      70: '#BCCCDC',
      60: '#9FB3C8',
      50: '#829AB1',
      40: '#627D98',
      30: '#486581',
      20: '#334E68',
      10: '#243B53',
      0: '#102A43',
    },
    purple: {
      90: '#E0E8F9',
      80: '#BED0F7',
      70: '#98AEEB',
      60: '#7B93DB',
      50: '#647ACB',
      40: '#4C63B6',
      30: '#4055A8',
      20: '#35469C',
      10: '#2D3A8C',
      0: '#19216C',
    },
    blue: {
      90: '#E3F8FF',
      80: '#B3ECFF',
      70: '#81DEFD',
      60: '#5ED0FA',
      50: '#40C3F7',
      40: '#2BB0ED',
      30: '#1992D4',
      20: '#127FBF',
      10: '#0B69A3',
      0: '#035388',
    },
    red: {
      90: '#FFE3E3',
      80: '#FFBDBD',
      70: '#FF9B9B',
      60: '#F86A6A',
      50: '#EF4E4E',
      40: '#E12D39',
      30: '#CF1124',
      20: '#AB091E',
      10: '#8A041A',
      0: '#610:316',
    },
    yellow: {
      90: '#FFFBEA',
      80: '#FFF3C4',
      70: '#FCE588',
      60: '#FADB5F',
      50: '#F7C948',
      40: '#F0B429',
      30: '#DE911D',
      20: '#CB6E17',
      10: '#B44D12',
      0: '#8D2B0B',
    },
    teal: {
      90: '#EFFCF6',
      80: '#C6F7E2',
      70: '#8EEDC7',
      60: '#65D6AD',
      50: '#3EBD93',
      40: '#27AB83',
      30: '#199473',
      20: '#147D64',
      10: '#0C6B58',
      0: '#014D40',
    },
  },
  fonts: {
    sans: 'sans-serif',
    serif: 'serif',
  },
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5,
    wide: 1.75,
  },
  fontSizes: {
    tiny: '1.2rem',
    small: '1.4rem',
    normal: '1.6rem',
    medium: '1.8rem',
    large: '2.4rem',
    xlarge: '3rem',
    xxlarge: '3.6rem',
  },
  maxWidths: {
    medium: '76rem',
    large: '96rem',
    xlarge: '124rem',
  },
  mediaQueries: {
    t: '@media (min-width: 32rem)',
    ts: '@media (min-width: 40rem)',
    s: '@media (min-width: 48rem)',
    m: '@media (min-width: 76rem)',
    l: '@media (min-width: 96rem)',
    x: '@media (min-width: 124rem)',
    xx: '@media (min-width: 144rem)',
  },
  textStyles: {
    caps: {
      textTransform: 'uppercase',
    },
    smallCaps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
}

theme.boxStyles = {
  lastNoMargin: {
    '&:last-child': {
      marginBottom: 0,
      marginRight: 0,
    },
  },
  firstLastNoMargin: {
    '&:first-child': {
      marginTop: 0,
      marginLeft: 0,
    },
    '&:last-child': {
      marginBottom: 0,
      marginRight: 0,
    },
  },
}

// Shortcuts
theme.c = theme.colors
theme.f = theme.fonts
theme.fs = theme.fontSizes
theme.fw = theme.fontWeights
theme.lh = theme.lineHeights
theme.mw = theme.maxWidths
theme.mq = theme.mediaQueries
theme.s = theme.space
theme.t = theme.transition
theme.ts = theme.textStyles
