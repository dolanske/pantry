import type { Component } from '@dolanske/cascade'
import { El } from '@dolanske/cascade'
import { navigate } from '@dolanske/crumbs'

export function RouterLink(text: Component, href: string) {
  return El.a().setup((component) => {
    component.attr('href', href)
    component.nest(text)
    component.click((event) => {
      event.preventDefault()
      navigate(href)
    })
  })
}
