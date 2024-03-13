import type { Children } from '@dolanske/cascade'
import { a } from '@dolanske/cascade'
import { navigate } from '@dolanske/crumbs'

export function RouterLink(href: string, text: Children) {
  return a().setup((ctx) => {
    ctx.attr('href', href)
    ctx.nest(text)
    ctx.click((event) => {
      event.preventDefault()
      navigate(href)
    })
  })
}
