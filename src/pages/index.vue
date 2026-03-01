<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-h3 text-center mb-4">Bienvenue sur BigFarma</h1>
        <p class="text-h6 text-center text-medium-emphasis">
          Votre application de gestion de pharmacie
        </p>
        <v-divider class="my-6"></v-divider>
        <v-row justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-card color="primary" class="text-center pa-4" to="/pageMedicaments">
              <v-icon size="48">mdi-pill</v-icon>
              <v-card-title>Médicaments</v-card-title>
              <v-card-text>Consulter le catalogue</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
</script>