import InvalidVendorListVersionError from '../../domain/InvalidVendorListVersionError'

export default class IABConsentManagementProviderV1 {
  constructor({
    getVendorConsentsUseCase,
    getConsentDataUseCase,
    pingUseCase,
    getVendorListUseCase,
    getConsentStatusUseCase
  }) {
    this._getVendorConsentsUseCase = getVendorConsentsUseCase
    this._getConsentDataUseCase = getConsentDataUseCase
    this._pingUseCase = pingUseCase
    this._getVendorListUseCase = getVendorListUseCase
    this._getConsentStatusUseCase = getConsentStatusUseCase
  }

  getVendorConsents(vendorIds, observer) {
    return this._getVendorConsentsUseCase
      .getVendorConsents({vendorIds})
      .then(vendorConsents => observer(vendorConsents, true))
  }

  getConsentData(consentStringVersion, observer) {
    return this._getConsentDataUseCase
      .getConsentData({consentStringVersion})
      .then(vendorConsentData => observer(vendorConsentData, true))
  }

  ping(_, observer) {
    return this._pingUseCase
      .ping()
      .then(pingReturn => observer(pingReturn, true))
  }

  getVendorList(vendorListVersion, observer) {
    return this._getVendorListUseCase
      .getVendorList({vendorListVersion})
      .then(globalVendorList => observer(globalVendorList, true))
      .catch(
        e =>
          e instanceof InvalidVendorListVersionError
            ? observer(null, false)
            : Promise.reject(e)
      )
  }

  getConsentStatus() {
    return this._getConsentStatusUseCase
      .getConsentStatus()
      .then(result => result)
  }
}
