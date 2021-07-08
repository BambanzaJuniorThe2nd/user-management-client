<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add User</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="user.name"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.title"
          :rules="titleRules"
          label="Title"
          required
        ></v-text-field>

        <v-col cols="12" sm="12">
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="user.birthdate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="user.birthdate"
                label="Pick a birthdate"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="user.birthdate"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialog.save(user.birthdate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-form>

      <v-btn color="primary" class="mr-4" @click="addUser">Add</v-btn>
      <v-btn @click="reset">Clear</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { DEFAULT_SIGNED_OUT_PAGE } from '../router/defaults';

export default {
  name: "add-user",
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
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length >= 1) || "Name must be at least 1 character",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      titleRules: [
        (v) => !!v || "Title is required",
        (v) => (v && v.length >= 1) || "Title must be at least 1 character",
      ],
    };
  },
  computed: {
    isValid() {
      return this.$refs.form.validate();
    },
  },
  methods: {
    ...mapActions(["setMessage", "createUser"]),
    isValidForm() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async addUser() {
      if (this.isValidForm()) {
        await this.createUser({
          name: this.user.name,
          email: this.user.email,
          title: this.user.title,
          birthdate: new Date(this.user.birthdate)
        });
      }
    },
  },
  watch: {
    users() {
      // Reset form
      this.reset();
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
