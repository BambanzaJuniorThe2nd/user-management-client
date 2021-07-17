<template>
  <div class="submit-form mt-4 mx-auto" style="max-width: 400px">
    <p class="headline text-center">Change Password</p>

    <div class="mx-auto" style="max-width: 400px">
        <v-form ref="form" class="mb-6" lazy-validation>
            <v-text-field
            v-model="details.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="validationRules.password"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            :hint="hint"
            class="input-group--focused"
            @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
            v-model="details.confirmedPassword"
            :append-icon="showConfirmedPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="confirmedPasswordRules"
            :type="showConfirmedPassword ? 'text' : 'password'"
            name="input-10-2"
            label="Confirm Password"
            class="input-group--focused"
            @click:append="showConfirmedPassword = !showConfirmedPassword"
            ></v-text-field>
        </v-form>

        <div class="d-flex justify-space-between mb-5">
            <v-btn color="primary" @click="save">Save</v-btn>
            <v-btn @click="reset">Reset</v-btn>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { Auth } from '../services';
import { DEFAULT_SIGNED_OUT_PAGE, DEFAULT_SIGNED_IN_PAGE } from '../router/defaults';
import { validationRules } from "./util";

export default {
  name: "change-password",
  data() {
    return {
      details: {
        password: "",
        confirmedPassword: ""
      },
      submitted: false,
      valid: true,
      validationRules,
      confirmedPasswordRules: [
        (v) => !!v || "Confirmed password is required",
        (v) => (v && v.length >= 8) || "Min 8 characters",
        (v) => (v && v === this.details.password) || "Must be the same as password",
      ],
      showPassword: false,
      showConfirmedPassword: false,
      hint: "At least 8 characters, including digits, alphanumerics, and special characters"
    };
  },
  computed: {
    ...mapState(['user' ]),
    ...mapGetters(['currentUserDataFormatted']),
    isValid() {
      return this.$refs.form.validate();
    },
  },
  methods: {
    ...mapActions(["changePassword", "getCurrentUser", "refreshData"]),
    isValidForm() {
      return this.$refs.form.validate();
    },
    reset() {
        this.details = { password: "", confirmedPassword: "" }
        this.submitted = false;
    },
    resetValidation() {
      this.$refs.form.resetValidation();
      
    },
    async save() {
      if (this.isValidForm() && this.details.password === this.details.confirmedPassword) {
        this.submitted = true;
        await this.changePassword({
          _id: this.user._id,
          password: this.details.password
        });
      }
    },
  },
  async mounted() {
    if (Auth.isAuthenticated()) {
      if (!this.user)
        await this.getCurrentUser();
      await this.refreshData();
    }
    else {
      this.$router.push({ name: DEFAULT_SIGNED_OUT_PAGE });
    }
  },
  watch: {
    user() {
        if (this.submitted) {
          this.$router.push({ name: DEFAULT_SIGNED_IN_PAGE });
          this.reset();
        } 
    }
  }
};
</script>
