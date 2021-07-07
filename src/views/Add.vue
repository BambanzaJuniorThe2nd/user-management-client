<template>
  <add-user />
</template>

<script lang="ts">
import Vue from "vue";
import AddUser from "../components/AddUser.vue";

export default Vue.extend({
  name: "Add",

  components: {
    AddUser
  },
});
</script>
