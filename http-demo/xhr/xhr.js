console.log('start')

var xhr = new XMLHttpRequest()
xhr.open('get', 'http://10.0.60.147:38090/api/upm-service/manage/system_settings', true)
xhr.send(null)

console.log(xhr.readyState, xhr.status, xhr.responseText)
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
  console.log(xhr.responseText)
} else {
  console.log('Request was unsuccess: ' + xhr.status)
}

xhr.onreadystatechange = function () {
  console.log(this.readyState, this.status, this.responseText)
}

console.log('end')
