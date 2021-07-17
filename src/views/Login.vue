<template>
    <div class="submit-form mx-auto mt-15" style="max-width: 300px">
    <p class="headline text-center">Login</p>

    <div class="mx-auto" style="max-width: 300px">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="creds.email"
          :rules="validationRules.email"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
            v-model="creds.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="validationRules.password"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="login">Login</v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { validationRules } from "./util"

export default {
  name: "login",
  data() {
    return {
      creds: {
          email: "",
          password: "",
      },
      validationRules,
      showPassword: false,
    };
  },
  computed: {
    isValid() {
      return this.$refs.form.validate();
    },
  },
  methods: {
    ...mapActions(["logUserIn"]),
    isValidForm() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    async login() {
        if (this.isValidForm()) {
            await this.logUserIn({ email: this.creds.email, password: this.creds.password });
        }
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
