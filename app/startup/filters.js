import datetimeFormat from 'datetime-format'

const urlParser = document.createElement('a')

export function domain(url) {
  urlParser.href = url
  return urlParser.hostname
}

export function fromNow(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }

  return time + label + 's';
}

export function datetime(dateString, format) {
  if(dateString == null) return ''
  var reg = new RegExp("[\\-:]","gi")
  var fields = dateString.replace(reg, ' ').split(' ')

  var time = new Date(fields[0], parseInt(fields[1])-1, fields[2],
    fields[3], fields[4], fields[5]).getTime()
  var date = new datetimeFormat(time)
  return date.format(format);
}
