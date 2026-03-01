<script setup>
  import AffichListMedicaments from './AffichListMedicaments.vue'
  import FormText from './FormText.vue'
</script>

<template>
  <FormText @event-submit="texte => $refs.liste?.rechercher(texte)" />
  <AffichListMedicaments />
</template>
