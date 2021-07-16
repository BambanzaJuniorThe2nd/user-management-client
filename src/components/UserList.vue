<template>
  <v-row align="center" class="py-4 px-3 mx-auto">
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

        <v-card-actions v-if="users.length">
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
import { Auth } from '../services';
import { DEFAULT_SIGNED_OUT_PAGE } from '../router/defaults';
export default {
  name: "users-list",
  data() {
    return {
      title: "",
      headers: [
        { text: "Name", align: "start", sortable: true, value: "name" },
        { text: "Email", value: "email", sortable: true },
        { text: "Title", value: "title", sortable: true },
        { text: "Birthdate", value: "birthdate", sortable: true },
        { text: "Role", value: "isAdmin", sortable: true },
        { text: "Created At", value: "createdAt", sortable: true },
        { text: "Updated At", value: "updatedAt", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState(['users']),
    ...mapGetters(["usersDataFormatted"]),
  },
  methods: {
    ...mapActions(["getAllUsers", "refreshData", "getCurrentUser"]),
    async refreshList() {
      await this.getAllUsers();
    },

    removeAllUsers() {
      console.log("removeAllUsers clicked with ");
    },

    editUser(id) {
      this.$router.push({ name: "edit", params: { id } });
    },

    deleteUser(id) {
      this.$router.push({ name: "delete", params: { id } });
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
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
