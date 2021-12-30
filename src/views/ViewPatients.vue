<template>
  <NavBar></NavBar>
  <AppView>
    <template v-slot:profile>
        <Profile></Profile>
    </template>
    <template v-slot:page-content>
     <!-- Modal -->
    <div
      class="modal fade"
      id="medicalRecordModal"
      tabindex="-1"
      aria-labelledby="medicalModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add Medical Record</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="addMedicalRecord" id="health-records-form">
              <input type="hidden" id="patient-id" name="patient-id" />
              <div class="form-group">
                <label for="weight">Weight (Kgs)</label>
                <input
                  type="text"
                  class="form-control my-2"
                  id="weight"
                  name="weight"
                  placeholder="Weight"
                  v-model="vital_signs.weight"
                />
              </div>
              <div class="form-group">
                <label for="height">Height</label>
                <input
                  type="text"
                  class="form-control my-2"
                  id="height"
                  name="height"
                  placeholder="Height"
                  v-model="vital_signs.height"
                />
              </div>
              <div class="form-group">
                <label for="temp_reading">
                  Temperature reading
                  <span>&#8451;</span>
                </label>
                <input
                  type="text"
                  class="form-control my-2"
                  id="temp_reading"
                  name="temp_reading"
                  placeholder="Temp reading"
                  v-model="vital_signs.temp_reading"
                />
              </div>
              <div class="form-group">
                <label for="diagnosis">Diagnosis</label>
                <select
                  class="form-control my-2"
                  id="diagnosis"
                  name="diagnosis"
                  v-model="vital_signs.diagnosis"
                >
                  <option disabled value>Select</option>
                  <option
                    value="A00-B99|Certain infectious and parasitic diseases"
                  >Certain infectious and parasitic diseases</option>
                  <option value="C00-D49|Neoplasms">Neoplasms</option>
                  <option
                    value="D50-D89|Diseases of the blood and blood-forming organs and certain
                                disorders
                                involving the immune mechanism"
                  >
                    Diseases of the blood and blood-forming organs and certain
                    disorders involving the immune mechanism
                  </option>
                  <option
                    value="E00-E89|Endocrine, nutritional and metabolic diseases"
                  >Endocrine, nutritional and metabolic diseases</option>
                  <option
                    value="F01-F99|Mental, Behavioral and Neurodevelopmental disorders"
                  >Mental, Behavioral and Neurodevelopmental disorders</option>
                  <option
                    value="G00-G99|Diseases of the nervous system"
                  >Diseases of the nervous system</option>
                  <option
                    value="H00-H59|Diseases of the eye and adnexa"
                  >Diseases of the eye and adnexa</option>
                  <option
                    value="H60-H95|Diseases of the ear and mastoid process"
                  >Diseases of the ear and mastoid process</option>
                  <option
                    value="I00-I99|Diseases of the circulatory system"
                  >Diseases of the circulatory system</option>
                  <option
                    value="J00-J99|Diseases of the respiratory system"
                  >Diseases of the respiratory system</option>
                  <option
                    value="K00-K95|Diseases of the digestive system"
                  >Diseases of the digestive system</option>
                  <option
                    value="L00-L99|Diseases of the skin and subcutaneous tissue"
                  >Diseases of the skin and subcutaneous tissue</option>
                  <option
                    value="M00-M99|Diseases of the musculoskeletal system and connective tissue"
                  >Diseases of the musculoskeletal system and connective tissue</option>
                  <option
                    value="N00-N99|Diseases of the genitourinary system"
                  >Diseases of the genitourinary system</option>
                  <option
                    value="O00-O9A|Pregnancy, childbirth and the puerperium"
                  >Pregnancy, childbirth and the puerperium</option>
                  <option
                    value="P00-P96|Certain conditions originating in the perinatal period"
                  >Certain conditions originating in the perinatal period</option>
                  <option
                    value="Q00-Q99|Congenital malformations, deformations and chromosomal
                                abnormalities"
                  >
                    Congenital malformations, deformations and chromosomal
                    abnormalities
                  </option>
                  <option
                    value="R00-R99|Symptoms, signs and abnormal clinical and laboratory
                                findings, not
                                elsewhere
                                classified"
                  >
                    Symptoms, signs and abnormal clinical and laboratory
                    findings, not elsewhere classified
                  </option>
                  <option
                    value="S00-T88|Injury, poisoning and certain other consequences of external
                                causes"
                  >
                    Injury, poisoning and certain other consequences of external
                    causes
                  </option>
                  <option value="U00-U85|Codes for special purposes">Codes for special purposes</option>
                  <option value="V00-Y99|External causes of morbidity">External causes of morbidity</option>
                  <option
                    value="Z00-Z99 Factors influencing health status and contact with health
                                services"
                  >
                    Factors influencing health status and contact with health
                    services
                  </option>
                </select>
              </div>
              <br />
              <button
                ref="close_btn"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >Close</button>
              &nbsp;
              <button type="submit" class="btn btn-success">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- View Medical Record modal -->
    <div
      class="modal fade"
      id="medicalRecordsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Patient's health history</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <input type="hidden" id="id" />
            </form>
            <ul class="timeline">
              <li v-for="vital in vitals" :key="vital.id">
                <a class="text-decoration-none">Vital Signs</a>
                <a class="float-end text-decoration-none">
                  {{
                    vital.created_at.substr(0, 7)
                  }}
                </a>
                <table class="table table-bordered mt-2">
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
                </table>
                <div class="card mt-2">
                  <div class="card-header bg-light">
                    <h6>Diagnosis used</h6>
                  </div>
                  <div class="card-body">
                    <ul>
                      <li>{{ vital.diagnosis.split("|").pop() }}</li>
                    </ul>
                    <a
                      class="btn btn-outline-primary mt-3"
                      :href="
                        'https://www.icd10data.com/ICD10CM/Codes/' +
                        vital.diagnosis.split('|').shift()
                      "
                      target="_blank"
                    >View Diagnosis</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End of View Medical Record modal -->
    <button
      ref="medicalRecordsButton"
      type="button"
      class="btn btn-primary btn-sm d-none"
      data-bs-toggle="modal"
      data-bs-target="#medicalRecordsModal"
    ></button>
        <div class="card card-view-patients mt-4">
        <div class="mt-4">
          <h4>Patients list</h4>
          <hr />
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead class="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">DOB</th>
                  <th scope="col">District</th>
                  <th scope="col">Village</th>
                  <th scope="col">Occupation</th>
                  <th scope="col">Health Record</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="patient in patients" :key="patient.id">
                  <td>{{ patient.id }}</td>
                  <td>{{ patient.first_name }}</td>
                  <td>{{ patient.last_name }}</td>
                  <td>{{ patient.gender }}</td>
                  <td>{{ patient.dob }}</td>
                  <td>{{ patient.district }}</td>
                  <td>{{ patient.village }}</td>
                  <td>{{ patient.occupation }}</td>
                  <td>
                    <button
                      v-on:click="selectPatient(patient.id)"
                      type="button"
                      class="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#medicalRecordModal"
                    >
                      <i class="fa fa-plus"></i>
                    </button>
                    &nbsp;
                    <button
                      v-on:click="fetchHealthRecord(patient.id)"
                      class="btn btn-success btn-sm"
                    >
                      <i class="fa fa-eye"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </AppView>
</template>

<style scoped>
ul.timeline {
  list-style-type: none;
  position: relative;
}

ul.timeline:before {
  content: " ";
  background: #d4d9df;
  display: inline-block;
  position: absolute;
  left: 29px;
  width: 2px;
  height: 100%;
  z-index: 400;
}

ul.timeline > li {
  margin: 20px 0;
  padding-left: 20px;
}

ul.timeline > li:before {
  content: " ";
  background: white;
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  border: 3px solid #22c0e8;
  left: 20px;
  width: 20px;
  height: 20px;
  z-index: 400;
}

.card-footer {
  background-color: #e4ebe4;
}

.card-view-patients {
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
import axios from "axios";
// @ is an alias to /src
import Profile from "@/components/Profile.vue";
import NavBar from "@/components/NavBar.vue";
import AppView from "@/components/AppView.vue";

export default {
  name: "ViewPatients",
  components: {
    Profile,
    NavBar,
    AppView,
  },
  data() {
    return {
      patients: [],
      vital_signs: {
        patient_id: null,
        diagnosis: "",
        weight: null,
        height: null,
        temp_reading: null,
      },
      vitals: [],
    };
  },
  methods: {
    fetchPatients() {
      let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/patients`;
      axios
        .get(pHRsAPIEndpoint, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
          },
        })
        .then((response) => {
          this.patients = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectPatient(id) {
      this.vital_signs.patient_id = id;
    },
    addMedicalRecord(event) {
      if (
        !this.vital_signs.weight ||
        !this.vital_signs.height ||
        !this.vital_signs.diagnosis ||
        !this.vital_signs.temp_reading
      ) {
        this.$swal(
          "Fields validation",
          "Please enter in all fields",
          "warning"
        );
      } else {
        let vital_signsPayload = {
          patient_id: this.vital_signs.patient_id,
          weight: this.vital_signs.weight,
          height: this.vital_signs.height,
          temp_reading: this.vital_signs.temp_reading,
          diagnosis: this.vital_signs.diagnosis,
        };
        let pHRsAPIEndpoint = `${sessionStorage.getItem("BASE_URL")}/patients/${this.vital_signs.patient_id
          }/vital_signs`;
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
              this.$swal("Message", response.data.message, "success").then(
                () => {
                  event.target.reset();
                  this.$refs.close_btn.click();
                }
              );
            } else {
              this.$swal("Error", response.data.message, "error");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    fetchHealthRecord(patient_id) {
      let pHRsAPIEndpoint = `${sessionStorage.getItem(
        "BASE_URL"
      )}/patients/${patient_id}/vital_signs/${patient_id}`;
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
            this.$refs.medicalRecordsButton.click();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.fetchPatients();
  },
};
</script>
