<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        User Management System
      </div>

      <v-btn to="/tutorials" text>
        Users
      </v-btn>

      <v-btn to="/add" text>
        Add
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>
