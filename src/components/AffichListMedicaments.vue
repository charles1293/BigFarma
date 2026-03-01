<script setup>
  import { onMounted, reactive } from 'vue'
  import Medicament from '@/Medicament.js'

  const url = 'https://apipharmacie.pecatte.fr/api/7/medicaments'
  const listeMedicaments = reactive([])

  function getMedicaments () {
    const fetchOptions = { method: 'GET' }
    fetch(url, fetchOptions)
      .then(response => {
        return response.json()
      })
      .then(dataJSON => {
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

  onMounted(() => {
    getMedicaments()
  })
</script>

<template>
  <h3>Liste des médicaments</h3>
  <v-row dense>
    <v-col
      v-for="medicament in listeMedicaments"
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
      </v-card>
    </v-col>
  </v-row>
</template>
