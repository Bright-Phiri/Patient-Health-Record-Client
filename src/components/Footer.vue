<template>
  <div>
    <v-footer color="#F5F5F5" fixed>
      <v-row justify="center">
        <v-col class="#F5F5F5 text-center grey--text p-5" cols="12">
          Copyright &copy;{{ new Date().getFullYear() }} — Aliscience
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>
