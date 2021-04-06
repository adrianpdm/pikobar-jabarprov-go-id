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
            <th rowspan="2" class="px-2 py-1 hover:opacity-75" style="background-color: #EBEBEB; color: #5F5F5F; text-align: left; padding-left:20px;width: 19%" @click="onClickSort('region')">
              Nama {{ parentLabel[activeRegionCategory].label }}
              <font-awesome-icon :icon="getSortIcon('region')" />
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #009edc; color: #ffffff;">
              ODP
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #fdc74a; color: #ffffff;">
              PDP
            </th>
          </tr>
          <tr>
            <th
              :key="0"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 10%;"
              :style="{backgroundColor: '#008ec6' || '', color: '#ffffff' || ''}"
              @click="onClickSort('suspectNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  {{ dateH1 }}
                  <font-awesome-icon :icon="getSortIcon('suspectNow')" />
                </span>
              </p>
            </th>
            <th
              :key="1"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#008ec6' || '', color: '#ffffff' || ''}"
              @click="onClickSort('suspectAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('suspectAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="2"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#008ec6' || '', color: '#ffffff' || ''}"
              @click="onClickSort('suspectTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('suspectTotal')" />
                </span>
              </p>
            </th>
            <th
              :key="3"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 10%;"
              :style="{backgroundColor: '#e3b342' || '', color: '#ffffff' || ''}"
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
              :key="4"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#e3b342' || '', color: '#ffffff' || ''}"
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
              :key="5"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#e3b342' || '', color: '#ffffff' || ''}"
              @click="onClickSort('probableTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('probableTotal')" />
                </span>
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="table-col border-b border-solid px-2 py-1" />
            <td class="table-col border-b border-solid px-2 py-1 textright">
              <b>{{ total.suspectNow.toLocaleString('id') }}</b>
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              <b>{{ total.suspectAverage.toLocaleString('id') }}</b>
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              <b>{{ total.suspectTotal.toLocaleString('id') }}</b>
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              <b>{{ total.probableNow.toLocaleString('id') }}</b>
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              <b>{{ total.probableAverage.toLocaleString('id') }}</b>
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              <b>{{ total.probableTotal.toLocaleString('id') }}</b>
            </td>
          </tr>
          <tr v-for="(row, rowIndex) in dataCase" :key="rowIndex">
            <td class="table-col border-b border-solid px-2 py-1">
              {{ row.region }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.suspectNow }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.suspectAverage }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.suspectTotal }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.probableNow }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.probableAverage }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.probableTotal }}
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
  name: 'UnconfirmedCaseList',
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
        suspectNow: 'none',
        suspectAverage: 'none',
        suspectTotal: 'none',
        probableNow: 'none',
        probableAverage: 'none',
        probableTotal: 'none'
      },
      total: {
        suspectNow: 0,
        suspectAverage: 0,
        suspectTotal: 0,
        probableNow: 0,
        probableAverage: 0,
        probableTotal: 0
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
      return this.$store.getters['data-sebaran-pertumbuhan/itemMap']
    },
    isLoading () {
      return this.$store.getters['data-sebaran-pertumbuhan/isLoading']
    },
    metadataSebaranPertumbuhan () {
      return this.$store.getters['data-sebaran-pertumbuhan/metadata']
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
        suspectNow: 0,
        suspectAverage: 0,
        suspectTotal: 0,
        probableNow: 0,
        probableAverage: 0,
        probableTotal: 0
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
        total.suspectNow += element.odp.odp_aktif_h1
        total.suspectAverage += element.odp.odp_aktif_h7
        total.suspectTotal = element.odp.odp_aktif
        total.probableNow = element.pdp.pdp_aktif_h1
        total.probableAverage = element.pdp.pdp_aktif_h7
        total.probableTotal = element.pdp.pdp_aktif

        dataCase.push({
          region: element[nameApiRegion],
          suspectNow: element.odp.odp_aktif_h1,
          suspectAverage: element.odp.odp_aktif_h7,
          suspectTotal: element.odp.odp_aktif,
          probableNow: element.pdp.pdp_aktif_h1,
          probableAverage: element.pdp.pdp_aktif_h7,
          probableTotal: element.pdp.pdp_aktif
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

      this.$store.dispatch('data-sebaran-pertumbuhan/getItem', query)
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
</style>
