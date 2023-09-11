import _ from 'lodash'
import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from './constants'

export const isEmptyAllValue = (obj) => {
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== '') return false
  }
  return true
}

export const arrayValueToString = (array) => {
  let result = ''

  _.forEach(array, (value, index) => {
    if (index + 1 !== array.length) {
      result += `${value},`
    } else {
      result += value
    }
  })

  return result
}

export const minTwoDigits = (number) => {
  return (number < 10 ? '0' : '') + number
}

export const numberWithCommas = (value) => {
  if (value) {
    return value.toString().replace('/B(?<!.d*)(?=(d{3})+(?!d))/g', ',')
  }
}

export const secondsToMinutes = (seconds) => {
  const result = seconds
    ? Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2)
    : ''
  return result
}

export const renderVideoLink = (link) => {
  if (link?.includes('youtube')) {
    let video_id = link.split('v=')[1]
    return `https://img.youtube.com/vi/${video_id}/0.jpg`
  }
  if (link?.includes('vimeo')) {
    let video_id = link.split('/')[3]
    return `https://vumbnail.com/${video_id}_large.jpg`
  }
  return ''
}

export const convertTime = (duration) => {
  if (!duration) return null

  let time = ''
  if (duration < SECONDS_IN_HOUR) {
    const minutes = (duration / SECONDS_IN_MINUTE).toString().split('.')[0]
    const seconds = duration - Number(minutes) * SECONDS_IN_MINUTE
    time = `${minutes}m ${seconds}s`
  } else {
    const hours = (duration / SECONDS_IN_HOUR).toString().split('.')[0]
    const minutes = ((duration - Number(hours) * SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
      .toString()
      .split('.')[0]
    time = `${hours}h ${minutes}m`
  }
  return time
}

export const dataURLtoFile = (base64, filename) => {
  let arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}
