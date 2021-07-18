<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex justify-space-between" style="width: 100%">
        <div class="d-flex align-center mr-2">User Management System</div>

        <div
          v-if="showNavbarFunctionality"
          class="d-flex justify-space-between"
          style="width: 15%"
        >
          <v-btn to="/" text> Users </v-btn>
          <v-btn to="/users/add" text> Add </v-btn>
        </div>

        <div v-if="showNavbarFunctionality">
          <v-btn text @click="logout"> Logout </v-btn>
        </div>
      </div>
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
import { Auth } from "./services";
import { DEFAULT_SIGNED_OUT_PAGE } from "./router/defaults";

export default Vue.extend({
  name: "App",
  data: () => ({
    showSnackbar: false,
    snackbarText: "",
    snackbarBgColor: "green",
    timeout: 4000,
    showNavbarFunctionality: false,
  }),
  computed: {
    ...mapState(["message", "user"]),
  },
  methods: {
    ...mapActions(["logUserOut", "getCurrentUser"]),
    async logout() {
      await this.logUserOut();
    },
  },
  async mounted() {
    if (Auth.isAuthenticated()) {
      if (!this.user) await this.getCurrentUser();
    } else if (this.$route.name !== DEFAULT_SIGNED_OUT_PAGE) {
      this.$router.push({ name: DEFAULT_SIGNED_OUT_PAGE });
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

      if (this.message.type.length) {
        this.showSnackbar = true;
        this.snackbarText = this.message.message;
      }
    },
    user() {
      if (this.user) this.showNavbarFunctionality = true;
      else this.showNavbarFunctionality = false;
    },
  },
});
</script>
