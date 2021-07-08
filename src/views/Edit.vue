<template>
  <edit-user />
</template>

<script lang="ts">
import Vue from "vue";
import EditUser from "../components/EditUser.vue";

export default Vue.extend({
  name: "Edit",

  components: {
    EditUser,
  },
});
</script>
