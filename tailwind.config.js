/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'accenta': { // used as default background for page headers, table headers etc.
          'DEFAULT': '#242433', // https://maketintsandshades.com/#164A13
          '900': '#242433',
          '800': '#242433	',
          '700': '#303044',
          '600': '#3c3c55',
          '500': '#474766',
          '400': '#535377',
          '300': '#5f5f88',
          '200': '#6b6b99',
          '100': '#7777aa',
          '000': '#7777aa',
        },
        'accentafg': { // used as default background for page headers, table headers etc.
          'DEFAULT': '#FFFFFF', // https://maketintsandshades.com/#164A13
          '900': '#FFFFFF',
          '800': '#E6E6E6	',
          '700': '#CCCCCC',
          '600': '#B3B3B3',
          '500': '#999999',
          '400': '#808080',
          '300': '#666666',
          '200': '#4C4C4C',
          '100': '#333333',
          '000': '#191919',
        },
        'accentb': { // Should complement accenta and be readable normally
          'DEFAULT': '#5959e6', // https://maketintsandshades.com/#fdc621 
          '900': '#5959e6',
          '800': '#5959e6	',
          '700': '#5959e6',
          '600': '#5959e6',
          '500': '#5959e6',
          '400': '#5959e6',
          '300': '#5959e6',
          '200': '#5959e6',
          '100': '#5959e6',
          '000': '#5959e6',
        },
        'accentbfg': { // Should complement accenta and be readable normally
          'DEFAULT': '#000000', // https://maketintsandshades.com/#fdc621 
          '900': '#000000',
          '800': '#000000	',
          '700': '#000000',
          '600': '#000000',
          '500': '#000000',
          '400': '#000000',
          '300': '#000000',
          '200': '#000000',
          '100': '#000000',
          '000': '#000000',
        },
        'cardbg': {
          'DEFAULT': '#F1F4F1',
        },
        'cardfg': {
          'DEFAULT': '#000000',
        },
        'modalbg': {
          'DEFAULT': '#F1F4F1',
        },
        'modalfg': {
          'DEFAULT': '#343434',
        },
        'labelfg': {
          'DEFAULT': '#343434',
        },
        'errorbg': {
          'DEFAULT': '#FFCCCC',
        },
        'errorfg': {
          'DEFAULT': '#000000',
        },          
        'backdrop': {
          'DEFAULT': '#040F04',
        },
        'tabcardbg': {
          'DEFAULT': '#FFFFFF',
        },
        'tabcardfg': {
          'DEFAULT': '#000000',
        },
        'tabdisabled': {
          'DEFAULT': '#dddddd',
          '500': '#bbbbbb'
        },
        'tabdisabledfg': {
          'DEFAULT': '#555555',
          '500': '#333333'
        },
      }
    },
  },
  plugins: [],
}


