<script setup>
  import { computed, onMounted, reactive } from 'vue'
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

  onMounted(() => {
    getMedicaments()
  })
</script>

<template>
  <h3>Liste des médicaments</h3>
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
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
