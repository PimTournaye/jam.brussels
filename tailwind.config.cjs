/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'log-cabin': { // BLACK
        DEFAULT: "#111613",
        '50': '#f5f8f5',
        '100': '#dfe8e1',
        '200': '#bed1c4',
        '300': '#95b39e',
        '400': '#6f927b',
        '500': '#557761',
        '600': '#425f4d',
        '700': '#384d41',
        '800': '#2f4036',
        '900': '#111613',
      },
      'cinnabar': { // RED
        DEFAULT: '#DF3F1F',
        '50': '#F6C9BF',
        '100': '#F4B9AE',
        '200': '#EF9B8A',
        '300': '#EA7C66',
        '400': '#E55D42',
        '500': '#DF3F1F',
        '600': '#AE3118',
        '700': '#7C2311',
        '800': '#4B150A',
        '900': '#1A0704'
      },
      'tulip-tree': { // YELLOW
        DEFAULT: '#E8AE3B',
        '50': '#FBF2DF',
        '100': '#F9EACD',
        '200': '#F5DBA9',
        '300': '#F1CC84',
        '400': '#ECBD60',
        '500': '#E8AE3B',
        '600': '#D29419',
        '700': '#A07113',
        '800': '#6E4D0D',
        '900': '#3C2A07'
      },
      'cararra': { // WHITE
        DEFAULT: '#ECEDE6',
        '50': '#FFFFFF',
        '100': '#FFFFFF',
        '200': '#FFFFFF',
        '300': '#FFFFFF',
        '400': '#FFFFFF',
        '500': '#FFFFFF',
        '600': '#FEFEFE',
        '700': '#ECEDE6',
        '800': '#D3D6C5',
        '900': '#BABEA5'
      },
      'cadet-grey': { // GREY
        DEFAULT: '#A2AEBB',
      }
    },
    plugins: [],
  }
}
