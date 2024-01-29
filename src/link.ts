import { El } from '@dolanske/cascade'
import { navigate } from '@dolanske/crumbs'

export function RouterLink(text: string, href: string) {
  return El.a().setup((component) => {
    component.attr('href', href)
    component.text(text)
    component.click((event) => {
      event.preventDefault()
      navigate(href)
    })
  })
}
