<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          Web Apps
        </v-card-title>
        <v-card-text>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/peaceiris/webapps/issues"
              target="_blank"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; peaceiris</small></em>
          </div>
          <hr class="my-3" />
          <a href="https://github.com/peaceiris/webapps" target="_blank">
            Source code - GitHub peaceiris/webapps
          </a>
          <br />
          <a href="https://peaceiris.com" target="_blank">
            peaceiris homepage
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/qrcode-reader">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'

// export default {
//   components: {
//     Logo,
//     VuetifyLogo
//   }
// }
</script>
