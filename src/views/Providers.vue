<template>
  <div class="providers">
    <h3 class="subheading grey--text font-weight-light">Providers</h3>
    <v-row>
       <v-col cols="12">
          <v-card shaped>
             <v-card-title class="d-flex">
                 <p>Providers list</p>
             </v-card-title>
             <v-card-text>
               <div class="col-lg-3 col-xl-3 col-xm-12 col-sm-5 col-md-3 pa-0"> <v-text-field dense label="Search" v-model="search"  append-icon="mdi-magnify"></v-text-field></div>
               <v-data-table dense class="elevation-1" :headers="headers" :items="providers" :search="search" :loading="loading" :items-per-page="5" loading-text="Loading providers...Please wait">

               </v-data-table>
             </v-card-text>
          </v-card>
       </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Providers',
  data () {
    return{
      search: '',
      loading: false,
      headers: [
        {
          text: '#',
          align: 'start',
          value: 'id',
        },
        {
          text: 'Username',
          value: 'username',
        },
        {
          text: 'Email Address',
          value: 'email',
        },

      ],
      providers: []
    }
  },
  methods: {
    loadProviders(){
      this.loading = true
      let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/users`;
      axios
        .get(pHRsAPIEndpoint)
        .then((response) => {
          this.providers = response.data
          this.loading = false
        })
        .catch((error) => {
          this.$swal("Error", error + ", Couldn't reach API", "error");
        });
    }
  },
  mounted() {
    this.loadProviders()
  }
}
</script>
