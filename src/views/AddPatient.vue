<template>
    <NavBar></NavBar>
    <div class="home container-fluid">
        <div class="row">
            <div class="col-3">
                <Profile></Profile>
            </div>
            <div class="col-9">
                <div class="card card-add mt-4">
                    <div class="mt-4">
                        <h4>Patient Details</h4>
                        <hr />
                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent="addPatient">
                            <div class="form-group row">
                                <div class="form-group col-xs-5 col-lg-5 col-md-5 col-sm-6 p-2">
                                    <label for="firstname">First Name</label>
                                    <input
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        class="form-control"
                                        placeholder="First Name"
                                        v-model.trim="patient.first_name"
                                    />
                                </div>
                                <div class="form-group col-xs-5 col-lg-5 col-md-5 col-sm-6 p-2">
                                    <label for="lastname">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        class="form-control"
                                        placeholder="Last Name"
                                        v-model.trim="patient.last_name"
                                    />
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="form-group col-xs-5 col-lg-5 col-md-5 col-sm-6 p-2">
                                    <label for="gender">Gender</label>
                                    <select
                                        class="form-control"
                                        id="gender"
                                        name="gender"
                                        v-model.trim="patient.gender"
                                    >
                                        <option value>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div class="form-group col-xs-5 col-lg-5 col-md-5 col-sm-6 p-2">
                                    <label for="birthdate">Date Of Birth</label>
                                    <input
                                        type="date"
                                        class="form-control"
                                        id="birthdate"
                                        name="dob"
                                        v-model.trim="patient.dob"
                                    />
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="form-group col-xs-5 col-lg-5 col-md-5 col-sm-6 p-2">
                                    <label for="district">District</label>

                                    <input
                                        type="text"
                                        id="district"
                                        name="district"
                                        class="form-control"
                                        placeholder="District"
                                        v-model.trim="patient.district"
                                    />
                                </div>
                                <div class="form-group col-xs-5 col-lg-5 col-md-5 col-sm-6 p-2">
                                    <label for="village">Village</label>
                                    <input
                                        type="text"
                                        id="village"
                                        name="village"
                                        class="form-control"
                                        placeholder="Home Village"
                                        v-model.trim="patient.village"
                                    />
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="form-group col-xs-5 col-lg-5 col-md-5 col-sm-12 p-2">
                                    <label for="district">Occupation</label>
                                    <select
                                        class="form-control"
                                        id="occupation"
                                        name="occupation"
                                        v-model="patient.occupation"
                                    >
                                        <option value>Select</option>
                                        <option value="Accountant">Accountant</option>
                                        <option value="Software Developer">Software Developer</option>
                                        <option value="Business Owner">Business Owner</option>
                                        <option value="Mechanic">Mechanic</option>
                                        <option value="Driver">Driver</option>
                                        <option value="Welder">Welder</option>
                                        <option value="Construction worker">Construction worker</option>
                                        <option value="Painter">Painter</option>
                                        <option value="Radiologist">Radiologist</option>
                                        <option value="Student">Student</option>
                                        <option value="Farmer">Farmer</option>
                                        <option value="Coal miner">Coal miner</option>
                                        <option value="Coal miner">Other</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" class="btn add mt-2">Add Patient</button> &nbsp;
                            <button type="reset" class="btn cancel mt-2">Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.cancel {
    background-color: #7c819c;
    color: #fff;
    border-radius: 17px;
}
.cancel:hover {
    background-color: #7c819c;
    color: #fff;
    border-radius: 17px;
}
.add {
    background-color: #14a800;
    color: #fff;
    border-radius: 17px;
}
.add:hover {
    background-color: #3c8224;
    color: #fff;
    border-radius: 17px;
}
h4 {
    margin-left: 10px;
    color: #14a800;
}

hr {
    margin-left: 10px;
    margin-right: 20px;
}
.card-footer {
    background-color: #e4ebe4;
}

.card-header {
    background-color: #fff;
}
.card-add {
    background-color: #fff;
    border-radius: 10px;
}
</style>
<script>
import axios from "axios"
// @ is an alias to /src
import Profile from "@/components/Profile.vue";
import NavBar from "@/components/NavBar.vue";

export default {
    name: "AddPatient",
    components: {
        Profile,
        NavBar
    },
    data() {
        return {
            patient: {
                first_name: null,
                last_name: null,
                gender: null,
                dob: null,
                village: null,
                district: null,
                occupation: null
            },
            alert: '',
            image: '',
            username: '',
            email: '',
            BASE_URL: 'patients'
        }
    },
    methods: {
        addPatient(event) {
            if (!this.patient.first_name || !this.patient.last_name || !this.patient.gender || !this.patient.dob || !this.patient.village || !this.patient.district || !this.patient.occupation) {
                this.$swal('Fields validation', 'Please enter in all fields', 'warning');
            } else {
                let patientPayload = {
                    first_name: this.patient.first_name,
                    last_name: this.patient.last_name,
                    gender: this.patient.gender,
                    dob: this.patient.dob,
                    village: this.patient.village,
                    district: this.patient.district,
                    occupation: this.patient.occupation
                }
                let pHRsAPIEndpoint = `${sessionStorage.getItem("API_URL")}/${this.BASE_URL}`;
                axios
                    .post(pHRsAPIEndpoint, patientPayload, {
                        headers: {
                            "Authorization": `Bearer ${sessionStorage.getItem("Authorization")}`
                        }
                    })
                    .then(response => {
                        this.alert = response.data.message
                        this.$swal('Information', this.alert, 'success').then(() => {
                            event.target.reset()
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }

};
</script>
