<template>
  <NavBar></NavBar>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-3">
        <Profile></Profile>
      </div>
      <div class="col-9">
        <div class="card card-providers mt-4">
          <div class="mt-4">
            <h4>Providers list</h4>
            <hr />
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered table-hover">
                <thead class="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="provider in providers" :key="provider.id">
                    <td>{{ provider.id }}</td>
                    <td>{{ provider.username }}</td>
                    <td>{{ provider.email }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-footer {
  background-color: #e4ebe4;
}
.card-providers {
  background-color: #fff;
  border-radius: 10px;
}
hr {
  margin-left: 10px;
  margin-right: 20px;
  color: #14a800;
  padding: 1px;
}

h4 {
  color: #14a800;
  margin-left: 10px;
}
</style>
<script>
import axios from "axios"
// @ is an alias to /src
import Profile from "@/components/Profile.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "ViewProviders",
  components: {
    Profile,
    NavBar
  },
  data() {
    return {
      providers: [],
      BASE_URL: 'users'
    }
  },
  methods: {
    fetchProviders() {
      let pHRsAPIEndpoint = `${sessionStorage.getItem("API_URL")}/${this.BASE_URL}`;
      axios
        .get(pHRsAPIEndpoint)
        .then(response => {
          this.providers = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.fetchProviders();
  }
};
</script>
