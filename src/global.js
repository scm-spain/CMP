import globalStorageControllerRegistry from './globalstorage/infrastructure/controller/globalStorageController'
import CookieHandler from './cmp/infrastructure/service/CookieHandler'
import ReadCookieUseCase from './globalstorage/application/ReadCookieUseCase'
import WriteCookieUseCase from './globalstorage/application/WriteCookieUseCase'

Promise.resolve(window)
  .then(window => createCookieHandler({dom: window.document}))
  .then(cookieHandler =>
    Promise.all([
      createReadCookieUseCase({cookieHandler}),
      createWriteCookieUseCase({
        cookieHandler,
        domain: window.location.hostname
      })
    ]).then(([readCookieUseCase, writeCookieUseCase]) =>
      globalStorageControllerRegistry({
        window,
        readCookieUseCase,
        writeCookieUseCase
      })
    )
  )
  .then(() =>
    window.parent.postMessage({
      __globalStorage: {
        loaded: true
      }
    })
  )
  .catch(e =>
    window.parent.postMessage({
      __globalStorage: {
        loaded: true,
        error: e.message
      }
    })
  )

const createCookieHandler = ({dom}) => new CookieHandler({dom})

const createReadCookieUseCase = ({cookieHandler}) =>
  new ReadCookieUseCase({cookieHandler})

const createWriteCookieUseCase = ({cookieHandler, domain}) =>
  new WriteCookieUseCase({cookieHandler, domain})
