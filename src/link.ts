import type { Children } from '@dolanske/cascade'
import { a } from '@dolanske/cascade'
import type { NavigateOptions } from '@dolanske/crumbs'
import { navigate } from '@dolanske/crumbs'

export function Link(href: string, children: Children, options?: NavigateOptions) {
  return a(children).setup((ctx) => {
    ctx.attr('href', href)
    ctx.click((event) => {
      event.preventDefault()
      navigate(href, options)
    })
  })
}
