import { El } from '@dolanske/cascade'
import { createApp } from './pantry'
import { RouterLink } from './link'

function getRandomNumberInRange(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const app = createApp({
  '/home': El.div([
    El.h1('H O M E'),
    RouterLink('About us', '/about'),
    RouterLink('Random person', `/person/${getRandomNumberInRange(1, 10)}`),
  ]),
  '/about': El.div([
    El.h1('About us'),
    El.p('We are a community of {big number} and constantly growing!'),
    RouterLink('Go back', '/home'),
  ]),
  '/person/:id': El.div().setup((instance, props) => {
    // Should contain the data
    instance.nest([
      El.pre(JSON.stringify(props.data, null, 2)),
    ])
  }),
})

app.run('#app')
