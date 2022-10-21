export const getStyles = <T extends ReadonlyArray<string>>(
  styles: { [className: string]: string },
  ...keys: T
) => {
  keys.forEach(key => {
    if (!styles[key]) {
      throw new Error(`Stylesheet is missing class ${key}`)
    }
  })

  return styles as { [K in T[number]]: string }
}
