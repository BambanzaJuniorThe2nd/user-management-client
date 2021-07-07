<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Name"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle"> Search </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Users</v-card-title>

        <v-data-table
          :headers="headers"
          :items="usersDataFormatted"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editUser(item._id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteUser(item._id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="users.length > 0">
          <v-btn small color="error" @click="removeAllUsers">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "users-list",
  data() {
    return {
      title: "",
      headers: [
        { text: "ID", align: "start", sortable: true, value: "_id" },
        { text: "Name", align: "start", sortable: true, value: "name" },
        { text: "Email", value: "email", sortable: true },
        { text: "Title", value: "title", sortable: true },
        { text: "Birthdate", value: "birthdate", sortable: true },
        { text: "Created At", value: "createdAt", sortable: true },
        { text: "Updated At", value: "updatedAt", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState(["users"]),
    ...mapGetters(["usersDataFormatted"]),
  },
  methods: {
    ...mapActions(["getAllUsers", "refreshData"]),
    retrieveUsers() {
      //   TutorialDataService.getAll()
      //     .then((response) => {
      //       this.tutorials = response.data.map(this.getDisplayTutorial);
      //       console.log(response.data);
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
    },

    async refreshList() {
      await this.getAllUsers();
    },

    removeAllUsers() {
      console.log("removeAllUsers clicked with ");
      //   TutorialDataService.deleteAll()
      //     .then((response) => {
      //       console.log(response.data);
      //       this.refreshList();
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
    },

    searchTitle() {
      //   TutorialDataService.findByTitle(this.title)
      //     .then((response) => {
      //       this.tutorials = response.data.map(this.getDisplayTutorial);
      //       console.log(response.data);
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
    },

    editUser(id) {
      console.log("editUser clicked with ", id);
      //   this.$router.push({ name: "tutorial-details", params: { id: id } });
    },

    deleteUser(id) {
      console.log("deleteUser clicked with ", id);
      this.$router.push({ name: "tutorial-details", params: { id: id } });
    },
  },
  async mounted() {
    await this.refreshData();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
