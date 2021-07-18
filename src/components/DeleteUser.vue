<template>
  <div class="submit-form mt-3 mx-auto" style="max-width: 400px">
    <p class="headline text-center">Delete User</p>

    <div class="mx-auto" style="max-width: 400px">
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="user.name" label="Name" readonly></v-text-field>

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

        <v-text-field
          v-model="user.isAdmin"
          label="Role"
          readonly
        ></v-text-field>
      </v-form>

      <v-btn color="error" class="mr-4" @click="proceed">Proceed</v-btn>
      <Dialog
        :title="dialogTitle"
        :text="dialogText"
        :show="showDialog"
        @onCancel="hideDialog"
        @onConfirm="deleteUser"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Dialog from "../ui-components/Dialog.vue";

export default {
  name: "delete-user",
  components: {
    Dialog,
  },
  data() {
    return {
      user: {
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
      dialogTitle: "Confirm deletion",
      dialogText: "Are you sure you want to delete this user?",
    };
  },
  computed: {
    ...mapState(["users", "otherUser"]),
    ...mapGetters(["userDataFormatted"]),
  },
  methods: {
    ...mapActions(["getOtherUser", "deleteOtherUser"]),
    isValidForm() {
      return this.$refs.form.validate();
    },
    reset() {
      this.user = { ...this.userDataFormatted };
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
      this.submitted = true;
    },
  },
  async mounted() {
    await this.getOtherUser(this.$route.params.id);
  },
  watch: {
    otherUser() {
      this.reset();
    },
    users() {
      if (this.submitted) {
        this.$router.push({ name: "home" });
        this.submitted = false;
      }
    },
  },
};
</script>

<style></style>
