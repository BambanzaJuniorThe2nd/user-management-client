<template>
  <div class="submit-form mt-10 mx-auto" style="max-width: 400px">
    <p class="headline text-center">Add User</p>

    <div class="mx-auto" style="max-width: 400px">
      <v-form ref="form" class="mb-4" lazy-validation style="body: 1px solid #000">
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

        <v-col cols="12" sm="12" required>
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
                :rules="birthdateRules"
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
        <v-select
          :items="userRoles"
          v-model="user.role"
          label="Role"
          :rules="roleRules"
        >
        </v-select>
      </v-form>

      <div class="d-flex justify-space-between mb-5">
        <v-btn color="primary" class="mr-4" @click="addUser">Add</v-btn>
        <v-btn @click="reset">Clear</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Auth } from '../services';
import { DEFAULT_SIGNED_OUT_PAGE } from '../router/defaults';

export default {
  name: "add-user",
  data() {
    return {
      user: {
        name: "",
        email: "",
        title: "",
        birthdate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        role: "Regular",
      },
      userRoles: ["Admin", "Regular"],
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
      birthdateRules: [(v) => !!v || "Birthdate is required"],
      roleRules: [(v) => !!v || "Role is required"],
    };
  },
  computed: {
    ...mapState(['users']),
    isValid() {
      return this.$refs.form.validate();
    },
  },
  methods: {
    ...mapActions(["setMessage", "createUser", "getCurrentUser"]),
    isValidForm() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
      this.user.role = "Regular";
    },
    async addUser() {
      if (this.isValidForm()) {
        await this.createUser({
          name: this.user.name,
          email: this.user.email,
          title: this.user.title,
          birthdate: this.user.birthdate,
          isAdmin: this.user.role === "Admin"
        });

        this.submitted = true;
      }
    },
  },
  async mounted() {
    if (Auth.isAuthenticated()) {
      if (!this.user)
        await this.getCurrentUser();
    }
    else {
      this.$router.push({ name: DEFAULT_SIGNED_OUT_PAGE });
    }
  },
  watch: {
    users() {
      // Reset form
      this.reset();
      this.submitted = false;
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
