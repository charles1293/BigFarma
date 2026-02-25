<script setup>
import { ref } from 'vue';
const libelle = ref(''); // c’est une variable réactive
const emit = defineEmits(['eventAdd']); // définir l'événement eventAdd
</script>
<template>
  <v-container>
    <v-form
      @submit.prevent="
        $emit('eventSubmit', texte);
        texte = '';
      "
    >
      <v-text-field
        v-model="texte"
        label="Critère de recherche"
        variant="outlined"
        dense
      ></v-text-field>
      <v-btn type="submit" color="primary">Rechercher</v-btn>
    </v-form>
  </v-container>
</template>
