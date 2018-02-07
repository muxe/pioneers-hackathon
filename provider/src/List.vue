<template>
  <div id="list">
    <md-button @click="getList()">Refresh List</md-button>
    <md-table @sort="onSort">
      <md-table-header>
        <md-table-row>
          <md-table-head md-sort-by="type">Type</md-table-head>
          <md-table-head md-sort-by="from">From</md-table-head>
          <md-table-head md-sort-by="to">To</md-table-head>
          <md-table-head md-sort-by="date">Date</md-table-head>
          <md-table-head md-sort-by="from_acc">Provider</md-table-head>
          <md-table-head md-sort-by="capacity">Capacity</md-table-head>
          <md-table-head md-sort-by="travel_time">Travel Time</md-table-head>
          <md-table-head md-sort-by="price">Price</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="item in items" :key="item.signature">
          <md-table-cell>{{item.data.type}}</md-table-cell>
          <md-table-cell>{{item.data.from}}</md-table-cell>
          <md-table-cell>{{item.data.to}}</md-table-cell>
          <md-table-cell>{{item.data.date | humanDate}}</md-table-cell>
          <md-table-cell>{{item.data.from_acc | startAndEnd(3, 3)}}</md-table-cell>
          <md-table-cell>{{item.data.capacity}}</md-table-cell>
          <md-table-cell>{{item.data.travel_time}}</md-table-cell>
          <md-table-cell>{{item.data.price}}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <md-button @click="getList()">Refresh List</md-button>
  </div>
</template>

<script>
import api from './api'
import moment from 'moment'

export default {
  name: 'list',
  data () {
    return {
      items: []
    }
  },
  filters: {
    startAndEnd (str, start = 6, end = 6) {
      return str.substr(0, start + 2) +
        '…' +
        str.substr(str.length - end, str.length)
    },
    humanDate (input) {
      return moment(input * 1000).format('DD.MM.YYYY HH:mm')
    }
  },
  methods: {
    onSort (sort) {
      console.log('onSort', sort)
      this.sortList(sort.name, sort.type)
    },
    getList () {
      api.getMarket()
        .then((response) => {
          console.log(response)
          if (response.data) {
            this.items = response.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    shortAccount (input) {
      return input
    },
    sortList (name, type) {
      this.items.sort((a, b) => {
        if (a.data[name] < b.data[name]) {
          return type === 'asc' ? -1 : 1
        }
        if (a.data[name] > b.data[name]) {
          return type === 'asc' ? 1 : -1
        }

        return 0
      })
    }
  },
  mounted () {
    console.log('getting list')
    this.getList()
  }
}
</script>

<style>
#list {
  padding: 15px;
}
</style>
