<template>
  <div class="patients">
    <h3 class="subheading grey--text font-weight-light">Patients</h3>
    <v-row>
       <v-col cols="12">
        <v-dialog v-model="addPatientDialog" transition="fab-transition" max-width="600px">
           <v-card>
             <v-card-title>
               Patient Details
             </v-card-title>
             <v-card-text>
               <v-form ref="regForm" v-on:submit.prevent="addPatient">
                 <v-container>
                   <v-row>
                     <v-col cols="12" sm="6">
                        <v-text-field label="First Name" v-model.trim="patient.first_name" dense></v-text-field>
                     </v-col>
                     <v-col cols="12" sm="6">
                       <v-text-field label="Last Name" v-model.trim="patient.last_name" dense></v-text-field>
                     </v-col>
                     <v-col cols="12" sm="6">
                       <v-autocomplete label="Gender" :items="genders" v-model.trim="patient.gender" dense></v-autocomplete>
                     </v-col>
                     <v-col cols="12" sm="6">
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="patient.dob"
                              label="Date of Birth"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              dense
                             >
                            </v-text-field>
                          </template>
                         <v-date-picker
                            v-model="patient.dob"
                            @input="menu2 = false"
                           >
                          </v-date-picker>
                        </v-menu>
                     </v-col>
                     <v-col cols="12" sm="6">
                        <v-text-field label="District" v-model.trim="patient.district" dense></v-text-field>
                     </v-col>
                     <v-col cols="12" sm="6">
                        <v-text-field label="Village"  v-model.trim="patient.village" dense></v-text-field>
                     </v-col>
                     <v-col cols="12" sm="6">
                       <v-autocomplete label="Occupation" :items="occupations" v-model="patient.occupation" dense></v-autocomplete>
                     </v-col>
                   </v-row>
                 </v-container>
                 <v-btn v-on:click="addPatientDialog = !addPatientDialog" class="secondary">Cancel</v-btn> <v-btn type="submit" class="primary" :loading="addLoading1">Save</v-btn>
               </v-form>
             </v-card-text>
           </v-card>
        </v-dialog>

         <v-dialog max-width="800" v-model="addDialog" transition="fab-transition">
            <v-card>
              <v-card-title>Add Health Record</v-card-title>
              <v-card-text>
                <v-form ref="form" v-on:submit.prevent="addHealthRecord()">
                  <v-text-field label="Weight(Kgs)" v-model="vital_signs.weight"></v-text-field>
                  <v-text-field label="Height(Metres)" v-model="vital_signs.height"></v-text-field>
                  <v-text-field label="Temp Reading" v-model="vital_signs.temp_reading"></v-text-field>
                  <v-autocomplete label="Diagnosis"  :items="diagnosisList"  v-model="vital_signs.diagnosis"></v-autocomplete>
                  <v-btn class="secondary" v-on:click="cancel">Cancel</v-btn> <v-btn type="submit" class="primary" :loading="addLoading">Save</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
         </v-dialog>
         <v-dialog transition="fab-transition" max-width="700" v-model="dialog">
           <v-card>
             <v-card-title>
               Patient Health Record
             </v-card-title>
             <v-card-text>
                        <v-timeline dense>
              <v-timeline-item small v-for="vital in vitals" :key="vital.id">
                <v-card>
                  <v-card-title class="d-flex">
                    <p class="font-weight-light">Vital Signs</p>
                    <v-spacer></v-spacer>
                    <p class="font-weight-light">{{vital.created_at.substr(0, 7)}}</p>
                  </v-card-title>
                  <v-card-text>
                    <v-simple-table dense>
                      <thead class="thead-light">
                      <tr>
                        <th scope="col">Weight(Kgs)</th>
                        <th scope="col">Height(M)</th>
                        <th scope="col">
                          Temperature Reading
                          <span>&#8451;</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ vital.weight }}</td>
                        <td>{{ vital.height }}</td>
                        <td>{{ vital.temp_reading }}</td>
                      </tr>
                    </tbody>
                    <h4 class="font-weight-light">Diagnosis used: {{ vital.diagnosis.split("|").pop() }}</h4>
                    </v-simple-table>
                  </v-card-text>
                  <v-card-actions> 
                    <v-btn :href="'https://www.icd10data.com/ICD10CM/Codes/' +
                          vital.diagnosis.split('|').shift()" target="blank" small>View Diagnosis</v-btn>
                  </v-card-actions>
            </v-card>
              </v-timeline-item>
            </v-timeline>
             </v-card-text>
             <v-card-actions>
               <v-btn v-on:click="dialog = !dialog">Close</v-btn>
             </v-card-actions>
           </v-card>
         </v-dialog>
          <v-card shaped >
             <v-card-title class="d-flex">
                 <p class="font-weight-light">Patients list</p>
                 <v-spacer></v-spacer>
                 <v-btn small dark class="teal" v-on:click="exportToPdf"><v-icon left>mdi-file-export</v-icon> Export</v-btn> &nbsp;
                 <v-btn dark small class="primary" v-on:click="newPatient"> <v-icon left>mdi-account-plus</v-icon>New Patient</v-btn>
             </v-card-title>
             <v-divider class="mx-4"></v-divider>
             <v-card-text>
               <div class="col-lg-3 col-xl-3 col-xm-12 col-sm-5 col-md-3 pa-0"> <v-text-field dense label="Search" v-model="search"  append-icon="mdi-magnify"></v-text-field></div>
               <v-data-table dense class="elevation-1" :headers="headers" :items="patients" :items-per-page="7" :loading="loading" loading-text="Loading patients...Please wait" :search="search">
                  <template v-slot:[`item.healthrecord`]="{ item }">
                   <v-icon small class="mr-2" v-on:click="selectRecord(item.id)" color="primary">mdi-plus-thick</v-icon>
                   <v-icon small color="teal" class="mr-2" v-on:click="viewHealthRecord(item.id)">mdi-eye</v-icon>
                   <v-icon small color="red" v-on:click="deletePatient(item.id)">mdi-delete</v-icon>
                 </template>
               </v-data-table>
             </v-card-text>
          </v-card>
       </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  name: 'Patients',
  data () {
    return{
      search: '',
      heading: 'Patients',
      loading: false,
      addLoading: false,
      addLoading1: false,
      dialog: false,
      addDialog: false,
      addPatientDialog: false,
      headers: [
        {
          text: '#',
          align: 'start',
          value: 'id',
        },{
          text: 'First Name',
          value: 'first_name',
        },{
          text: 'Last Name',
          value: 'last_name',
        },
        {
          text: 'Gender',
          value: 'gender',
        },
        {
         text: 'Date of Birth',
          value: 'dob',
        },
        {
          text: 'District',
          value: 'district',
        },
        {
          text: 'Village',
          value: 'village',
        },
        {
          text: 'Occupation',
          value: 'occupation',
        },
        {
          text: 'Health Record',
          value: 'healthrecord',
        }
      ],
      genders: ['Male','Female'],
      occupations: ['Construction worker','Accountant','Driver','Mechanic','Radiologist','Business Owner','Welder','Construction worker','Coal miner','Student','Software Developer','Painter'],
      patients: [],
      patient:{
        first_name: null,
        last_name: null,
        gender: null,
        dob: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        village: null,
        district: null,
        occupation: null,
      },
      vitals: [],
      vital_signs: {
        patient_id: null,
        diagnosis: null,
        weight: null,
        height: null,
        temp_reading: null,
      },
      menu: false,
      modal: false,
      menu2: false,
      diagnosisList: [{
        text: 'Certain infectious and parasitic diseases',
        value: 'A00-B99|Certain infectious and parasitic diseases'
      },{
        text: 'Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism',
        value: 'D50-D89|Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism'
      },{
        text: 'Endocrine, nutritional and metabolic diseases',
        value: 'E00-E89|Endocrine, nutritional and metabolic diseases'
      },{
        text: 'Diseases of the nervous system',
        value: 'G00-G99|Diseases of the nervous system'
      },{
        text: 'Diseases of the eye and adnexas',
        value: 'H00-H59|Diseases of the eye and adnexa'
      },{
        text: 'Diseases of the ear and mastoid process',
        value: 'H60-H95|Diseases of the ear and mastoid process'
      },{
        text: 'Diseases of the circulatory system',
        value: 'I00-I99|Diseases of the circulatory system'
      },{
        text: 'Diseases of the respiratory system',
        value: 'J00-J99|Diseases of the respiratory system'
      },{
        text: 'Diseases of the digestive system',
        value: 'K00-K95|Diseases of the digestive system'
      },{
        text: 'Diseases of the skin and subcutaneous tissue',
        value: 'L00-L99|Diseases of the skin and subcutaneous tissue'
      },{
        text: 'Diseases of the musculoskeletal system and connective tissue',
        value: 'M00-M99|Diseases of the musculoskeletal system and connective tissue'
      }]
    }
  },
  methods: {
    addPatient() {
      if (!this.patient.first_name || !this.patient.last_name || !this.patient.gender || !this.patient.dob || !this.patient.village || !this.patient.district || !this.patient.occupation) {
        this.$swal("Fields validation","Please fill in all required fields","warning")
      } else {
        this.addLoading1 = true
        let patientPayload = {
          first_name: this.patient.first_name,
          last_name: this.patient.last_name,
          gender: this.patient.gender,
          dob: this.patient.dob,
          village: this.patient.village,
          district: this.patient.district,
          occupation: this.patient.occupation,
        };
        let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/patients`;
        axios
          .post(pHRsAPIEndpoint, patientPayload, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
            },
          })
          .then((response) => {
            if (response.data.status === "success"){
               this.addLoading1 = false
               this.$swal("Information", response.data.message, "success").then(() => {
               this.$refs.regForm.reset()
               this.addPatientDialog = false
               this.loadPatients()
               });
            } else{
              this.$swal(response.data.status, response.data.message +", "+response.data.errors, response.data.status)
              this.addLoading1 = false
            }
          })
          .catch((error) => {
            this.$swal("Error", error + ", Couldn't reach API", "error");
            this.addLoading1 = false
          });
      }
    },
    loadPatients() {
      this.loading = true
      let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/patients`;
      axios
        .get(pHRsAPIEndpoint, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
          },
        })
        .then((response) => {
          this.patients = response.data.data;
          this.loading = false
        })
        .catch((error) => {
          this.$swal("Error", error + ", Couldn't reach API", "error");
          this.loading = false
        });
    },
    newPatient(){
      this.addPatientDialog = true
    },
    viewHealthRecord(patient_id){
      let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/patients/${patient_id}/vital_signs/${patient_id}`
      axios
        .get(pHRsAPIEndpoint, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
          },
        })
        .then((response) => {
          if (response.data.status === "error") {
            this.$swal("Message", response.data.message, "info");
          } else {
            this.vitals = response.data.data;
            this.dialog = true
          }
        })
        .catch((error) => {
          this.$swal("Error", error + ", Couldn't reach API", "error");
        });
    },
    selectRecord(patient_id){
       this.vital_signs.patient_id = patient_id
       this.addDialog = true
    },
    deletePatient(patient_id){
      let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/patients/${patient_id}`;
      this.$swal({
          title: 'Delete Patient',
          text: "Are you sure you want to delete this patient?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
      })
      .then((result) => {
      if (result.isConfirmed) {
       axios
        .delete(pHRsAPIEndpoint,{
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
            },
          })
        .then((response) =>{
           if (response.data.status === "success"){
              this.$swal("Message", response.data.message, "success").then(() => {
                  this.loadPatients()
                }
              );
           }
        })
        .catch((error) =>{
          this.$swal("Error", error + ", Couldn't reach API", "error");
        })
  } 
});
    },
    addHealthRecord(){
       if (!this.vital_signs.weight || !this.vital_signs.height || !this.vital_signs.diagnosis || !this.vital_signs.temp_reading) {
        this.$swal("Fields validation","Please fill in all required fields","warning");
      } else {
        this.addLoading = true
        let vital_signsPayload = {
          patient_id: this.vital_signs.patient_id,
          weight: this.vital_signs.weight,
          height: this.vital_signs.height,
          temp_reading: this.vital_signs.temp_reading,
          diagnosis: this.vital_signs.diagnosis,
        };
        let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/patients/${this.vital_signs.patient_id}/vital_signs`;
        axios
          .post(pHRsAPIEndpoint, vital_signsPayload, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem(
                "Authorization"
              )}`,
            },
          })
          .then((response) => {
            if (response.data.status === "success") {
              this.addLoading = false
              this.$swal("Message", response.data.message, "success").then(() => {
                  this.addDialog = false;
                  this.$refs.form.reset();
                }
              );
            } else {
              this.$swal(response.data.status, response.data.message +", "+response.data.errors, response.data.status)
              this.addLoading = false
            }
          })
          .catch((error) => {
            this.$swal("Error", error + ", Couldn't reach API", "error");
            this.addLoading = false
          });
        }
    },
     exportToPdf(){
       const columns = [
        { title: "ID", dataKey: "id" },
        { title: "First Name", dataKey: "first_name" },
        { title: "Last Name", dataKey: "last_name" },
        { title: "Gender", dataKey: "gender" },
        { title: "Date of Birth", dataKey: "dob" },
        { title: "District", dataKey: "district" },
        { title: "Village", dataKey: "village" },
        { title: "Occupation", dataKey: "occupation" },
      ];
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter"
      });
      // Using autoTable plugin
      doc.autoTable({
        columns,
        body: this.patients,
        //margin: { left: 0.5, top: 1.25 }
      });

      // Creating footer and saving file
      doc.save(`${this.heading}.pdf`);
    },
    cancel() {
       this.$refs.form.reset()
       this.addDialog = false
    }
  },
  mounted() {
    this.loadPatients()
  },

}
</script>
