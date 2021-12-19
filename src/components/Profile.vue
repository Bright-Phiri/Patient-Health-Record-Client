<template>
  <div class="card text-center mt-4 shadow-sm">
    <div class="card-body p-0">
      <div class="profile p-5"></div>
      <div class="d-flex justify-content-end">
        <a href style="margin-top:-80px; margin-right:4px">
          <i class="fa fa-pencil fa-1x"></i>
        </a>
      </div>
      <img
        v-bind:src="avatar"
        alt
        height="100"
        width="100"
        class="rounded-circle border text-center avatar border-5"
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

.profile {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-image: linear-gradient( to bottom right, #14a800, transparent);
}

.avatar{
  margin-top: -50px;
}
.fa-pencil {
  color: #2B5468;
}
.card {
  background-color: #fff;
  border-radius: 10px;
}
</style>
