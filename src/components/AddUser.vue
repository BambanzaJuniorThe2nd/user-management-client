<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add User</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="user.name"
          :rules="[(v) => !!v || 'Name is required']"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          :rules="[(v) => !!v || 'Email is required']"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.title"
          :rules="[(v) => !!v || 'Title is required']"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.birthdate"
          :rules="[(v) => !!v || 'Birthdate is required']"
          label="Birthdate"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveTutorial">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new User.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newUser">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        name: "",
        email: "",
        title: "",
        birthdate: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
    //   var data = {
    //     title: this.tutorial.title,
    //     description: this.tutorial.description,
    //   };

    //   TutorialDataService.create(data)
    //     .then((response) => {
    //       this.tutorial.id = response.data.id;
    //       console.log(response.data);
    //       this.submitted = true;
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    },

    newTutorial() {
    //   this.submitted = false;
    //   this.tutorial = {};
    },
  },

};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
