import { div, pre, span } from '@dolanske/cascade'
import type { PropType } from './pantry'
import { Link, createApp } from '.'

interface Props {
  data: string[]
}

const app = createApp({
  '/': div(
    Link('/people/3', 'Henlo'),
  ),
  '/people/:id': {
    component: div<PropType<{ data: string[] }, Props>>().setup((ctx, props) => {
      ctx.nest([
        span(`Id ${props.$params.id}`),
        pre(JSON.stringify(props.$data, null, 2)),
        pre(JSON.stringify(props.data, null, 2)),
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
