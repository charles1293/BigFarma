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

  get formepharmaceutique () {
    return this._formepharmaceutique
  }

  get qte () {
    return this._qte
  }

  get photo () {
    return this._photo
  }

  toString () {
    return `--> ${this._denomination} (${this._formepharmaceutique}) - Qté: ${this._qte}`
  }
}
