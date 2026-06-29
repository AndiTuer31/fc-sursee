import { useEffect } from 'react'

export function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? title + ' | FC Sursee' : 'FC Sursee'

    var metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    if (description) {
      metaDesc.setAttribute('content', description)
    }

    return function cleanup() {
      document.title = 'FC Sursee'
    }
  }, [title, description])
}
