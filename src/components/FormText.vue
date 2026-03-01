<script setup>
  import { ref } from 'vue'
  const texte = ref('') // c’est une variable réactive
  defineEmits(['event-submit']) // définir l'événement event-submit
</script>
<template>
  <v-container>
    <v-form
      @submit.prevent="
        $emit('event-submit', texte);
        texte = '';
      "
    >
      <v-text-field
        v-model="texte"
        dense
        label="Rechercher un médicament"
        variant="outlined"
      />
      <v-btn color="primary" type="submit">Rechercher</v-btn>
    </v-form>
  </v-container>
</template>
