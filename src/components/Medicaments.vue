<script setup>
  import { ref } from 'vue'
  import AffichListMedicaments from './AffichListMedicaments.vue'
  import FormText from './FormText.vue'

  const motcle = ref('')
</script>

<template>
  <FormText @event-submit="texte => motcle = texte" />
  <AffichListMedicaments :critere="motcle" />
</template>
