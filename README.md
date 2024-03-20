# PANTRY

Completely homegrown framework, utilizing my own libraries [Cascade](https://github.com/dolanske/cascade) for UI components and [Crumbs](https://github.com/dolanske/crumbs) for client side routing. Oh the joy of creating things.

## [Cascade](https://github.com/dolanske/cascade)

Is a simple library to write reusable UI components using nothing but raw will and render functions. The idea behind such library has been on my mind for almost a year, so it's lovely to finally see it happen.

A simple example of a reusable piece of UI written in Cascade.

```ts
import { ref } from '@vue-reactivity'
import { button } from '@dolanske/cascade'

const CounterComponent = button().setup(({ self, props }) => {
  const data = ref(props.startingCount as number)

  self.text(() => `Clicked ${data.value} times`)
  self.click(() => {
    if (props.canIncrement.value)
      data.value++
  })
})
```

## [Crumbs](https://github.com/dolanske/crumbs)

I wish I had a SPA router utilizing native browser history API? Kid named SPA router utilizing native browser history API: hold my beer.

Crumbs is a simple client side routing library, working with raw HTML files imported as strings. Here's an example

```ts
import { defineRouter } from '@dolanske/router'

import main from './routes/main.html?raw'
import user from './routes/user.html?raw'
import errorFallback from './routes/errorFallback.html?raw'

const routes = {
  '/': main,
  '/about': '<span>About Us</span>',
  '/user/:id': {
    html: user,
    // In case loader throws, you can provide a fallback route to render instead
    fallback: errorFallback,
    async loader({ id }: { id: number }) {
      return fetch(`https://swapi.dev/api/people/${id}`)
        .then(r => r.json())
        .then(d => d)
    },
  },
}

defineRouter(routes).run('#app')
```

## Both together = Pantry

To explain it in the simplest terms, Pantry uses the routing mechanism of Crumbs, but instead of rendering HTML files, it renders the UI components provided by Cascade. And that's it. There's nothing else to it!

Pantry also provides a reusable component called `Link`, which is used to navigate between pages. It takes in two parameters, the first one is another component, the second is the path.
```ts
import { Link, createApp, div, h1, p, pre } from '@dolanske/pantry'

const app = createApp({
  '/home': div([
    h1('HOME'),
    Link('About us', '/about'),
    Link('Random person', `/person/${getRandomNumberInRange(1, 10)}`),
  ]),
  '/about': div([
    h1('About us'),
    p('We are a community of {big number} and constantly growing!'),
    Link('Go back', '/home'),
  ]),
  '/user/:id': {
    component: div().setup((ctx, props) => {
      // Every route props object will contain two properties
      // props.$data - if route has loader, the resolved dataset will be here
      // props.$params - dynamic path parameters (eg.: /user/:id)
      ctx.nest([
        pre(JSON.stringify(props.$data, null, 2)),
      ])
    }),
    async loader(params) {
      return fetch(`https://swapi.dev/api/people/${params.id}`)
        .then(r => r.json())
        .then(d => d)
    },
    fallback: p('Whoops, something went wrong :/'),
  }
})

app.run('#app')
```
