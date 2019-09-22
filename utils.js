export const camel = (string) => {
  if (string === undefined || string === null || string === '' || typeof string !== 'string') {
    return ''
  }

  const splitted = string.split('_')

  if (splitted.length === 1) {
    return string
  }

  const capitalized = splitted.map(word => (word.charAt(0).toUpperCase() + word.slice(1)))

  return [splitted[0]].concat(capitalized.slice(1)).join('')
}

export default { camel }
