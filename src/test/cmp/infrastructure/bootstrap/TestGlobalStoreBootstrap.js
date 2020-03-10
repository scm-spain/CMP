/* eslint-disable no-console */
import Cmp from '../../../../cmp/application/Cmp'
import TestGlobalStoreContainer from '../container/TestGlobalStoreContainer'
import registerWindowCMP from '../../../../cmp/infrastructure/controller/windowCommunicationRegistry'
import IframeRegistry from '../../../../cmp/infrastructure/service/IframeRegistry'
import fixJsdomPostMessageWithEventSource from '../controller/fixJSDOMPostMessage'
import bootstrap from '../../../../globalstorage/infrastructure/bootstrap/index'
const GLOBAL_CONSENT_STORE_INITIALIZATION_ERROR =
  'Error initializing global storage:'
export default class TestGlobalStoreBootstrap {
  static init({window, config}) {
    return Promise.resolve(config)
      .then(config => registerIframe(window)(config))
      .then(iframe =>
        Promise.resolve()
          .then(() =>
            fixJsdomPostMessageWithEventSource({
              origin: window,
              target: iframe.contentWindow
            })
          )
          .then(() => bootstrap(iframe.contentWindow))
          .then(
            () =>
              new TestGlobalStoreContainer({
                config,
                window,
                iframe: iframe.contentWindow
              })
          )
      )
      .then(container =>
        Promise.all([
          CMPFunctionalFacade(container),
          registerIframeCommunication(container)
        ])
      )
      .then(([cmp, any]) => registerWindowCMP({cmp, window}))
  }
}

const registerIframeCommunication = container =>
  container.getInstance({key: 'IframeCommunication'}).register()

const registerIframe = window => config =>
  new IframeRegistry({
    dom: window.document
  })
    .register({url: config.gdpr.globalConsentLocation})
    .catch(error =>
      console.error(GLOBAL_CONSENT_STORE_INITIALIZATION_ERROR, error)
    )
const CMPFunctionalFacade = container => new Cmp({container}).commandConsumer()
