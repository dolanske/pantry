import { $, RouterLink, createApp } from '.'

const app = createApp({
  '/': $.div(
    RouterLink('/people/3', 'Henlo'),
  ),
  '/people/': $.div().setup((ctx, props) => {
    console.log(ctx, props)
    ctx.nest($.span(`Id ${props.$params.id}`))
  }),
})

app.run('#app')
