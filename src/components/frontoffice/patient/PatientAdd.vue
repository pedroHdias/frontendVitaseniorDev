<template>
  <v-expansion-panel id="add_patient_to_box" inset dark>
    <v-expansion-panel-content hide-actions>
      <div slot="header">
        <v-btn color="primary" dark>
          <v-icon class="pr-2">fas fa-plus</v-icon>
          <label>{{ $t("frontoffice.patient.new_patient") }}</label>
        </v-btn>
      </div>

      <v-form>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 lg3>
              <v-text-field
                :rules="[() => (patient.name.length > 3 || patient.name.length == 0) || 'Patient name is required']"
                :label="$t('frontoffice.patient.name')"
                v-model="patient.name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6 lg2>
              <v-select
                :items="genderOptions"
                item-text="name"
                item-value="type"
                :rules="[() => (patient.gender.length > 3 || patient.gender.length == 0) || 'Patient gender is required']"
                :label="$t('frontoffice.patient.gender')"
                v-model="patient.gender"
                single-line
                append-icon="fas fa-angle-down"
              ></v-select>
            </v-flex>
            <v-flex xs12 md6 lg3>
              <v-menu
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="menu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="patient.birthdate"
              >
                <v-text-field
                  slot="activator"
                  :label="$t('frontoffice.patient.birthdate')"
                  v-model="patient.birthdate"
                  append-icon="fas fa-calendar-alt"
                  readonly
                ></v-text-field>
                <v-date-picker
                  ref="picker"
                  v-model="patient.birthdate"
                  @change="$refs.menu.save(patient.birthdate)"
                  min="1910-01-01"
                  :max="new Date().toISOString().substr(0, 10)"
                  no-title
                  next-icon="fas fa-angle-right"
                  prev-icon="fas fa-angle-left"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 md6 lg2>
              <v-text-field
                mask="#########"
                :rules="[() => (patient.nif.length === 9 || patient.nif.length === 0) || 'Invalid Patient NIF']"
                :label="$t('frontoffice.patient.nif')"
                v-model="patient.nif"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6 lg2>
              <v-text-field
                :rules="[() => (/^[0-9]{8}([ -]*[0-9][ ]*[A-Z]{2}[0-9])*$/.test(patient.cc) || patient.cc.length == 0) || 'Invalid Patient CC']"
                :label="$t('frontoffice.patient.cc')"
                v-model="patient.cc"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="pt-1">
              <label class="primary--text">info:</label>
              {{ $t('frontoffice.patient.add_info') }}
            </v-flex>
            <v-flex sx12>
              <v-btn
                dark
                color="ash"
                block
                @click.native="save"
              >{{ $t('frontoffice.patient.save') }}</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { event_bus } from "@/plugins/bus.js";

export default {
  name: "add_patient_to_box",
  props: {
    box: Object
  },
  data: () => {
    return {
      patient: {
        name: "",
        birthdate: null,
        gender: "",
        height: null,
        weight: null,
        id: null,
        since: null,
        active: false,
        nif: "",
        cc: ""
      },
      genderOptions: [],
      menu: false
    };
  },
  mounted() {
    this.genderOptions = [
      { type: "male", name: this.$t("frontoffice.patient.male") },
      { type: "female", name: this.$t("frontoffice.patient.female") },
      { type: "undefined", name: this.$t("frontoffice.patient.undefined") }
    ];
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save() {
      if (
        this.patient.gender.length > 1 &&
        this.patient.name.length > 3 &&
        this.patient.birthdate !== null &&
        this.patient.nif.length === 9 &&
        this.patient.cc.length >= 8
      ) {
        event_bus.$emit("waiting", true);
        event_bus.$data.http
          .post("/vitabox/" + this.box.id + "/patient", this.patient)
          .then(response => {
            event_bus.$emit("updatePatients");
            event_bus.$emit("toast", {
              message: "patient was successfully added to vitabox",
              type: "success"
            });
            this.patient = {
              name: "",
              birthdate: null,
              gender: "",
              id: null,
              since: null,
              nif: "",
              cc: ""
            };
            event_bus.$emit("waiting", false);
          })
          .catch(error => {
            if (error.response) {
              event_bus.$emit("toast", {
                message: error.response.data,
                type: "error"
              });
            } else {
              event_bus.$emit("toast", {
                message: error.message,
                type: "error"
              });
            }
            event_bus.$emit("waiting", false);
          });
      } else {
        event_bus.$emit("toast", {
          message: "insert all fields please",
          type: "error"
        });
      }
    }
  }
};
</script>