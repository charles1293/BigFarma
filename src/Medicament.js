export default class Medicament {
  constructor (medicamentJSON) {
    // en paramètre un médicament au format JSON
    this._reference = medicamentJSON.reference
    this._nom = medicamentJSON.nom
    this._quantiteParUnite = medicamentJSON.quantiteParUnite ?? ''
    this._prixUnitaire = medicamentJSON.prixUnitaire ?? 0
    this._unitesEnStock = medicamentJSON.unitesEnStock ?? 0
    this._unitesCommandees = medicamentJSON.unitesCommandees ?? 0
    this._niveauDeReappro = medicamentJSON.niveauDeReappro ?? 0
    this._indisponible = medicamentJSON.indisponible ?? false
    this._imageURL = medicamentJSON.imageURL ?? ''
  }

  get reference () {
    return this._reference
  }

  get nom () {
    return this._nom
  }

  set nom (value) {
    this._nom = value
  }

  get quantiteParUnite () {
    return this._quantiteParUnite
  }

  set quantiteParUnite (value) {
    this._quantiteParUnite = value
  }

  get prixUnitaire () {
    return this._prixUnitaire
  }

  set prixUnitaire (value) {
    this._prixUnitaire = value
  }

  get unitesEnStock () {
    return this._unitesEnStock
  }

  set unitesEnStock (value) {
    this._unitesEnStock = value
  }

  get unitesCommandees () {
    return this._unitesCommandees
  }

  set unitesCommandees (value) {
    this._unitesCommandees = value
  }

  get niveauDeReappro () {
    return this._niveauDeReappro
  }

  set niveauDeReappro (value) {
    this._niveauDeReappro = value
  }

  get indisponible () {
    return this._indisponible
  }

  set indisponible (value) {
    this._indisponible = value
  }

  get imageURL () {
    return this._imageURL
  }

  set imageURL (value) {
    this._imageURL = value
  }

  toString () {
    return `--> ${this._nom} (${this._quantiteParUnite}) - Stock: ${this._unitesEnStock}`
  }
}
