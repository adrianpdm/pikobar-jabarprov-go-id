<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <div class="flex flex-wrap">
      <h4 class="p-5 text-xl md:w-1/2">
        <b>Jenis Kelamin</b>
      </h4>
      <select
        v-model="optionSelected"
        class="select-option-selector md:w-1/2"
        @change="changeGroupJenisKelamin($event.target.value)"
      >
        <option
          v-for="list in optionList"
          :key="list"
          :value="list"
        >
          {{ list }}
        </option>
      </select>
    </div>
    <hr>
    <div v-if="messageNone" class="m-5 mb-0 p-2" style="background:#e6e6e6">
      <b>Disclaimer :</b>
      <p>{{ messageNone }}</p>
    </div>
    <div
      class="w-full p-5"
      style="min-height: 300px;"
      :class="isLoading?'':'hidden'"
    >
      <ContentLoader
        class="w-full hidden lg:block"
        :speed="3"
        :width="400"
        :height="350"
        primary-color="#eee"
        secondary-color="#fff"
      >
        <rect
          :key="1"
          x="0"
          :y="4"
          width="100%"
          height="300"
          rx="3"
          ry="3"
        />
        <rect
          :key="2"
          x="0"
          :y="310"
          width="100%"
          height="30"
          rx="3"
          ry="3"
        />
      </ContentLoader>
    </div>
    <div
      :class="!isLoading?'':'hidden'"
    >
      <GChart
        class="p-5"
        type="PieChart"
        :data="pieChartJenisKelaminData"
        :options="pieChartJenisKelaminOptions"
      />
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { GChart } from 'vue-google-charts'
import { formatNumber, formatNumberPercent } from '~/lib/number'

export default {
  name: 'BarStatJenisKelaminIstilahBaru',
  components: {
    GChart,
    ContentLoader
  },
  data () {
    return {
      optionList: [
        'Terkonfirmasi',
        'Isolasi/ Dalam Perawatan',
        'Selesai Isolasi/ Sembuh',
        'Meninggal'
      ],
      optionSelected: 'Terkonfirmasi',
      jsonDataKasusGender: {
        confirmation_total: {
          perempuan: 0,
          lakilaki: 0
        },
        confirmation_diisolasi: {
          perempuan: 0,
          lakilaki: 0
        },
        confirmation_meninggal: {
          perempuan: 0,
          lakilaki: 0
        },
        confirmation_selesai: {
          perempuan: 0,
          lakilaki: 0
        }
      },
      angkaNone: 0,
      angkaTotal: 0,
      persenNone: 0,
      messageNone: '',
      pieChartJenisKelaminData: [
        ['Jenis Kelamin', 'Data'],
        ['Pria', 0],
        ['Wanita', 0],
        ['N/A', 0]
      ],
      pieChartJenisKelaminOptions: {
        height: 350,
        widht: 350,
        slices: {
          0: { color: '#2DAC55' },
          1: { color: '#F6D039' },
          2: { color: '#7D7D7D' }
        },
        legend: {
          position: 'bottom'
        },
        pieHole: 0.4,
        chartArea: { width: '80%' }
      }
    }
  },
  computed: {
    dataKasusGender () {
      return this.$store.getters['data-kasus-gender-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-kasus-gender-v2/isLoading']
    }
  },
  watch: {
    dataKasusGender (val) {
      this.jsonDataKasusGender = val
      this.changeGroupJenisKelamin('Terkonfirmasi')
    }
  },
  mounted () {
    this.getDataKasusGender()
  },
  methods: {
    formatNumber,
    formatNumberPercent,
    ifNullReturnZero (str) {
      if (str === null) {
        return 0
      } else {
        return str
      }
    },
    formatDate (date) {
      const d = new Date(date)
      const year = d.getFullYear()
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      return [day, month, year].join('-')
    },
    resetPieChartJenisKelaminData () {
      this.pieChartJenisKelaminData = [
        ['Jenis Kelamin', 'Data'],
        ['Pria', 0],
        ['Wanita', 0],
        ['N/A', 0]
      ]
    },
    changeGroupJenisKelamin (stat) {
      const self = this
      this.resetPieChartJenisKelaminData()

      let tempJenisKelaminPria = 0
      let tempJenisKelaminWanita = 0
      let tempJenisKelaminNA = 0

      if (stat === 'Terkonfirmasi') {
        tempJenisKelaminPria = parseInt(this.jsonDataKasusGender.confirmation_total.lakilaki)
        tempJenisKelaminWanita = parseInt(this.jsonDataKasusGender.confirmation_total.perempuan)
        tempJenisKelaminNA = parseInt(this.jsonDataKasusGender.confirmation_total.tidakdiketahui)
      } else if (stat === 'Isolasi/ Dalam Perawatan') {
        tempJenisKelaminPria = parseInt(this.jsonDataKasusGender.confirmation_diisolasi.lakilaki)
        tempJenisKelaminWanita = parseInt(this.jsonDataKasusGender.confirmation_diisolasi.perempuan)
        tempJenisKelaminNA = parseInt(this.jsonDataKasusGender.confirmation_diisolasi.tidakdiketahui)
      } else if (stat === 'Selesai Isolasi/ Sembuh') {
        tempJenisKelaminPria = parseInt(this.jsonDataKasusGender.confirmation_selesai.lakilaki)
        tempJenisKelaminWanita = parseInt(this.jsonDataKasusGender.confirmation_selesai.perempuan)
        tempJenisKelaminNA = parseInt(this.jsonDataKasusGender.confirmation_selesai.tidakdiketahui)
      } else if (stat === 'Meninggal') {
        tempJenisKelaminPria = parseInt(this.jsonDataKasusGender.confirmation_meninggal.lakilaki)
        tempJenisKelaminWanita = parseInt(this.jsonDataKasusGender.confirmation_meninggal.perempuan)
        tempJenisKelaminNA = parseInt(this.jsonDataKasusGender.confirmation_meninggal.tidakdiketahui)
      }

      self.pieChartJenisKelaminData = [
        ['Jenis Kelamin', 'Data'],
        ['Pria', tempJenisKelaminPria],
        ['Wanita', tempJenisKelaminWanita],
        ['N/A', tempJenisKelaminNA]
      ]

      if (tempJenisKelaminNA) {
        self.angkaNone = tempJenisKelaminNA
        self.angkaTotal = tempJenisKelaminPria + tempJenisKelaminWanita + tempJenisKelaminNA
        self.persenNone = (self.angkaNone / self.angkaTotal) * 100
        self.messageNone = 'Terdapat ' + self.formatNumber(self.angkaNone) + '(' + formatNumberPercent(self.persenNone) + '%) dari total ' + formatNumber(self.angkaTotal) + ' belum dilengkapi dengan keterangan Jenis Kelamin sehingga tidak dapat divisualisasikan.'
      } else {
        self.angkaNone = 0
        self.angkaTotal = tempJenisKelaminPria + tempJenisKelaminWanita + 0
        self.persenNone = (self.angkaNone / self.angkaTotal) * 100
        self.messageNone = ''
      }
    },
    // get data
    getDataKasusGender () {
      this.$store.dispatch('data-kasus-gender-v2/getItems')
    }
  }
}

</script>

<style lang="scss" scoped>
.button-selector {
  @apply px-6 py-2 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-white bg-brand-green;
  }
}

.select-option-selector {
  border-radius: 0.2rem;
  border-width: 1px;
  border-style: solid;
  border-color: #555;
  color: #555;
  background-color: #fff;
  height: 30px;
  width: 160px;
  margin: auto;
  padding: 0px;
}

</style>
