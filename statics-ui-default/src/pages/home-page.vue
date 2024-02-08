<template>
  <q-page class="row items-center justify-evenly">
    <div class="container">
      <cards-container view-type="list" :cards="cards" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ICard from 'src/components/cards/types/ICard';
import cardsContainer from 'src/components/cards/cards-container.component.vue';

export default defineComponent({
  name: 'home-page',

  components: {
    cardsContainer,
  },

  setup() {
    const cards = ref<ICard[]>([
      {
        img: 'https://cdn.quasar.dev/img/chicken-salad.jpg',
        title: 'Apple iPhone 15',
        body: 'Produs cu urme fine de utilizare, ambalaj in stare buna, zgarieturi fine ecran, zgarieturi fine spate, zgarieturi fine muchie, accesorii utilizate',
      },
    ]);

    return {
      cards,
    };
  },
});
</script>
