<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="app-header">
      <div class="container">
        <div class="row items-center justify-end">
          <div class="col-shrink order-first">
            <q-btn
              flat
              dense
              icon="sym_r_menu"
              :aria-label="'left drawer'"
              @click="leftDrawerOpen = true"
            >
            </q-btn>
          </div>
          <div
            class="col order-first no-wrap text-center text-subtitle1"
            :class="{ 'col-shrink': $q.screen.gt.sm }"
          >
            <router-link
              class="link text-inherit q-px-md"
              :to="{ name: 'home' }"
              >{{ appSettings.site.name }}</router-link
            >
          </div>
          <q-separator vertical class="col col-shrink order-first gt-sm" />
          <div class="col col-shrink no-wrap q-px-xs gt-sm">
            <q-tabs dense>
              <q-route-tab
                v-for="tab in routesTabs"
                class="radius-md"
                no-caps
                :to="{ name: tab.text }"
                :label="tab.text"
                :key="tab.text"
              >
              </q-route-tab>
            </q-tabs>
          </div>
          <div class="col-12 order-last col-md order-md-none">
            <div class="q-px-sm wd-full wd-md-320-max"></div>
          </div>
          <div class="col-shrink">
            <q-toggle
              size="md"
              v-model="darkMode"
              @update:model-value="onToggleDarkMode"
              checked-icon="sym_r_light_mode"
              unchecked-icon="sym_r_dark_mode"
            />
          </div>
          <div class="col-shrink">
            <q-btn
              flat
              dense
              icon="sym_r_person"
              :aria-label="'right drawer'"
              @click="rightDrawerOpen = true"
            >
            </q-btn>
          </div>
        </div>
      </div>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      behavior="mobile"
      elevated
      :width="getDrawerWidth()"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="q-py-sm">
          <q-btn
            dense
            size="md"
            icon="sym_r_close"
            @click="leftDrawerOpen = false"
          />
          <q-toolbar-title class="text-h6">User Name</q-toolbar-title>
        </q-toolbar>
        <app-left-drawer />
      </q-scroll-area>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      behavior="mobile"
      elevated
      :width="getDrawerWidth()"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="q-py-sm">
          <q-btn
            dense
            size="md"
            icon="sym_r_close"
            @click="rightDrawerOpen = false"
          />
          <q-toolbar-title class="text-h6">User Name</q-toolbar-title>
        </q-toolbar>
        <app-right-drawer />
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { Dark, LocalStorage, Screen } from 'quasar';
import appSettings from 'src/modules/app-settings';
import appLeftDrawer from 'src/components/app/app-left-drawer.component.vue';
import appRightDrawer from 'src/components/app/app-right-drawer.component.vue';

export default defineComponent({
  name: 'app-layout',

  components: {
    appLeftDrawer,
    appRightDrawer,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const route = useRoute();
    const state = ref({
      searchTerm: route.params?.searchTerm ?? '',
    });

    onBeforeRouteUpdate((to) => {
      const { searchTerm } = to.params;
      state.value.searchTerm = String(searchTerm || '');
    });

    const localDarkModeKey = 'dark-mode';
    const darkMode = ref(false);
    const getLocalDarkMode = (): boolean => {
      return LocalStorage.getItem(localDarkModeKey) || false;
    };

    const setLocalDarkMode = (darkMode: boolean) => {
      LocalStorage.set(localDarkModeKey, darkMode);
    };

    const onToggleDarkMode = () => {
      Dark.set(darkMode.value);
      setLocalDarkMode(Dark.isActive);
    };

    Dark.set(getLocalDarkMode());
    darkMode.value = Dark.isActive;

    const getDrawerWidth = () => {
      if (Screen.gt.xs) {
        return Math.max(320, Screen.width * 0.4);
      }
      return Screen.width;
    };

    const routesTabs = [{ text: 'Projects' }, { text: 'Services' }];

    return {
      routesTabs,
      appSettings,
      state,
      leftDrawerOpen,
      rightDrawerOpen,
      darkMode,
      onToggleDarkMode,
      getDrawerWidth,
    };
  },
});
</script>
