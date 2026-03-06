export default class Medicament {
  constructor (medicamentJSON) {
    // en paramètre un médicament au format JSON
    this._id = medicamentJSON.id
    this._denomination = medicamentJSON.denomination
    this._formepharmaceutique = medicamentJSON.formepharmaceutique ?? ''
    this._qte = medicamentJSON.qte ?? 0
    this._photo = medicamentJSON.photo ?? ''
  }

  get id () {
    return this._id
  }

  get denomination () {
    return this._denomination
  }

  set denomination (value) {
    this._denomination = value
  }

  get formepharmaceutique () {
    return this._formepharmaceutique
  }

  set formepharmaceutique (value) {
    this._formepharmaceutique = value
  }

  get qte () {
    return this._qte
  }

  set qte (value) {
    this._qte = value
  }

  get photo () {
    return this._photo
  }

  set photo (value) {
    this._photo = value
  }

  toString () {
    return `--> ${this._denomination} (${this._formepharmaceutique}) - Qté: ${this._qte}`
  }
}
