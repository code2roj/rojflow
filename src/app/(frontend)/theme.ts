/**
 * ./theme.ts
 * @Type: Utility/Config
 * @Description: Defines the Mantine core theme configuration for the application
 * @Functions: createTheme
 */

"use client";
import { 
  createTheme, 
  virtualColor, 
  Button, 
  Card, 
  Tabs, 
  Stack, 
  Paper, 
  Container, 
  Grid, 
  Group, 
  TabsList
} from '@mantine/core';
import { BorderAnimate } from '@gfazioli/mantine-border-animate';

export const theme = createTheme({
  colors: {
    gray: ['#f5ebf3', '#f3e7f1', '#f1e4ee', '#efe0ec', '#edddea', '#b374a7', '#b56ba7', '#9e5490', '#572e50', '#10090f'],
    purple: ["#f4f1f8", "#e3e0eb", "#c6bdd8", "#a798c5", "#8d79b6", "#7c65ac", "#745ba8", "#4e3b74", "#453468", "#1f1730"],
    blue: ['#eaeced', '#dbe7f2', '#cce2f6', '#bddefb', '#afd9fd', '#add9ff', '#4caafd', '#0e7ae1', '#07447d', '#010e18'],
    green: ['#dafbe1', '#aceebb', '#6fdd8b', '#4ac26b', '#2da44e', '#1a7f37', '#116329', '#044f1e', '#003d16', '#002d11'],
    yellow: ['#f7f1e5', '#faeacd', '#fce3b5', '#fddd9d', '#fed687', '#ffd685', '#ffb82d', '#ce8906', '#744d03', '#191102'],
    orange: ['#fff1e5', '#ffd8b5', '#ffb77c', '#fb8f44', '#e16f24', '#bc4c00', '#953800', '#762c00', '#5c2200', '#471700'],
    red: ['#fff5f5', '#ffe3e3', '#ffc9c9', '#ffa8a8', '#ff8787', '#ff6b6b', '#fa5252', '#f03e3e', '#e03131', '#c92a2a'],
    pink: ['#fff0f6', '#ffdeeb', '#fcc2d7', '#faa2c1', '#f783ac', '#f06595', '#e64980', '#d6336c', '#c2255c', '#a61e4d'],
    grape: ['#f8f0fc', '#f3d9fa', '#eebefa', '#e599f7', '#da77f2', '#cc5de8', '#be4bdb', '#ae3ec9', '#9c36b5', '#862e9c'],
    violet: ['#f3f0ff', '#e5dbff', '#d0bfff', '#b197fc', '#9775fa', '#845ef7', '#7950f2', '#7048e8', '#6741d9', '#5f3dc4'],
    indigo: ['#d6dbec', '#bfc7e6', '#a8b3e0', '#909fda', '#798bd4', '#798bd4', '#3d58c4', '#283e8b', '#152351', '#040918'],
    cyan: ['#e3fafc', '#c5f6fa', '#99e9f2', '#66d9e8', '#3bc9db', '#22b8cf', '#15aabf', '#1098ad', '#0c8599', '#0b7285'],
    teal: ['#e6fcf5', '#c3fae8', '#96f2d7', '#63e6be', '#38d9a9', '#20c997', '#12b886', '#0ca678', '#099268', '#087f5b'],
    lime: ['#f4fce3', '#e9fac8', '#d8f5a2', '#c0eb75', '#a9e34b', '#94d82d', '#82c91e', '#74b816', '#66a80f', '#5c940d'],
    virtual: virtualColor({
      name: 'virtual',
      dark: 'cyan',
      light: 'purple'
    })
  },
  primaryColor: 'cyan',
  primaryShade: { light: 6, dark: 6 },
  white: '#fafaed',
  black: '#000b13',
  autoContrast: true,
  luminanceThreshold: 0.3,
  defaultGradient: { from: "cyan.8", to: "red.9", deg: 45 },
  fontFamily: 'Helvetica, sans-serif',
  fontFamilyMonospace: 'Roboto Mono, monospace',
  fontSizes: { xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem' },
  headings: {
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '3rem', lineHeight: '2', fontWeight: '600' },
      h2: { fontSize: '2.5rem', lineHeight: '1.5', fontWeight: '500' },
      h3: { fontSize: '2rem', lineHeight: '1.4', fontWeight: '450' },
      h4: { fontSize: '1.125rem', lineHeight: '1.3', fontWeight: '400' },
      h5: { fontSize: '1rem', lineHeight: '1.2', fontWeight: '350' },
      h6: { fontSize: '0.875rem', lineHeight: '1.1', fontWeight: '300' }
    }
  },
  scale: 1.2,
  radius: { xs: '0.125rem', sm: '0.25rem', md: '0.5rem', lg: '1rem', xl: '2.2rem' },
  spacing: { xs: '0.525rem', sm: '1.15rem', md: '1.5rem', lg: '1.65rem', xl: '2.5rem' },
  defaultRadius: 'md',
  breakpoints: { xs: '36em', sm: '48em', md: '62em', lg: '75em', xl: '88em' },
  fontSmoothing: true,
  respectReducedMotion: false,
  focusRing: 'never',
  cursorType: 'default',
  
  components: {
    Card: Card.extend({
      defaultProps: {
        withBorder: true,
        radius: 'md',
        padding: 'sm',
        shadow: 'sm'
      }
    }),
    Button: Button.extend({
      defaultProps: {
        variant: 'filled',
        color: 'cyan',
        size: 'lg',
        radius: 'md',
      },
      styles: {
        root: {
          transition: 'all 150ms ease',
          '&:hover': {
            transform: 'scale(1.03)',
            filter: 'brightness(1.1)',
          },
        },
      },
    }),
    BorderAnimate: BorderAnimate.extend({
      defaultProps: {
        variant: 'pulse',
        beamMode: 'path',
        reverse: true,
        size: 'md',
        borderWidth: 'md',
        blur: 'md',
        h: 220,
        duration: 4.3,
        angle: 326,
        borderOpacity: 0.8,
        colorFrom: 'grape',
        colorTo: 'red',
      },
    }),
    Tabs: Tabs.extend({
      defaultProps: {
        color: 'red',
        radius: 'md',
      },
      styles: {
      },
    }),
    TabsList: Tabs.List.extend({
      defaultProps: {
        justify: "center"
      }
    }),
    Stack: Stack.extend({
      defaultProps: { gap: 'sm' }
    }),
    Paper: Paper.extend({
      defaultProps: { shadow: 'sm', withBorder: false, radius: 'md', p: 'sm', bg: 'dark.6' }
    }),
    Container: Container.extend({
      defaultProps: { fluid: true }
    }),
    Grid: Grid.extend({
      defaultProps: { grow: true }
    }),
    Group: Group.extend({
      defaultProps: { preventGrowOverflow: false, grow: true, gap: 'sm' }
    })
  }
});

export default theme;