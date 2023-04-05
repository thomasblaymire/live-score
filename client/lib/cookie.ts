function setCookie(
  name: string,
  value: string,
  options: Record<string, any> = {}
) {
  options = {
    path: '/',
    ...options,
  }

  let expires = options.expires
  if (typeof expires === 'number' && expires) {
    const d = new Date()
    d.setTime(d.getTime() + expires * 1000)
    expires = options.expires = d
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString()
  }

  value = encodeURIComponent(value)

  let updatedCookie = `${name}=${value}`
  for (const [optionName, optionValue] of Object.entries(options)) {
    updatedCookie += `; ${optionName}`
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`
    }
  }

  document.cookie = updatedCookie
}

function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 })
}

export { setCookie, getCookie, deleteCookie }
