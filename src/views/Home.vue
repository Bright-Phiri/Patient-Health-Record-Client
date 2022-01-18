<template>
  <div class="home">
      <h3 class="subheading grey--text font-weight-light">Home</h3>
      <v-row>
        <v-col cols="12">
          <v-card shaped>
            <v-card-text>
               <v-container fluid>
                 <v-row>
                   <v-col xl="4" lg="4" md="6" sm="6" xs="12">
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
                            {{patients}}
                           </h5>
                       </v-col>
                     </v-row>
                   </v-alert>
                   </v-col>
                    <v-col xl="4" lg="4" md="6" sm="6" xs="12">
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
                             {{providers}}
                           </h5>
                       </v-col>
                     </v-row>
                   </v-alert>
                   </v-col>
                    <v-col xl="4" lg="4" md="6" sm="6" xs="12">
                     <v-alert
                       border="left"
                       colored-border
                       color="success accent-4"
                       elevation="2"
                     >
                     <v-row>
                       <v-col><v-icon>mdi-heart-plus</v-icon></v-col>
                       <v-col>
                         <h6 class="text-center font-weight-light">Health Records</h6>
                           <h5 class="text-center text-white" id="patients">
                            {{vital_signs}}
                           </h5>
                       </v-col>
                     </v-row>
                   </v-alert>
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
import axios from 'axios'
  export default {
    name: 'Home',
    data () {
      return{
       patients: 0,
       vital_signs: 0,
       providers: 0,
      }
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
  }
</script>
