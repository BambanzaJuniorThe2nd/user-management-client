<template>
  <div class="submit-form mt-4 mx-auto" style="max-width: 400px">
    <p class="headline text-center">Edit User</p>

    <div class="mx-auto" style="max-width: 400px">
      <v-form ref="form" class="mb-6" lazy-validation>
        <v-text-field
          v-model="details.name"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="details.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="details.title"
          :rules="titleRules"
          label="Title"
          required
        ></v-text-field>

        <v-col cols="12" sm="12" required>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="details.birthdate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="details.birthdate"
                label="Pick a birthdate"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="birthdateRules"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="details.birthdate"
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
                @click="$refs.dialog.save(details.birthdate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-select
          :items="userRoles"
          v-model="details.role"
          label="Role"
        >
        </v-select>
      </v-form>

      <div class="d-flex justify-space-between mb-5">
        <v-btn color="primary" @click="updateUser">Save</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn v-show="(user && otherUser) && user._id === otherUser._id" color="yellow" @click="changePassword">Change Password</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { Auth } from '../services';
import { DEFAULT_SIGNED_OUT_PAGE, DEFAULT_SIGNED_IN_PAGE } from '../router/defaults';
export default {
  name: "edit-user",
  data() {
    return {
      details: {
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
    };
  },
  computed: {
    ...mapState(['user', 'otherUser', 'users', ]),
    ...mapGetters(['userDataFormatted']),
    isValid() {
      return this.$refs.form.validate();
    },
  },
  methods: {
    ...mapActions(["getOtherUser", "updateOtherUser", "getCurrentUser", "refreshData"]),
    isValidForm() {
      return this.$refs.form.validate();
    },
    reset() {
        this.details = { ...this.userDataFormatted, role: this.userDataFormatted.isAdmin }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
      
    },
    async updateUser() {
      if (this.isValidForm()) {
        await this.updateOtherUser({
            _id: this.$route.params.id,
            name: this.details.name,
            email: this.details.email,
            title: this.details.title,
            birthdate: this.details.birthdate,
            isAdmin: this.details.role === "Admin"
        });

        this.submitted = true;
      }
    },
    async changePassword() {
      this.$router.push({ name: "change" });
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
        if (this.submitted) {
          this.$router.push({ name: DEFAULT_SIGNED_IN_PAGE });
          this.submitted = false;
        } 
    }
  }
};
</script>
