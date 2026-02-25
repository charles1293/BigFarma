<script setup>
import { onMounted, reactive } from 'vue';
import Film from '@/Film.js';
const apiKey = 'af1e1c8f8ad6efb5b326eabaffa38b8a';
const url =
  'https://api.themoviedb.org/3/search/movie?api_key=' +
  apiKey +
  '&language=fr-FR&page=1&query=';
const listeFilms = reactive([]);

function getFilms() {
  const fetchOptions = { method: 'GET' };
  fetch(url + 'Jardin', fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      //console.log(dataJSON.results);
      dataJSON.results.forEach((result) => {
        const film = new Film(result);
        listeFilms.push(film);
      });
      console.log(listeFilms);
    })
    .catch((error) => {
      console.log(error);
    });
}
onMounted(() => {
  getFilms();
});
</script>
<template>
  <h3>Liste des films</h3>
  <v-row dense>
    <v-col
      v-for="film in listeFilms"
      :key="film.id"
      cols="12"
      sm="6"
      md="3"
      lg="2"
      xl="2"
    >
      <v-card color="primary">
        <v-img
          :src="'https://image.tmdb.org/t/p/w500/' + film.affiche"
          height="200px"
          cover
        ></v-img>
        <v-card-title>
          {{ film.titre }}
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>
