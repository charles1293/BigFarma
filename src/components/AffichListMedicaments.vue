<script setup>
  import { computed, onMounted, reactive, ref } from 'vue'
  import Medicament from '@/Medicament.js'

  const props = defineProps(['critere'])

  const url = 'https://apipharmacie.pecatte.fr/api/7/medicaments'
  const listeMedicaments = reactive([])

  const medicamentsFiltres = computed(() => {
    if (!props.critere) return listeMedicaments
    return listeMedicaments.filter(m =>
      m.denomination.toLowerCase().includes(props.critere.toLowerCase()),
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
        for (const result of dataJSON) {
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
    medicament.qte += x
    fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: medicament.id,
        denomination: medicament.denomination,
        formepharmaceutique: medicament.formepharmaceutique,
        qte: medicament.qte,
        photo: medicament.photo,
      }),
    })
      .then(response => {
        if (!response.ok) {
          medicament.qte -= x
          console.error('MAJ impossible')
        }
      })
      .catch(error => {
        medicament.qte -= x
        console.error(error)
      })
  }

  function deleteMedicament (medicament) {
    fetch(url + '/' + medicament.id, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const index = listeMedicaments.findIndex(m => m.id === medicament.id)
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
    id: null,
    denomination: '',
    formepharmaceutique: '',
    qte: 0,
    photo: null,
  })
  let medicamentEnCours = null

  function ajouterMedicament () {
    medicamentEnCours = null // variable qui perment de de faire la diff entre création et modif
    editForm.id = null
    editForm.denomination = ''
    editForm.formepharmaceutique = ''
    editForm.qte = 0
    editForm.photo = null
    dialogModif.value = true
  }

  function modifMedicament (medicament) {
    medicamentEnCours = medicament
    editForm.id = medicament.id
    editForm.denomination = medicament.denomination
    editForm.formepharmaceutique = medicament.formepharmaceutique
    editForm.qte = medicament.qte
    editForm.photo = medicament.photo
    dialogModif.value = true
  }

  function validerModif () {
    const payload = {
      denomination: editForm.denomination,
      formepharmaceutique: editForm.formepharmaceutique,
      qte: editForm.qte,
      photo: editForm.photo,
    }

    if (medicamentEnCours !== null) {
      // Modif
      payload.id = medicamentEnCours.id

      const old = {
        denomination: medicamentEnCours.denomination,
        formepharmaceutique: medicamentEnCours.formepharmaceutique,
        qte: medicamentEnCours.qte,
        photo: medicamentEnCours.photo,
      }

      medicamentEnCours.denomination = editForm.denomination
      medicamentEnCours.formepharmaceutique = editForm.formepharmaceutique
      medicamentEnCours.qte = Number(editForm.qte)
      medicamentEnCours.photo = editForm.photo

      fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),

      }).catch(error => {
        medicamentEnCours.denomination = old.denomination
        medicamentEnCours.formepharmaceutique = old.formepharmaceutique
        medicamentEnCours.qte = old.qte
        medicamentEnCours.photo = old.photo
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
      :key="medicament.id"
      cols="12"
      lg="3"
      md="4"
      sm="6"
      xl="2"
    >
      <v-card class="ma-2" color="primary" elevation="4">
        <v-img
          v-if="medicament.photo"
          cover
          height="200px"
          :src="'https://apipharmacie.pecatte.fr/images/' + medicament.photo"
        />
        <v-img
          v-else
          cover
          height="200px"
          src="https://via.placeholder.com/300x200?text=Pas+de+photo"
        />
        <v-card-title>
          {{ medicament.denomination }}
        </v-card-title>
        <v-card-subtitle>
          {{ medicament.formepharmaceutique }}
        </v-card-subtitle>
        <v-card-text>
          Quantité en stock : {{ medicament.qte }}
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
        <v-text-field v-model="editForm.denomination" label="Dénomination" />
        <v-text-field v-model="editForm.formepharmaceutique" label="Forme" />
        <v-text-field v-model.number="editForm.qte" label="Quantité" />
        <v-text-field v-model="editForm.photo" label="Nom de la photo" />
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
