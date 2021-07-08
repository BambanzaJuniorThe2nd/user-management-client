<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">User Management System</div>

      <v-btn to="/" text> Users </v-btn>

      <v-btn to="/users/add" text> Add </v-btn>
      <v-btn text @click="logout"> Logout </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
      <div class="text-center">
        <v-snackbar
          v-model="showSnackbar"
          :top="true"
          :timeout="timeout"
          :color="snackbarBgColor"
        >
          {{ snackbarText }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="showSnackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "App",
  data: () => ({
    showSnackbar: false,
    snackbarText: "",
    snackbarBgColor: "green",
    timeout: 4000,
  }),
  computed: {
    ...mapState(["message"]),
  },
  methods: {
    ...mapActions(["logUserOut"]),
    async logout() {
      await this.logUserOut();
    }
  },
  watch: {
    message() {
      switch (this.message.type) {
        case "":
          break;
        case "error":
          this.snackbarBgColor = "red";
          break;
        default:
          this.snackbarBgColor = "green";
      }
      this.showSnackbar = true;
      this.snackbarText = this.message.message;
    },
  },
});
</script>
