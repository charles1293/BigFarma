<template>
  <v-app>
    <!-- une barre de navigation -->
    <v-app-bar color="primary" density="compact">
      <!-- mettre l'icone dans le 'slot prepend' de 'v-app-bar' soit au début à gauche -->
      <template #prepend>
        <!-- un clic sur l'icone cache/affiche la zone de menu de gauche -->
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </template>
      <!-- le titre de la barre de navigation -->
      <v-app-bar-title>BigFarma - Pharmacie</v-app-bar-title>
      <!-- un simple bouton qui retourne à la page d'accueil route="/"-->
      <v-btn to="/">Home</v-btn>
      <!-- un bouton avec un menu -->
      <v-btn id="menu-recherche">Catalogue</v-btn>
      <!-- le menu s'affichera qd l'élément
d'id 'menu-recherche' ici 'v-btn' sera activé-->
      <v-menu activator="#menu-recherche">
        <v-list>
          <v-list-item to="/pageMedicaments">
            <!-- navigation vers la page "médicaments" -->
            <v-list-item-title>Médicaments</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- un vers la page "about" -->
      <v-btn to="/PageAbout">About</v-btn>
    </v-app-bar>
    <!-- zone de menu de gauche caché / visible en fonction du booléen 'drawer'-->
    <v-navigation-drawer v-model="drawer" app color="primary">
      <v-list-item>
        <v-list-item-title class="text-h6"> BigFarma</v-list-item-title>
        <v-list-item-subtitle> Menu</v-list-item-subtitle>
      </v-list-item>
      <v-divider />
    </v-navigation-drawer>
    <!-- la zone où sera affichée les différentes "pages"-->
    <v-main>
      <v-container class="page">
        <!-- les "composant view" s'afficheront ici -->
        <RouterView />
      </v-container>
    </v-main>
    <!-- le footer -->
    <v-footer color="primary">
      <div>{{ new Date().getFullYear() }} — <strong>BigFarma</strong></div>
    </v-footer>
  </v-app>
</template>
<script setup>
  import { ref } from 'vue'
  const drawer = ref(false) // booléen pour afficher/cacher la zone de gauche
</script>
<style scoped>
.page {
  min-height: 100vh;
  text-align: center;
}
</style>
