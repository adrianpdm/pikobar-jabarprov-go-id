<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <div class="flex flex-wrap">
      <h4 class="p-5 text-xl md:w-1/3">
        <b>Umur dan Jenis Kelamin</b>
      </h4>
      <div class="flex flex-wrap items-stretch pb-2 mb-4 md:w-2/3" style="margin: auto;">
        <button
          class="button-selector ml-4 mt-2"
          style="margin-right: 0px; border-top-left-radius: 0.375rem; border-bottom-left-radius: 0.375rem;"
          :active="stat.isActiveSemua"
          @click="enableSemua"
        >
          Semua Umur
        </button>
        <button
          class="button-selector mt-2"
          style="border-top-right-radius: 0.375rem; border-bottom-right-radius: 0.375rem;"
          :active="stat.isActiveAnak"
          @click="enableAnak"
        >
          Anak
        </button>
        <select
          v-model="optionSelected"
          class="select-option-selector ml-4 mt-2"
          @change="changeGroupUsia($event.target.value)"
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
    </div>
    <div
      class="w-full p-5"
      :class="isLoading?'':'hidden'"
    >
      <ContentLoader
        class="w-full hidden lg:block"
        :speed="3"
        :width="400"
        :height="200"
        primary-color="#eee"
        secondary-color="#fff"
      >
        <rect
          :key="1"
          x="0"
          :y="4"
          width="100%"
          height="200"
          rx="3"
          ry="3"
        />
      </ContentLoader>
    </div>
    <div
      :class="!isLoading?'':'hidden'"
    >
      <hr>
      <div class="m-5 mb-0 p-2" style="background:#e6e6e6">
        <b>Disclaimer :</b>
        <p>Tidak seluruh data kasus memiliki kelengkapan data Umur sehingga tidak seluruhnya dapat divisualisasikan</p>
      </div>
      <section
        v-if="stat.isActiveAnak"
      >
        <GChart
          class="p-5"
          type="BarChart"
          :data="barChartAnakUmurJenisKelaminData"
          :options="barChartAnakUmurJenisKelaminOptions"
        />
      </section>
      <section
        v-if="stat.isActiveSemua"
      >
        <GChart
          class="p-5"
          type="BarChart"
          :data="barChartUmurJenisKelaminData"
          :options="barChartUmurJenisKelaminOptions"
        />
      </section>
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import { ContentLoader } from 'vue-content-loader'

export default {
  name: 'BarStatUsiaIstilahBaru',
  components: {
    GChart,
    ContentLoader
  },
  props: {
    propsDataRekapitulasiJabar: {
      type: Object,
      default: () => ({
        kode_prov: '',
        nama_prov: '',
        confirmation_total: {
          anak: {
            laki_laki: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            },
            perempuan: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            }
          },
          semua: {
            laki_laki: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            },
            perempuan: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            }
          }
        },
        confirmation_diisolasi: {
          anak: {
            laki_laki: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            },
            perempuan: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            }
          },
          semua: {
            laki_laki: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            },
            perempuan: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            }
          }
        },
        confirmation_meninggal: {
          anak: {
            laki_laki: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            },
            perempuan: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            }
          },
          semua: {
            laki_laki: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            },
            perempuan: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            }
          }
        },
        confirmation_selesai: {
          anak: {
            laki_laki: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            },
            perempuan: {
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0,
              '6_18': 0
            }
          },
          semua: {
            laki_laki: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            },
            perempuan: {
              bawah_5: 0,
              '6_19': 0,
              '20_29': 0,
              '30_39': 0,
              '40_49': 0,
              '50_59': 0,
              '60_69': 0,
              '70_79': 0,
              atas_80: 0
            }
          }
        }
      })
    }
  },
  data () {
    return {
      stat: {
        isActiveAnak: false,
        isActiveSemua: true
      },
      optionList: [
        'Terkonfirmasi',
        'Isolasi/ Dalam Perawatan',
        'Selesai Isolasi/ Sembuh',
        'Meninggal'
      ],
      optionSelected: 'Terkonfirmasi',
      jsonDataKasusUmur: {
        confirmation_total: {
          anak: {
            perempuan: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            },
            laki_laki: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            }
          },
          semua: {
            perempuan: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            },
            laki_laki: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            }
          }
        },
        confirmation_diisolasi: {
          anak: {
            perempuan: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            },
            laki_laki: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            }
          },
          semua: {
            perempuan: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            },
            laki_laki: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            }
          }
        },
        confirmation_meninggal: {
          anak: {
            perempuan: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            },
            laki_laki: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            }
          },
          semua: {
            perempuan: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            },
            laki_laki: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            }
          }
        },
        confirmation_selesai: {
          anak: {
            perempuan: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            },
            laki_laki: {
              '6_18': 0,
              bawah_1: 0,
              '1_5': 0,
              '5_6': 0
            }
          },
          semua: {
            perempuan: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            },
            laki_laki: {
              '70_79': 0,
              '6_19': 0,
              '30_39': 0,
              atas_80: 0,
              bawah_5: 0,
              '40_49': 0,
              '20_29': 0,
              '50_59': 0,
              '60_69': 0
            }
          }
        }
      },
      barChartUmurJenisKelaminData: {
        cols: [
          { id: 'Umur', label: 'Umur', type: 'string' },
          { id: 'Pria', label: 'Pria', type: 'number' },
          { id: 'Wanita', label: 'Wanita', type: 'number' }
        ],
        rows: [
          {
            c: [
              { v: 100, f: '>80' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 80, f: '70-79' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 70, f: '60-69' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 60, f: '50-59' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 50, f: '40-49' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 40, f: '30-39' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 30, f: '20-29' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 20, f: '6-19' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 10, f: '<5' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          }
        ]
      },
      barChartUmurJenisKelaminOptions: {
        height: 350,
        marginRight: -100,
        series: {
          0: { color: '#2DAC55' },
          1: { color: '#F6D039' },
          2: { color: '#7D7D7D' }
        },
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        vAxis: {
          format: '##;##'
        },
        hAxis: {
          format: ';',
          title: '',
          viewWindowMode: 'explicit',
          viewWindow: {
            min: -150,
            max: 150
          },
          ticks: [
            { v: -10, f: '10' },
            { v: -25, f: '25' },
            { v: -50, f: '50' },
            { v: -100, f: '100' },
            { v: -200, f: '200' },
            { v: -500, f: '500' },
            0, 10, 25, 50, 100, 200, 500
          ]
        },
        chartArea: { width: '80%' }
      },
      barChartAnakUmurJenisKelaminData: {
        cols: [
          { id: 'Umur', label: 'Umur', type: 'string' },
          { id: 'Pria', label: 'Pria', type: 'number' },
          { id: 'Wanita', label: 'Wanita', type: 'number' }
        ],
        rows: [
          {
            c: [
              { v: 18, f: '( 6 - 18 tahun ) Anak Usia Sekolah' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 6, f: '( 5 - 6 tahun ) Anak Pra Sekolah' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 5, f: '( 1 - 5 tahun ) Anak Balita' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 1, f: '( 0 - 1 tahun ) Bayi' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          }
        ]
      },
      barChartAnakUmurJenisKelaminOptions: {
        height: 350,
        marginRight: -100,
        series: {
          0: { color: '#2DAC55' },
          1: { color: '#F6D039' },
          2: { color: '#7D7D7D' }
        },
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        vAxis: {
          format: '##;##',
          html: true
        },
        hAxis: {
          format: ';',
          title: '',
          viewWindowMode: 'explicit',
          viewWindow: {
            min: 150,
            max: 150
          },
          ticks: [
            { v: -10, f: '10' },
            { v: -25, f: '25' },
            { v: -50, f: '50' },
            { v: -100, f: '100' },
            { v: -200, f: '200' },
            { v: -500, f: '500' },
            0, 10, 25, 50, 100, 200, 500
          ]
        },
        chartArea: { left: 115, width: '100%' }
      }
    }
  },
  computed: {
    dataKasusUmur () {
      return this.$store.getters['data-kasus-umur-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-kasus-umur-v2/isLoading']
    }
  },
  watch: {
    dataKasusUmur (val) {
      this.jsonDataKasusUmur = val
      this.changeGroupUsia('Terkonfirmasi')
    }
  },
  mounted () {
    this.getDataKasusUmur()
  },
  methods: {
    ifNullReturnZero (str) {
      if (str === null) {
        return 0
      } else {
        return str
      }
    },
    ifNegatifReturnZero (number) {
      if (number < 0) {
        return 0
      } else {
        return number
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
    enableAnak () {
      this.stat.isActiveAnak = true
      this.stat.isActiveSemua = false
    },
    enableSemua () {
      this.stat.isActiveAnak = false
      this.stat.isActiveSemua = true
    },
    resetBarChartUmurJenisKelaminData () {
      this.barChartUmurJenisKelaminData = {
        cols: [
          { id: 'Umur', label: 'Umur', type: 'string' },
          { id: 'Pria', label: 'Pria', type: 'number' },
          { id: 'Wanita', label: 'Wanita', type: 'number' }
        ],
        rows: [
          {
            c: [
              { v: 100, f: '>80' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 80, f: '70-79' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 70, f: '60-69' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 60, f: '50-59' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 50, f: '40-49' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 40, f: '30-39' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 30, f: '20-29' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 20, f: '6-19' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 10, f: '<5' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          }
        ]
      }
    },
    resetBarChartAnakUmurJenisKelaminData () {
      this.barChartAnakUmurJenisKelaminData = {
        cols: [
          { id: 'Umur', label: 'Umur', type: 'string' },
          { id: 'Pria', label: 'Pria', type: 'number' },
          { id: 'Wanita', label: 'Wanita', type: 'number' }
        ],
        rows: [
          {
            c: [
              { v: 18, f: '( 6 - 18 tahun )     Anak Usia Sekolah' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 6, f: '( 5 - 6 tahun )     Anak Pra Sekolah' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 5, f: '( 1 - 5 tahun )     Anak Balita' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 1, f: '( 0 - 1 tahun )     Bayi' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          }
        ]
      }
    },
    changeGroupUsia (stat) {
      const self = this
      let filter = 'positif_aktif'
      this.resetBarChartUmurJenisKelaminData()
      this.resetBarChartAnakUmurJenisKelaminData()

      if (stat === 'Terkonfirmasi') {
        filter = 'confirmation_total'
      } else if (stat === 'Isolasi/ Dalam Perawatan') {
        filter = 'confirmation_diisolasi'
      } else if (stat === 'Selesai Isolasi/ Sembuh') {
        filter = 'confirmation_selesai'
      } else if (stat === 'Meninggal') {
        filter = 'confirmation_meninggal'
      }

      if (this.jsonDataKasusUmur[filter] !== undefined) {
        // Semua Umur
        this.barChartUmurJenisKelaminData = {
          cols: [
            { id: 'Umur', label: 'Umur', type: 'string' },
            { id: 'Pria', label: 'Pria', type: 'number' },
            { id: 'Wanita', label: 'Wanita', type: 'number' }
          ],
          rows: [
            {
              c: [
                { v: 100, f: '>80' },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki.atas_80) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki.atas_80)).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan.atas_80), f: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan.atas_80).toString() }
              ]
            },
            {
              c: [
                { v: 80, f: '70-79' },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['70_79']) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['70_79'])).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['70_79']), f: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['70_79']).toString() }
              ]
            },
            {
              c: [
                { v: 70, f: '60-69' },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['60_69']) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['60_69'])).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['60_69']), f: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['60_69']).toString() }
              ]
            },
            {
              c: [
                { v: 60, f: '50-59' },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['50_59']) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['50_59'])).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['50_59']), f: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['50_59']).toString() }
              ]
            },
            {
              c: [
                { v: 50, f: '40-49' },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['40_49']) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['40_49'])).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['40_49']), f: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['40_49']).toString() }
              ]
            },
            {
              c: [
                { v: 40, f: '30-39' },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['30_39']) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['30_39'])).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['30_39']), f: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['30_39']).toString() }
              ]
            },
            {
              c: [
                { v: 30, f: '20-29' },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['20_29']) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['20_29'])).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['20_29']), f: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['20_29']).toString() }
              ]
            },
            {
              c: [
                { v: 20, f: '6-19' },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['6_19']) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki['6_19'])).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['6_19']), f: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan['6_19']).toString() }
              ]
            },
            {
              c: [
                { v: 10, f: '<5' },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki.bawah_5) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].semua.laki_laki.bawah_5)).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan.bawah_5), f: parseInt(this.jsonDataKasusUmur[filter].semua.perempuan.bawah_5).toString() }
              ]
            }
          ]
        }

        let max = 0
        let asc = 0
        // find max count for scala
        for (let j = 0; j < self.barChartUmurJenisKelaminData.rows.length; j++) {
          if (self.barChartUmurJenisKelaminData.rows[j].c[2].v > max) {
            max = self.barChartUmurJenisKelaminData.rows[j].c[2].v
          }
          if (self.barChartUmurJenisKelaminData.rows[j].c[1].v * -1 > max) {
            max = self.barChartUmurJenisKelaminData.rows[j].c[1].v * -1
          }
          asc = Math.ceil(max / 10)
          self.barChartUmurJenisKelaminOptions.hAxis.viewWindow.min = (max + asc) * -1
          self.barChartUmurJenisKelaminOptions.hAxis.viewWindow.max = max + asc
        }

        // set number of scala
        self.barChartUmurJenisKelaminOptions.hAxis.ticks = []
        if (max > 0) {
          asc = Math.ceil(max / 10)
          for (let k = 0; k <= max + asc; k = k + asc) {
            self.barChartUmurJenisKelaminOptions.hAxis.ticks.push({ v: k * -1, f: k.toString() })
          }
          for (let k = 0; k <= max + asc; k = k + asc) {
            self.barChartUmurJenisKelaminOptions.hAxis.ticks.push(k)
          }
        } else {
          self.barChartUmurJenisKelaminOptions.hAxis.ticks.push({ v: 0, f: '0' })
          self.barChartUmurJenisKelaminOptions.hAxis.ticks.push(0)
        }

        // Umur Anak
        this.barChartAnakUmurJenisKelaminData = {
          cols: [
            { id: 'Umur', label: 'Umur', type: 'string' },
            { id: 'Pria', label: 'Pria', type: 'number' },
            { id: 'Wanita', label: 'Wanita', type: 'number' }
          ],
          rows: [
            {
              c: [
                { v: 18, f: '( 6 - 18 tahun ) Anak Usia Sekolah' },
                { v: parseInt(this.jsonDataKasusUmur[filter].anak.laki_laki['6_18']) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].anak.laki_laki['6_18'])).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].anak.perempuan['6_18']), f: parseInt(this.jsonDataKasusUmur[filter].anak.perempuan['6_18']).toString() }
              ]
            },
            {
              c: [
                { v: 6, f: '( 5 - 6 tahun ) Anak Pra Sekolah' },
                { v: parseInt(this.jsonDataKasusUmur[filter].anak.laki_laki['5_6']) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].anak.laki_laki['5_6'])).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].anak.perempuan['5_6']), f: parseInt(this.jsonDataKasusUmur[filter].anak.perempuan['5_6']).toString() }
              ]
            },
            {
              c: [
                { v: 5, f: '( 1 - 5 tahun ) Anak Balita' },
                { v: parseInt(this.jsonDataKasusUmur[filter].anak.laki_laki['1_5']) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].anak.laki_laki['1_5'])).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].anak.perempuan['1_5']), f: parseInt(this.jsonDataKasusUmur[filter].anak.perempuan['1_5']).toString() }
              ]
            },
            {
              c: [
                { v: 1, f: '( 0 - 1 tahun ) Bayi' },
                { v: parseInt(this.jsonDataKasusUmur[filter].anak.laki_laki.bawah_1) * -1, f: (parseInt(this.jsonDataKasusUmur[filter].anak.laki_laki.bawah_1)).toString() },
                { v: parseInt(this.jsonDataKasusUmur[filter].anak.perempuan.bawah_1), f: parseInt(this.jsonDataKasusUmur[filter].anak.perempuan.bawah_1).toString() }
              ]
            }
          ]
        }

        let maxAnak = 0
        let ascAnak = 0
        // find max count for scala
        for (let j = 0; j < self.barChartAnakUmurJenisKelaminData.rows.length; j++) {
          if (self.barChartAnakUmurJenisKelaminData.rows[j].c[2].v > maxAnak) {
            maxAnak = self.barChartAnakUmurJenisKelaminData.rows[j].c[2].v
          }
          if (self.barChartAnakUmurJenisKelaminData.rows[j].c[1].v * -1 > maxAnak) {
            maxAnak = self.barChartAnakUmurJenisKelaminData.rows[j].c[1].v * -1
          }
          ascAnak = Math.ceil(maxAnak / 4)
          self.barChartAnakUmurJenisKelaminOptions.hAxis.viewWindow.min = (maxAnak + asc) * -1
          self.barChartAnakUmurJenisKelaminOptions.hAxis.viewWindow.max = maxAnak + asc
        }

        // set number of scala
        self.barChartAnakUmurJenisKelaminOptions.hAxis.ticks = []
        if (maxAnak > 0) {
          ascAnak = Math.ceil(maxAnak / 4)
          for (let k = 0; k <= maxAnak + ascAnak; k = k + ascAnak) {
            self.barChartAnakUmurJenisKelaminOptions.hAxis.ticks.push({ v: k * -1, f: k.toString() })
          }
          for (let k = 0; k <= maxAnak + ascAnak; k = k + ascAnak) {
            self.barChartAnakUmurJenisKelaminOptions.hAxis.ticks.push(k)
          }
        } else {
          self.barChartAnakUmurJenisKelaminOptions.hAxis.ticks.push({ v: 0, f: '0' })
          self.barChartAnakUmurJenisKelaminOptions.hAxis.ticks.push(0)
        }
      }
    },
    // get data
    getDataKasusUmur () {
      this.$store.dispatch('data-kasus-umur-v2/getItems')
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
  padding: 0px;
  margin-right: 20px;
}

.button-selector{
  padding-top: 0rem;
  padding-bottom: 0rem;
  height: 30px;
  margin-right: 10px;
  border-radius: 0px;
}
</style>
