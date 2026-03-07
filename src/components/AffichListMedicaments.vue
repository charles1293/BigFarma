<script setup>
  import { computed, onMounted, reactive, ref } from 'vue'
  import Medicament from '@/Medicament.js'

  const props = defineProps(['critere'])

  const url = 'https://mini-proj-y2lk.onrender.com/api/medicaments'
  const listeMedicaments = reactive([])

  const medicamentsFiltres = computed(() => {
    if (!props.critere) return listeMedicaments
    return listeMedicaments.filter(m =>
      m.nom.toLowerCase().includes(props.critere.toLowerCase()),
    )
  })

  function getMedicaments () {
    const fetchOptions = { method: 'GET' }
    fetch(url, fetchOptions)
      .then(response => {
        return response.json()
      })
      .then(dataJSON => {
        listeMedicaments.length = 0
        const medicaments = dataJSON._embedded?.medicaments ?? []
        for (const result of medicaments) {
          const medicament = new Medicament(result)
          listeMedicaments.push(medicament)
        }
        console.log(listeMedicaments)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function updateQte (medicament, x) {
    medicament.unitesEnStock += x
    fetch(url + '/' + medicament.reference, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unitesEnStock: medicament.unitesEnStock,
      }),
    })
      .then(response => {
        if (!response.ok) {
          medicament.unitesEnStock -= x
          console.error('MAJ impossible')
        }
      })
      .catch(error => {
        medicament.unitesEnStock -= x
        console.error(error)
      })
  }

  function deleteMedicament (medicament) {
    fetch(url + '/' + medicament.reference, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const index = listeMedicaments.findIndex(m => m.reference === medicament.reference)
          if (index !== -1) {
            listeMedicaments.splice(index, 1)
          }
        } else {
          console.error('aie aie peut pas supp')
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  const dialogModif = ref()

  const editForm = reactive({
    reference: null,
    nom: '',
    quantiteParUnite: '',
    prixUnitaire: 0,
    unitesEnStock: 0,
    imageURL: '',
  })
  let medicamentEnCours = null

  function ajouterMedicament () {
    medicamentEnCours = null // variable qui perment de de faire la diff entre création et modif
    editForm.reference = null
    editForm.nom = ''
    editForm.quantiteParUnite = ''
    editForm.prixUnitaire = 0
    editForm.unitesEnStock = 0
    editForm.imageURL = ''
    dialogModif.value = true
  }

  function modifMedicament (medicament) {
    medicamentEnCours = medicament
    editForm.reference = medicament.reference
    editForm.nom = medicament.nom
    editForm.quantiteParUnite = medicament.quantiteParUnite
    editForm.prixUnitaire = medicament.prixUnitaire
    editForm.unitesEnStock = medicament.unitesEnStock
    editForm.imageURL = medicament.imageURL
    dialogModif.value = true
  }

  function validerModif () {
    const payload = {
      nom: editForm.nom,
      quantiteParUnite: editForm.quantiteParUnite,
      prixUnitaire: Number(editForm.prixUnitaire),
      unitesEnStock: Number(editForm.unitesEnStock),
      imageURL: editForm.imageURL,
    }

    if (medicamentEnCours !== null) {
      // Modif
      const old = {
        nom: medicamentEnCours.nom,
        quantiteParUnite: medicamentEnCours.quantiteParUnite,
        prixUnitaire: medicamentEnCours.prixUnitaire,
        unitesEnStock: medicamentEnCours.unitesEnStock,
        imageURL: medicamentEnCours.imageURL,
      }

      medicamentEnCours.nom = editForm.nom
      medicamentEnCours.quantiteParUnite = editForm.quantiteParUnite
      medicamentEnCours.prixUnitaire = Number(editForm.prixUnitaire)
      medicamentEnCours.unitesEnStock = Number(editForm.unitesEnStock)
      medicamentEnCours.imageURL = editForm.imageURL

      fetch(url + '/' + medicamentEnCours.reference, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),

      }).then(response => {
        if (!response.ok) {
          medicamentEnCours.nom = old.nom
          medicamentEnCours.quantiteParUnite = old.quantiteParUnite
          medicamentEnCours.prixUnitaire = old.prixUnitaire
          medicamentEnCours.unitesEnStock = old.unitesEnStock
          medicamentEnCours.imageURL = old.imageURL
          console.error('MAJ impossible', response.status)
        }
      }).catch(error => {
        medicamentEnCours.nom = old.nom
        medicamentEnCours.quantiteParUnite = old.quantiteParUnite
        medicamentEnCours.prixUnitaire = old.prixUnitaire
        medicamentEnCours.unitesEnStock = old.unitesEnStock
        medicamentEnCours.imageURL = old.imageURL
        console.error(error)
      })
    } else {
      // Ajout
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(response => {
          if (response.ok) {
            getMedicaments()
          } else {
            console.error('Erreur lors de la création')
          }
        })
        .catch(error => {
          console.error(error)
        })
    }

    dialogModif.value = false
  }

  onMounted(() => {
    getMedicaments()
  })
</script>

<template>
  <h3>Liste des médicaments</h3>

  <v-btn class="mb-4 ml-2" color="success" @click="ajouterMedicament">Ajouter un médicament</v-btn>

  <v-row dense>
    <v-col
      v-for="medicament in medicamentsFiltres"
      :key="medicament.reference"
      cols="12"
      lg="3"
      md="4"
      sm="6"
      xl="2"
    >
      <v-card class="ma-2" color="primary" elevation="4">
        <v-img
          v-if="medicament.imageURL"
          cover
          height="200px"
          :src="medicament.imageURL"
        />
        <v-img
          v-else
          cover
          height="200px"
          src="https://via.placeholder.com/300x200?text=Pas+de+photo"
        />
        <v-card-title>
          {{ medicament.nom }}
        </v-card-title>
        <v-card-subtitle>
          {{ medicament.quantiteParUnite }} — {{ medicament.prixUnitaire }} €
        </v-card-subtitle>
        <v-card-text>
          Quantité en stock : {{ medicament.unitesEnStock }}
        </v-card-text>
        <v-card-actions>
          <v-btn @click="updateQte(medicament, 1)">+</v-btn>
          <v-btn @click="updateQte(medicament, -1)">-</v-btn>
          <v-btn @click="deleteMedicament(medicament)">Supp</v-btn>
          <v-btn @click="modifMedicament(medicament)">Modifier</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="dialogModif">
    <v-card title="Modifier / Ajouter">
      <v-card-text>
        <v-text-field v-model="editForm.nom" label="Nom" />
        <v-text-field v-model="editForm.quantiteParUnite" label="Quantité par unité" />
        <v-text-field v-model.number="editForm.prixUnitaire" label="Prix unitaire" />
        <v-text-field v-model.number="editForm.unitesEnStock" label="Unités en stock" />
        <v-text-field v-model="editForm.imageURL" label="URL de l'image" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="dialogModif = false">Annuler</v-btn>
        <v-btn color="primary" @click="validerModif">Valider</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-btn {
  min-width: 32px;
  padding: 10px;
  border: 1px solid white;
}
</style>
