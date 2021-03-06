import Vue from 'vue';
import axios from "axios";
import store from '@/plugins/store.js'
import i18n from '@/plugins/i18n.js'

export const event_bus = new Vue({
  data: {
    http: null,
    peer: null,
    token: store.state.user.token,
    url: process.env.NODE_ENV === "production" ?
      "https://vitasenior-mt.ipt.pt/api" :
      "http://192.168.1.106:9000/api"
  },
  created() {
    this.initHttp(this.token);
  },
  watch: {
    token(val) {
      this.initHttp(val);
    }
  },
  methods: {
    initHttp(token) {
      this.http = axios.create({
        baseURL: this.url,
        headers: token ? {
          "Authorization": token,
          "Content-Type": "application/json",
          "Accept-Version": "1.0.0",
          "Accept-Language": i18n.locale
        } : {
            "Content-Type": "application/json",
            "Accept-Version": "1.0.0",
            "Accept-Language":  i18n.locale
          }
      });
    }
  }
});