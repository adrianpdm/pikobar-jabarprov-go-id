<template>
  <div>
    <div
      class="w-full pt-0 p-5"
      style="min-height: 300px;"
      :class="!isLoading?'hidden':''"
    >
      <ContentLoader
        class="w-full hidden lg:block"
        :speed="3"
        :width="400"
        :height="110"
        primary-color="#eee"
        secondary-color="#fff"
      >
        <rect
          :key="1"
          x="0"
          :y="4"
          width="100%"
          height="100"
          rx="3"
          ry="3"
        />
      </ContentLoader>
    </div>
    <div class="my-custom-scrollbar" :class="isLoading?'hidden':''">
      <table class="table w-full border-t border-solid border-gray-300 tableFixHead" :class="isLoading?'hidden':''">
        <thead class="select-none">
          <tr>
            <th rowspan="2" class="px-2 py-1 hover:opacity-75 region-col" @click="onClickSort('region')">
              Nama {{ parentLabel[activeRegionCategory].label }}
              <font-awesome-icon :icon="getSortIcon('region')" />
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75 text-white" style="background-color: #d07f21;">
              Probable
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75 text-white" style="background-color: #ecd87e;">
              Isolasi/ Dalam Perawatan
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75 text-white" style="background-color: #03B167;">
              Selesai Isolasi/Sembuh
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75 text-white" style="background-color: #B80000;">
              Meninggal
            </th>
          </tr>
          <tr>
            <th
              :key="0"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75 text-white"
              style="padding-left: 0.5em !important; width: 7%; background-color: #B0640B;"
              @click="onClickSort('probableNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  {{ dateH1 }}
                  <font-awesome-icon :icon="getSortIcon('probableNow')" />
                </span>
              </p>
            </th>
            <th
              :key="1"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75 text-white"
              style="padding-left: 0.5em !important; width: 6%; background-color: #B0640B;"
              @click="onClickSort('probableAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('probableAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="2"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75 text-white"
              style="padding-left: 0.5em !important; width: 6%; background-color: #B0640B;"
              @click="onClickSort('probableTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('probableTotal')" />
                </span>
              </p>
            </th>
            <th
              :key="3"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75 text-white"
              style="padding-left: 0.5em !important; width: 7%; background-color: #ceb546;"
              @click="onClickSort('processNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  {{ dateH1 }}
                  <font-awesome-icon :icon="getSortIcon('processNow')" />
                </span>
              </p>
            </th>
            <th
              :key="4"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75 text-white"
              style="padding-left: 0.5em !important; width: 6%; background-color: #ceb546;"
              @click="onClickSort('processAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('processAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="5"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75 text-white"
              style="padding-left: 0.5em !important; width: 6%; background-color: #ceb546;"
              @click="onClickSort('processTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('processTotal')" />
                </span>
              </p>
            </th>
            <th
              :key="6"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75 text-white"
              style="padding-left: 0.5em !important; width: 7%; background-color: #039658;"
              @click="onClickSort('finishedNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  {{ dateH1 }}
                  <font-awesome-icon :icon="getSortIcon('finishedNow')" />
                </span>
              </p>
            </th>
            <th
              :key="7"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75 text-white"
              style="padding-left: 0.5em !important; width: 6%; background-color: #039658;"
              @click="onClickSort('finishedAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('finishedAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="8"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75 text-white"
              style="padding-left: 0.5em !important; width: 6%; background-color: #039658;"
              @click="onClickSort('finishedTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('finishedTotal')" />
                </span>
              </p>
            </th>
            <th
              :key="9"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75 text-white"
              style="padding-left: 0.5em !important; width: 7%; background-color: #9c0000;"
              @click="onClickSort('diedNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  {{ dateH1 }}
                  <font-awesome-icon :icon="getSortIcon('diedNow')" />
                </span>
              </p>
            </th>
            <th
              :key="10"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75 text-white"
              style="padding-left: 0.5em !important; width: 6%; background-color: #9c0000;"
              @click="onClickSort('diedAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('diedAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="11"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75 text-white"
              style="padding-left: 0.5em !important; width: 6%; background-color: #9c0000;"
              @click="onClickSort('diedTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('diedTotal')" />
                </span>
              </p>
            </th>
          </tr>
          <tr style="line-height: 51px;">
            <th class="table-col border-b border-solid px-2 py-1 bg-white">
              <b>TOTAL KESELURUHAN</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.probableNow.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.probableAverage.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.probableTotal.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.processNow.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.processAverage.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.processTotal.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.finishedNow.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.finishedAverage.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.finishedTotal.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.diedNow.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.diedAverage.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.diedTotal.toLocaleString('id') }}</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in dataCase" :key="rowIndex">
            <td class="table-col border-b border-solid px-2 py-1">
              {{ row.region }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.probableNow.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.probableAverage.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.probableTotal.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.processNow.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.processAverage.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.processTotal.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.finishedNow.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.finishedAverage.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.finishedTotal.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.diedNow.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.diedAverage.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.diedTotal.toLocaleString('id') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import {
  faSort,
  faSortUp,
  faSortDown,
  faArrowRight,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import _orderBy from 'lodash/orderBy'
import { formatDateIndonesia } from '~/lib/date'

export default {
  name: 'ProbableCaseListIstilahBaru',
  components: {
    ContentLoader
  },
  props: {
    activeRegionId: {
      type: String,
      default: '32'
    },
    activeRegionCategory: {
      type: String,
      default: '32'
    }
  },
  data () {
    return {
      icon: {
        faSort,
        faSortUp,
        faSortDown,
        faArrowRight,
        faTimesCircle
      },
      currentSorting: {
        probableNow: 'none',
        probableAverage: 'none',
        probableTotal: 'none',
        processNow: 'none',
        processAverage: 'none',
        processTotal: 'none',
        finishedNow: 'none',
        finishedAverage: 'none',
        finishedTotal: 'none',
        diedNow: 'none',
        diedAverage: 'none',
        diedTotal: 'none'
      },
      total: {
        probableNow: 0,
        probableAverage: 0,
        probableTotal: 0,
        processNow: 0,
        processAverage: 0,
        processTotal: 0,
        finishedNow: 0,
        finishedAverage: 0,
        finishedTotal: 0,
        diedNow: 0,
        diedAverage: 0,
        diedTotal: 0
      },
      dataCase: [],
      dateH1: '',
      parentLabel: {
        kota: {
          label: 'Kota/Kabupaten'
        },
        kecamatan: {
          label: 'Kecamatan'
        },
        kelurahan: {
          label: 'Kelurahan/Desa'
        }
      }
    }
  },
  computed: {
    dataSebaranPertumbuhan () {
      return this.$store.getters['data-sebaran-pertumbuhan-v2/itemMap']
    },
    isLoading () {
      return this.$store.getters['data-sebaran-pertumbuhan-v2/isLoading']
    },
    metadataSebaranPertumbuhan () {
      return this.$store.getters['data-sebaran-pertumbuhan-v2/metadata']
    }
  },
  watch: {
    activeRegionId (newVal, oldVal) { // watch it
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.getDataSebaranPertumbuhan(this.activeRegionCategory, this.activeRegionId)
    },
    dataSebaranPertumbuhan (val) {
      let nameApiRegion = 'nama_kab'
      const dataCase = []
      const total = {
        probableNow: 0,
        probableAverage: 0,
        probableTotal: 0,
        processNow: 0,
        processAverage: 0,
        processTotal: 0,
        finishedNow: 0,
        finishedAverage: 0,
        finishedTotal: 0,
        diedNow: 0,
        diedAverage: 0,
        diedTotal: 0
      }

      if (this.activeRegionCategory === 'kelurahan') {
        nameApiRegion = 'nama_kel'
      } else if (this.activeRegionCategory === 'kecamatan') {
        nameApiRegion = 'nama_kec'
      } else {
        nameApiRegion = 'nama_kab'
      }

      val.forEach((element) => {
        // total
        total.probableNow += element.probable.probable_total_h1
        total.probableAverage += element.probable.probable_total_h7
        total.probableTotal += element.probable.probable_total
        total.processNow += element.probable.probable_diisolasi_h1
        total.processAverage += element.probable.probable_diisolasi_h7
        total.processTotal += element.probable.probable_diisolasi
        total.finishedNow += element.probable.probable_discarded_h1
        total.finishedAverage += element.probable.probable_discarded_h7
        total.finishedTotal += element.probable.probable_discarded
        total.diedNow += element.probable.probable_meninggal_h1
        total.diedAverage += element.probable.probable_meninggal_h7
        total.diedTotal += element.probable.probable_meninggal

        dataCase.push({
          region: element[nameApiRegion],
          probableNow: element.probable.probable_total_h1,
          probableAverage: element.probable.probable_total_h7,
          probableTotal: element.probable.probable_total,
          processNow: element.probable.probable_diisolasi_h1,
          processAverage: element.probable.probable_diisolasi_h7,
          processTotal: element.probable.probable_diisolasi,
          finishedNow: element.probable.probable_discarded_h1,
          finishedAverage: element.probable.probable_discarded_h7,
          finishedTotal: element.probable.probable_discarded,
          diedNow: element.probable.probable_meninggal_h1,
          diedAverage: element.probable.probable_meninggal_h7,
          diedTotal: element.probable.probable_meninggal
        })
      })

      this.total = total
      this.dataCase = dataCase

      const lastUpdate = this.metadataSebaranPertumbuhan.last_update
      this.dateH1 = formatDateIndonesia(lastUpdate)
    }
  },
  created () {
    this.dateH1 = formatDateIndonesia(new Date())
  },
  mounted () {
    this.getDataSebaranPertumbuhan(this.activeRegionCategory, this.activeRegionId)
    // console.log(this.isLoading)
  },
  methods: {
    getSortIcon (field) {
      try {
        const sortingType = this.currentSorting[field]
        switch (sortingType) {
          case 'asc':
            return this.icon.faSortUp
          case 'desc':
            return this.icon.faSortDown
          case 'none':
          default:
            return this.icon.faSort
        }
      } catch (e) {
        return this.icon.faSort
      }
    },
    onClickSort (field) {
      const currentSorting = this.currentSorting
      let sorting = 'desc'
      if (this.currentSorting[field] === 'desc') {
        sorting = 'asc'
      }

      if (this.currentSorting[field] === 'asc') {
        sorting = 'desc'
      }
      Object.keys(currentSorting).forEach(function (key) {
        currentSorting[key] = 'none'
      })

      this.currentSorting[field] = sorting

      this.dataCase = _orderBy(
        this.dataCase,
        [field],
        [sorting]
      )
    },

    // get data
    getDataSebaranPertumbuhan (region, regionCode = '') {
      let parentKeyCode = ''
      let query = 'wilayah=' + region

      switch (region) {
        case 'kecamatan' : {
          parentKeyCode = 'kode_kab'
          break
        }
        case 'kelurahan' : {
          parentKeyCode = 'kode_kec'
          break
        }
        default : parentKeyCode = ''
      }

      query += `&${parentKeyCode}=${regionCode}`

      this.$store.dispatch('data-sebaran-pertumbuhan-v2/getItem', query)
    }
  }
}
</script>
<style lang="scss" scoped>
  .table-col {
    border-color: rgba(0,0,0,0.1);
    padding-left: 1.5em !important;
  }

  .table {
    font-size: 14px;
    font-weight: 500;
  }

  thead tr:nth-child(1) th { position: sticky; top: 0; }
  thead tr:nth-child(2) th { position: sticky; top: 29px; }
  thead tr:nth-child(3) th { position: sticky; top: 79px; }

  .textright {
    text-align: right;
  }

  .my-custom-scrollbar {
    position: relative;
    height: 565px;
    overflow-y: scroll;
  }

    tr:nth-child(even) {background: #dfdfdf6e}
  tr:nth-child(odd) {background: #FFF}

  th.region-col {
    background-color: #EBEBEB; color: #5F5F5F; text-align: left; padding-left:20px;width: 19%
  }
  th.bg-color-purple {
    background-color: #4b56b2
  }

  th.bg-color-blue {
    background-color: #009edc
  }

  th.bg-color-green {
    background-color: #03B167
  }

  th.bg-color-red {
    background-color: #B80000
  }

  th.bg-color-purple-dark {
    background-color: #2c347c;
  }

  th.bg-color-blue-dark {
    background-color: #008ec6
  }

  th.bg-color-green-dark {
    background-color: #039658
  }

  th.bg-color-red-dark {
    background-color: #9c0000
  }

</style>
