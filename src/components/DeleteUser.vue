<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Delete User</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="user.name"
          label="Name"
          readonly
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          label="E-mail"
          readonly
        ></v-text-field>

        <v-text-field
          v-model="user.title"
          label="Title"
          readonly
        ></v-text-field>

        <v-text-field
          v-model="user.birthdate"
          label="Birthdate"
          readonly
        ></v-text-field>
      </v-form>

      <v-btn color="error" class="mr-4" @click="proceed">Proceed</v-btn>
      <Dialog :title="dialogTitle" :text="dialogText" :show="showDialog" @onCancel="hideDialog" @onConfirm="deleteUser" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { Auth } from '../services';
import { DEFAULT_SIGNED_OUT_PAGE } from '../router/defaults';
import Dialog from "../ui-components/Dialog.vue"

export default {
  name: "delete-user",
  components: {
      Dialog
  },
  data() {
    return {
      user: {
        id: null,
        name: "",
        email: "",
        title: "",
        birthdate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
      submitted: false,
      valid: true,
      modal: false,
      showDialog: false,
      dialogTitle: "Confirm user deletion",
      dialogText: "Are you sure you want to delete this user?",
    };
  },
  computed: {
    ...mapState(['users', 'otherUser']),
    ...mapGetters(['userDataFormatted']),
  },
  methods: {
    ...mapActions(["getOtherUser", "deleteOtherUser", "getCurrentUser"]),
    isValidForm() {
      return this.$refs.form.validate();
    },
    reset() {
        this.user = { ...this.userDataFormatted }
    },
    hideDialog() {
        this.showDialog = false;
    },
    proceed() {
        this.showDialog = true;
    },
    async deleteUser() {
        this.hideDialog();
        await this.deleteOtherUser(this.$route.params.id);
    }
  },
  async mounted() {
    if (Auth.isAuthenticated()) {
      if (!this.user)
        await this.getCurrentUser();
      await this.refreshData();
      await this.getOtherUser(this.$route.params.id);
    }
    else {
      this.$router.push({ name: DEFAULT_SIGNED_OUT_PAGE });
    }
  },
  watch: {
    otherUser() {
        this.reset();
    },
    users() {
        this.$router.push({ name: "home" });
    }
  }
};
</script>

<style>
</style>