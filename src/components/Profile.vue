<template>
  <div class="card text-center mt-4 shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-end">
        <a href>
          <i class="fa fa-pencil fa-1x"></i>
        </a>
      </div>
      <img
        v-bind:src="avatar"
        alt
        height="100"
        width="100"
        class="rounded-circle border text-center"
        id="avatar"
        style="margin-left:20px"
      />
      <h3 class="mt-3">{{ username }}</h3>
      <p>{{ email }}</p>
    </div>
    <div class="card-footer p-3"></div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      avatar: '',
      username: '',
      email: ''
    }
  },
  methods: {
    loadUserInfor() {
      this.avatar = sessionStorage.getItem("avatar")
      const user = JSON.parse(sessionStorage.getItem("user"))
      this.username = user.username
      this.email = user.email
    }
  },
  mounted() {
    this.loadUserInfor();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-footer {
  background-color: #e4ebe4;
}

.fa-pencil {
  color: #14a800;
}
.card {
  background-color: #fff;
  border-radius: 10px;
}
</style>
