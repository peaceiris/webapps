<template>
  <v-layout>
    <v-flex class="text-center">
      <h1>Pixela Web UI</h1>
      <a :href="urlGraph" target="_blank" rel="noopener noreferrer">
        <h2>Vital Warmth</h2>
        <img :src="urlSVG" alt="peaceiris Vital Warmth" />
      </a>
      <v-form>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="username"
                label="Username"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="token"
                :append-icon="token ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                type="password"
                name="input-10-2"
                label="Token"
                hint="Your Pixela Token Here"
                value=""
                class="input-group--focused"
                @click:append="token = !token"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="nomal"
                label="Normal Temperature"
                hint="Your Normal Temperature Here"
                :rules="[rules.required]"
                type="number"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="selected"
                :items="items"
                label="Current Temperature"
                hint="Your Current Temperature Here"
                menu-props="auto"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-btn color="primary" rounded @click="createPixel()">
                Submit Today
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              {{ response }}
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-btn color="red" rounded @click="deletePixel()">
                Delete Today
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

const nomalTemp = 36.9
const urlSVG = 'https://pixe.la/v1/users/peaceiris/graphs/vital-warmth'
const urlGraph = `${urlSVG}.html`

function getTempItems() {
  const items = []

  for (let i = 0; i < 50; i++) {
    const j = (i * 0.1 + 35.5).toFixed(1)
    items.push(`${j}`)
  }
  return items
}

function formatDate(date, format) {
  format = format.replace(/yyyy/g, date.getFullYear())
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
  return format
}

function openInNewTab(url) {
  const win = window.open(url, '_blank')
  win.focus()
}

export default {
  data() {
    return {
      username: 'peaceiris',
      token: '',
      graph: 'vital-warmth',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 50 || 'Min 50 characters'
      },
      nomal: `${nomalTemp}`,
      selected: `${nomalTemp}`,
      items: getTempItems(),
      response: '',
      urlSVG,
      urlGraph
    }
  },
  methods: {
    createPixel() {
      let url = ''
      if (process.env.NODE_ENV === 'production') {
        url = `https://pixe.la/v1/users/${this.username}/graphs/${this.graph}`
      } else {
        url = `/api-pixela/v1/users/${this.username}/graphs/${this.graph}`
      }
      const date = new Date()
      const content = {
        date: `${formatDate(date, 'yyyyMMdd')}`,
        quantity: `${this.selected - this.nomal}`
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-USER-TOKEN': `${this.token}`
        },
        data: content,
        url
      }
      axios(options)
        .then((response) => {
          this.response = response.data
          openInNewTab(this.urlGraph)
        })
        .catch((error) => {
          alert(error)
        })
    },
    deletePixel() {
      const date = new Date()
      const today = `${formatDate(date, 'yyyyMMdd')}`
      let url = ''
      if (process.env.NODE_ENV === 'production') {
        url = `https://pixe.la/v1/users/${this.username}/graphs/${this.graph}/${today}`
      } else {
        url = `/api-pixela/v1/users/${this.username}/graphs/${this.graph}/${today}`
      }
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-USER-TOKEN': `${this.token}`
        },
        url
      }
      axios(options)
        .then((response) => {
          this.response = response.data
          openInNewTab(this.urlGraph)
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>
