<template>
  <NavBar></NavBar>
  <AppView>
    <div class="col-3">
      <Profile></Profile>
    </div>
    <div class="col-9">
      <div class="card card-home mt-4">
        <div class="card-body">
          <div class="row">
            <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
              <div class="card mb-3" style="border-radius: 0">
                <div
                  class="card-header bg-secondary text-white"
                  style="border-radius: 0"
                >
                  <div class="row">
                    <div class="col-2">
                      <i class="fa fa-users fa-3x"></i>
                    </div>
                    <div class="col justify-content-center">
                      <h6 class="text-center">All Patients</h6>
                      <h5 class="text-center text-white" id="patients">
                        {{ patients }}
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="card footer p-1" style="border-radius: 0">
                  <router-link to="/addpatient">Create patient</router-link>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
              <div class="card mb-2" style="border-radius: 0">
                <div
                  class="card-header bg-secondary text-white"
                  style="border-radius: 0"
                >
                  <div class="row">
                    <div class="col-2">
                      <i class="fa fa-users fa-3x"></i>
                    </div>
                    <div class="col">
                      <h6 class="text-center">Patient's health records</h6>
                      <h5 class="text-center text-white" id="vital_signs">
                        {{ vital_signs }}
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="card footer p-1" style="border-radius: 0">
                  <router-link to="/viewpatients">View patients</router-link>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
              <div class="card mb-2" style="border-radius: 0">
                <div
                  class="card-header bg-secondary text-white"
                  style="border-radius: 0"
                >
                  <div class="row">
                    <div class="col-2">
                      <i class="fa fa-users fa-3x"></i>
                    </div>
                    <div class="col">
                      <h6 class="text-center">All Providers</h6>
                      <h5 class="text-center text-white" id="providers">
                        {{ providers }}
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="card footer p-1" style="border-radius: 0">
                  <router-link to="/viewpatients"
                    >View users / providers</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppView>
</template>

<style>
.card-footer {
  background-color: #e4ebe4;
}
.card-home {
  background-color: #fff;
  border-radius: 10px;
}
</style>
<script>
import axios from "axios";
// @ is an alias to /src
import Profile from "@/components/Profile.vue";
import NavBar from "@/components/NavBar.vue";
import AppView from "@/components/AppView.vue";
export default {
  name: "Home",
  components: {
    Profile,
    NavBar,
    AppView,
  },
  data() {
    return {
      patients: 0,
      vital_signs: 0,
      providers: 0,
      BASE_URL: "statistics",
    };
  },
  methods: {
    loadStati() {
      let pHRsAPIEndpoint = `${sessionStorage.getItem("API_URL")}/${
        this.BASE_URL
      }`;
      axios
        .get(pHRsAPIEndpoint, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
          },
        })
        .then((response) => {
          this.patients = response.data.patients;
          this.vital_signs = response.data.vital_signs;
          this.providers = response.data.users;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.loadStati();
  },
};
</script>
