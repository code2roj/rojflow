declare module '@mantine/core/styles.css'

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}
