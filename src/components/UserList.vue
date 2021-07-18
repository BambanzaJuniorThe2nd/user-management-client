<template>
  <v-row align="center" class="pt-10 px-3 mx-auto">
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
            <v-icon small class="mr-5" @click="editUser(item._id)"
              >mdi-pencil</v-icon
            >
            <v-icon
              v-if="user && item._id !== user._id"
              small
              @click="deleteUser(item._id)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>
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
    ...mapState(["users", "user"]),
    ...mapGetters(["usersDataFormatted"]),
    isDataLoaded() {
      return this.user;
    },
  },
  methods: {
    ...mapActions(["refreshData"]),
    async refreshList() {
      await this.getAllUsers();
    },
    hideDeleteIcon(itemId) {
      if (!this.user) return false;
      return itemId !== this.user._id;
    },
    editUser(id) {
      this.$router.push({ name: "edit", params: { id } });
    },

    deleteUser(id) {
      this.$router.push({ name: "delete", params: { id } });
    },
  },
  async mounted() {
    await this.refreshData();
  },
  watch: {
    user() {
      if (this.user) {
        this.user;
        console.log("user was set...");
      }
    },
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
