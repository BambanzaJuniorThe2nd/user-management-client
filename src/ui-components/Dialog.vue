<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ title }}
        </v-card-title>

        <v-card-text>
          <br>
          {{ text }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="$emit('onCancel')"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            text
            @click="$emit('onConfirm')"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    props: ["title", "text", "show"],
  }
</script>