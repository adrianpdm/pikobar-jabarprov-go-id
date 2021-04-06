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
      <table class="table w-full border-t border-solid border-gray-300 tableFixHead">
        <thead class="select-none">
          <tr>
            <th rowspan="2" class="px-2 py-1 hover:opacity-75" style="background-color: #EBEBEB; color: #5F5F5F; text-align: left; padding-left:20px;width: 19%" @click="onClickSort('region')">
              Nama {{ parentLabel[activeRegionCategory].label }}
              <font-awesome-icon :icon="getSortIcon('region')" />
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #4b56b2; color: #ffffff;">
              Terkonfirmasi
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #FF4A4B; color: #ffffff;">
              Positif Aktif
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #03B167; color: #ffffff;">
              Sembuh
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #B80000; color: #ffffff;">
              Meninggal
            </th>
          </tr>
          <tr>
            <th
              :key="0"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 7%;"
              :style="{backgroundColor: '#2c347c' || '', color: '#ffffff' || ''}"
              @click="onClickSort('confirmedNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  {{ dateH1 }}
                  <font-awesome-icon :icon="getSortIcon('confirmedNow')" />
                </span>
              </p>
            </th>
            <th
              :key="1"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 6%;"
              :style="{backgroundColor: '#2c347c' || '', color: '#ffffff' || ''}"
              @click="onClickSort('confirmedAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('confirmedAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="2"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 6%;"
              :style="{backgroundColor: '#2c347c' || '', color: '#ffffff' || ''}"
              @click="onClickSort('confirmedTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('confirmedTotal')" />
                </span>
              </p>
            </th>
            <th
              :key="3"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 7%;"
              :style="{backgroundColor: '#d93f40' || '', color: '#ffffff' || ''}"
              @click="onClickSort('positiveNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  {{ dateH1 }}
                  <font-awesome-icon :icon="getSortIcon('positiveNow')" />
                </span>
              </p>
            </th>
            <th
              :key="4"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 6%;"
              :style="{backgroundColor: '#d93f40' || '', color: '#ffffff' || ''}"
              @click="onClickSort('positiveAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('positiveAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="5"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 6%;"
              :style="{backgroundColor: '#d93f40' || '', color: '#ffffff' || ''}"
              @click="onClickSort('positiveTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('positiveTotal')" />
                </span>
              </p>
            </th>
            <th
              :key="6"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 7%;"
              :style="{backgroundColor: '#039658' || '', color: '#ffffff' || ''}"
              @click="onClickSort('recoverNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  {{ dateH1 }}
                  <font-awesome-icon :icon="getSortIcon('recoverNow')" />
                </span>
              </p>
            </th>
            <th
              :key="7"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 6%;"
              :style="{backgroundColor: '#039658' || '', color: '#ffffff' || ''}"
              @click="onClickSort('recoverAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('recoverAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="8"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 6%;"
              :style="{backgroundColor: '#039658' || '', color: '#ffffff' || ''}"
              @click="onClickSort('recoverTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('recoverTotal')" />
                </span>
              </p>
            </th>
            <th
              :key="9"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 7%;"
              :style="{backgroundColor: '#9c0000' || '', color: '#ffffff' || ''}"
              @click="onClickSort('dieNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  {{ dateH1 }}
                  <font-awesome-icon :icon="getSortIcon('dieNow')" />
                </span>
              </p>
            </th>
            <th
              :key="10"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 6%;"
              :style="{backgroundColor: '#9c0000' || '', color: '#ffffff' || ''}"
              @click="onClickSort('dieAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('dieAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="11"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 6%;"
              :style="{backgroundColor: '#9c0000' || '', color: '#ffffff' || ''}"
              @click="onClickSort('dieTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('dieTotal')" />
                </span>
              </p>
            </th>
          </tr>
          <tr style="line-height: 51px;">
            <th class="table-col border-b border-solid px-2 py-1 total-row bg-white">
              <b>TOTAL KESELURUHAN</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.confirmedNow.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.confirmedAverage.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.confirmedTotal.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.positiveNow.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.positiveAverage.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.positiveTotal.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.recoverNow.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.recoverAverage.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.recoverTotal.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.dieNow.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.dieAverage.toLocaleString('id') }}</b>
            </th>
            <th class="table-col border-b border-solid px-2 py-1 textright bg-white">
              <b>{{ total.dieTotal.toLocaleString('id') }}</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in dataCase" :key="rowIndex">
            <td class="table-col border-b border-solid px-2 py-1">
              {{ row.region }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.confirmedNow.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.confirmedAverage.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.confirmedTotal.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.positiveNow.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.positiveAverage.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.positiveTotal.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.recoverNow.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.recoverAverage.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.recoverTotal.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.dieNow.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.dieAverage.toLocaleString('id') }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.dieTotal.toLocaleString('id') }}
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
  name: 'ConfirmedCaseList',
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
        region: 'none',
        confirmedNow: 'none',
        confirmedAverage: 'none',
        confirmedTotal: 'none',
        positiveNow: 'none',
        positiveAverage: 'none',
        positiveTotal: 'none',
        recoverNow: 'none',
        recoverAverage: 'none',
        recoverTotal: 'none',
        dieNow: 'none',
        dieAverage: 'none',
        dieTotal: 'none'
      },
      dataCase: [],
      dateH1: '',
      total: {
        confirmedNow: 0,
        confirmedAverage: 0,
        confirmedTotal: 0,
        positiveNow: 0,
        positiveAverage: 0,
        positiveTotal: 0,
        recoverNow: 0,
        recoverAverage: 0,
        recoverTotal: 0,
        dieNow: 0,
        dieAverage: 0,
        dieTotal: 0
      },
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
        confirmedNow: 0,
        confirmedAverage: 0,
        confirmedTotal: 0,
        positiveNow: 0,
        positiveAverage: 0,
        positiveTotal: 0,
        recoverNow: 0,
        recoverAverage: 0,
        recoverTotal: 0,
        dieNow: 0,
        dieAverage: 0,
        dieTotal: 0
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
        total.confirmedNow += element.positif.positif_total_h1
        total.confirmedAverage += element.positif.positif_total_h7
        total.confirmedTotal += element.positif.positif_total
        total.positiveNow += element.positif.positif_aktif_h1
        total.positiveAverage += element.positif.positif_aktif_h7
        total.positiveTotal += element.positif.positif_aktif
        total.recoverNow += element.positif.positif_sembuh_h1
        total.recoverAverage += element.positif.positif_sembuh_h7
        total.recoverTotal += element.positif.positif_sembuh
        total.dieNow += element.positif.positif_meninggal_h1
        total.dieAverage += element.positif.positif_meninggal_h7
        total.dieTotal += element.positif.positif_meninggal

        // data table
        dataCase.push({
          region: element[nameApiRegion],
          confirmedNow: element.positif.positif_total_h1,
          confirmedAverage: element.positif.positif_total_h7,
          confirmedTotal: element.positif.positif_total,
          positiveNow: element.positif.positif_aktif_h1,
          positiveAverage: element.positif.positif_aktif_h7,
          positiveTotal: element.positif.positif_aktif,
          recoverNow: element.positif.positif_sembuh_h1,
          recoverAverage: element.positif.positif_sembuh_h7,
          recoverTotal: element.positif.positif_sembuh,
          dieNow: element.positif.positif_meninggal_h1,
          dieAverage: element.positif.positif_meninggal_h7,
          dieTotal: element.positif.positif_meninggal
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
  thead tr:nth-child(3) th { position: sticky; top: 79px; }

  tr:nth-child(even) {background: #dfdfdf6e}
  tr:nth-child(odd) {background: #FFF}

  .textright {
    text-align: right;
  }

  .my-custom-scrollbar {
    position: relative;
    height: 565px;
    overflow-y: scroll;
  }
</style>
