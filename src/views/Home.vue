<template>
  <div class="home">
    <h3 class="subheading grey--text font-weight-light">Home</h3>
    <v-row>
      <v-col cols="12">
        <v-card shaped height="470">
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12" lg="4" sm="6" md="4">
                  <v-alert
                    border="left"
                    colored-border
                    color="success accent-4"
                    elevation="2"
                  >
                    <v-row>
                      <v-col><v-icon>mdi-account-multiple</v-icon></v-col>
                      <v-col>
                        <h6 class="text-center font-weight-light">Patients</h6>
                        <h5 class="text-center text-white" id="patients">
                          {{ patients }}
                        </h5>
                      </v-col>
                    </v-row>
                  </v-alert>
                </v-col>
                <v-col cols="12" lg="4" sm="6" md="4">
                  <v-alert
                    border="left"
                    colored-border
                    color="success accent-4"
                    elevation="2"
                  >
                    <v-row>
                      <v-col><v-icon>mdi-account-multiple</v-icon></v-col>
                      <v-col>
                        <h6 class="text-center font-weight-light">Providers</h6>
                        <h5 class="text-center text-white" id="patients">
                          {{ providers }}
                        </h5>
                      </v-col>
                    </v-row>
                  </v-alert>
                </v-col>
                <v-col cols="12" lg="4" sm="6" md="4">
                  <v-alert
                    border="left"
                    colored-border
                    color="success accent-4"
                    elevation="2"
                  >
                    <v-row>
                      <v-col><v-icon>mdi-heart-plus</v-icon></v-col>
                      <v-col>
                        <h6 class="text-center font-weight-light">
                          Health Records
                        </h6>
                        <h5 class="text-center text-white" id="patients">
                          {{ vital_signs }}
                        </h5>
                      </v-col>
                    </v-row>
                  </v-alert>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-sparkline
                    :value="value"
                    :gradient="gradient"
                    :smooth="radius || false"
                    :padding="padding"
                    :line-width="width"
                    :stroke-linecap="lineCap"
                    :gradient-direction="gradientDirection"
                    :fill="fill"
                    :type="type"
                    :auto-line-width="autoLineWidth"
                    auto-draw
                  ></v-sparkline>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
export default {
  name: "Home",
  data() {
    return {
      patients: 0,
      vital_signs: 0,
      providers: 0,
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    };
  },
  methods: {
    loadStati() {
      let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/statistics`;
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
          this.$swal("Error", error + ", Couldn't reach API", "error");
        });
    },
  },
  mounted() {
    this.loadStati();
  },
};
</script>
