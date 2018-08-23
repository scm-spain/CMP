const CMP_LOCATOR_NAME = '__cmpLocator'

const registerCmpLocator = ({dom}) => {
  return Promise.resolve()
    .then(() => dom.getElementsByName(CMP_LOCATOR_NAME))
    .then(elements => {
      if (elements && elements.length) {
        return elements[0]
      } else {
        const iFrame = dom.createElement('iframe')
        iFrame.style.display = 'none'
        iFrame.name = CMP_LOCATOR_NAME
        dom.body.appendChild(iFrame)
        return iFrame
      }
    })
}

export default registerCmpLocator
