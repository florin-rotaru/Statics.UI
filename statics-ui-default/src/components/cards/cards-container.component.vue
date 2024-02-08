<template>
  <div :class="'cards-' + viewType">
    <div class="card-container">
      <div class="card" v-for="card in cards" :key="card">
        <q-img class="card-image" :src="card.img"> </q-img>
        <div class="card-title" v-html="card.title"></div>
        <div class="card-body" v-html="card.body"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ICard from './types/ICard.ts';

export default defineComponent({
  name: 'cards-container',
  props: {
    viewType: {
      type: String,
      default: 'grid',
      validator(value: string) {
        return ['grid', 'list'].includes(value);
      },
    },
    cards: {
      type: Array as PropType<Array<ICard>>,
    },
  },
  setup() {
    return;
  },
});
</script>
