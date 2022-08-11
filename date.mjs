import EventEmmiter from 'events'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const emmiter = new EventEmmiter()

var ansi = require('ansi')
  , cursor = ansi(process.stdout)
cursor.bg.green().bold()


let str_timer = (year, month, day, hour, minute, second) => {

  let future = new Date(year, month, day, hour, minute, second)
  let now = new Date()
  let ms_left = future - now

  let res = new Date(ms_left)

  return `${res.getUTCFullYear() - 1970}.${res.getUTCMonth()}.${res.getUTCDate() - 1} ${res.getUTCHours()}:${res.getUTCMinutes()}:${res.getUTCSeconds()}`
}


emmiter.on('go', () => console.log(str_timer(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6], process.argv[7])))

setInterval(() => emmiter.emit('go'), 1000)