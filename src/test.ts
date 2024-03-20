import { div, pre, span } from '@dolanske/cascade'
import { Link, createApp } from '.'

const app = createApp({
  '/': div(
    Link('/people/3', 'Henlo'),
  ),
  '/people/:id': {
    component: div().setup((ctx, props) => {
      ctx.nest([
        span(`Id ${props.$params.id}`),
        pre(JSON.stringify(props.$data, null, 2)),
        Link('/', 'back'),
      ])
    }),
    async loader({ id }: { id: number }) {
      return fetch(`https://swapi.dev/api/people/${id}`)
        .then(r => r.json())
        .then(d => d)
    },
  },
})

app.run('#app')
