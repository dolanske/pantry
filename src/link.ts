import type { Children } from '@dolanske/cascade'
import { a } from '@dolanske/cascade'
import type { NavigateOptions } from '@dolanske/crumbs'
import { navigate } from '@dolanske/crumbs'

export function Link(href: string, text: Children, options: NavigateOptions = {}) {
  return a().setup((ctx) => {
    ctx.attr('href', href)
    ctx.nest(text)
    ctx.click((event) => {
      event.preventDefault()
      navigate(href, options)
    })
  })
}
