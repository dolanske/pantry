# PANTRY

Completely homegrown framework, utilizing my library [Cascade](https://github.com/dolanske/cascade) for UI components and [Crumbs](https://github.com/dolanske/crumbs) for client side routing. Oh the joy of creating things.

## [Cascade](https://github.com/dolanske/cascade)

Is a simple library to write reusable UI components using nothing but raw will and render functions. The idea behind such library has been on my mind for almost a year, so it's lovely to finally see it happen.

A simple example of a reusable piece of UI written in Cascade.

```ts
import { ref } from '@vue-reactivity'
import { El } from '@dolanske/cascade'

const CounterComponent = El.button().setup(({ self, props }) => {
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

Pantry also provides a reusable component called `RouterLink`, which is used to navigate between pages. It takes in two parameters, the first one is another component, the second is the path.
```ts
import { createApp } from '@dolanske/pantry'
import { El } from '@dolanske/cascade'

const app = createApp({
  '/home': El.div([
    El.h1('HOME'),
    RouterLink('About us', '/about'),
    RouterLink('Random person', `/person/${getRandomNumberInRange(1, 10)}`),
  ]),
  '/about': El.div([
    El.h1('About us'),
    El.p('We are a community of {big number} and constantly growing!'),
    RouterLink('Go back', '/home'),
  ]),
  '/user/:id': {
    template: El.div().setup((instance, props) => {
    // If a route has a loader, the returned dataset will added to `props.data`
      instance.nest([
        El.pre(JSON.stringify(props.data, null, 2)),
      ])
    }),
    fallback: El.p('Whoops, something went wrong :/'),
    async loader({ id }: { id: number }) {
      return fetch(`https://swapi.dev/api/people/${id}`)
        .then(r => r.json())
        .then(d => d)
    },
  }
})

app.run('#app')
```
