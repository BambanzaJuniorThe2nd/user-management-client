<template>
  <delete-user />
</template>
<script lang="ts">
import Vue from "vue";
import DeleteUser from "../components/DeleteUser.vue";

export default Vue.extend({
  name: "Delete",

  components: {
    DeleteUser,
  },
});
</script>
