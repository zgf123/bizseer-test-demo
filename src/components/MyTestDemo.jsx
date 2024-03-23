import React, { useEffect, useRef } from 'react'

const MyTestDemo = () => {
  let ref = useRef(null)

  useEffect(() => {
    if (ref) {
      console.log(HTMLElement.prototype)
      window.addEventListener('storage', function (e) {
        console.log(e)
      })

      let el = document.getElementById('aaaa')
      el.addEventListener(
        'click',
        () => {
          console.log(121)
        },
        false
      )
      console.log(el.__proto__)

      for (const key in el) {
        if (key.indexOf('on') === 0 && typeof el[key] === 'function') {
          console.log(key)
        }
        if (key.startsWith('c')) {
          console.log(key['click'])
        }
      }
    }
  }, [])

  return (
    <div>
      <p ref={ref} id="aaaa" onClick={() => localStorage.setItem('a', 1)}>
        测试事件绑定问题
      </p>
    </div>
  )
}

export default MyTestDemo
