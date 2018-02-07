<template>
  <div id="app">
    <form>
      <md-input-container>
        <label>Price</label>
        <md-input type="number" v-model="currentTrip.price" />
      </md-input-container>

      <md-input-container>
        <label>Date</label>
        <md-input type="datetime-local" v-model="currentTrip.date" />
      </md-input-container>

      <md-input-container>
        <label>Capacity</label>
        <md-input type="number" v-model="currentTrip.capacity" />
      </md-input-container>

      <md-input-container>
        <label>Travel Time</label>
        <md-input type="number" v-model="currentTrip.travel_time" />
      </md-input-container>

      <md-input-container>
        <label>From</label>
        <md-input type="text" v-model="currentTrip.from" />
      </md-input-container>

      <md-input-container>
        <label>To</label>
        <md-input type="text" v-model="currentTrip.to" />
      </md-input-container>
    </form>
    <!-- <md-button @click="postDemand()">Post Demand</md-button> -->
    <md-button @click="postOffer()" v-if="isValidTrip">Post Offer</md-button>

    <md-dialog-alert
      :md-content="'Your offer has been saved'"
      :md-ok-text="'Ok'"
      ref="dialog1">
    </md-dialog-alert>
  </div>
</template>

<script>
import api from './api'
import moment from 'moment'

export default {
  name: 'app',
  data () {
    return {
      currentTrip: {
        price: 0,
        date: moment().format('YYYY-MM-DDTHH:mm'),
        capacity: 1,
        travel_time: null,
        from: null,
        to: null
      }
    }
  },
  computed: {
    dataToSend () {
      return {
        price: this.currentTrip.price,
        date: this.parseDate(this.currentTrip.date),
        capacity: this.currentTrip.capacity,
        travel_time: this.currentTrip.travel_time,
        from: this.currentTrip.from,
        to: this.currentTrip.to
      }
    },
    isValidTrip () {
      if (this.dataToSend.price === null || this.dataToSend.price < 0) {
        return false
      }
      if (!this.dataToSend.date || this.dataToSend.date === NaN) {
        return false
      }
      if (this.dataToSend.capacity === null || this.dataToSend.capacity <= 0) {
        return false
      }
      if (this.dataToSend.travel_time === null || this.dataToSend.travel_time <= 0) {
        return false
      }
      if (this.dataToSend.from === null || this.dataToSend.from === '') {
        return false
      }
      if (this.dataToSend.to === null || this.dataToSend.to === '') {
        return false
      }
      return true
    }
  },
  methods: {
    resetValues () {
      this.currentTrip = {
        price: 0,
        date: moment().format('YYYY-MM-DDTHH:mm'),
        capacity: 1,
        travel_time: null,
        from: null,
        to: null
      }
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    parseDate (dateString) {
      return moment(dateString).unix()
    },
    postDemand () {
      api.postDemand(this.dataToSend)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    postOffer () {
      api.postOffer(this.dataToSend)
        .then((response) => {
          this.openDialog('dialog1')
          this.resetValues()
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  mounted () {
  }
}
</script>

<style>
</style>
