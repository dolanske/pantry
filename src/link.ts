import type { Children } from '@dolanske/cascade'
import { El } from '@dolanske/cascade'
import { navigate } from '@dolanske/crumbs'

export function RouterLink(href: string, text: Children) {
  return El.a().setup((component) => {
    component.attr('href', href)
    component.nest(text)
    component.click((event) => {
      event.preventDefault()
      navigate(href)
    })
  })
}
