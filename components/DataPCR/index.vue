<template>
  <div
    class="pcr-main text-white overflow-hidden rounded-lg shadow-md p-5"
  >
    <div :class="isLoading ? 'block' : 'hidden'">
      <ContentLoader
        primaryColor="#67b6e3"
        secondaryColor="rgba(255,255,255,1)"
        height="80"
        width="500"
      >
        <rect
          x="0"
          y="0"
          rx="3"
          ry="3"
          width="30%"
          height="6"
        />
        <rect
          x="0"
          y="15"
          rx="3"
          ry="3"
          width="50%"
          height="6"
        />
        <rect
          x="0"
          y="25"
          rx="3"
          ry="3"
          width="50%"
          height="6"
        />
        <rect
          x="0"
          y="35"
          rx="3"
          ry="3"
          width="50%"
          height="6"
        />
        <rect
          x="0"
          y="50"
          rx="3"
          ry="3"
          width="40%"
          height="6"
        />
        <rect
          x="0"
          y="70"
          rx="3"
          ry="3"
          width="30%"
          height="6"
        />
      </ContentLoader>
    </div>
    <div :class="!isLoading ? 'block' : 'hidden'">
      <b class="text-lg">PCR (Polymerase Chain Reaction)</b>
      <div class="flex flex-col md:flex-row mb-2 mt-2">
        <div class="w-full md:w-3/6 lg:w-3/6 h-auto text-sm mr-10 mt-2">
          Polymerase Chain Reaction atau PCR merupakan pemeriksaan diagnostik yang dianggap paling akurat untuk memastikan apakah seseorang menderita COVID-19 atau tidak.<br>
          <br><b style="font-size: larger;">Disclaimer :</b><br>
          <span>Jumlah tes PCR yang ditampilkan adalah hasil pengujian di Labkes Jabar dan lab-lab satelit dalam lingkup jejaring manajemen lab di Jawa Barat. Angka belum sepenuhnya merefleksikan jumlah sampling dan orang di Jawa Barat secara <i>real-time</i>. Tim Pikobar tengah melakukan proses integrasi data dengan Allrecords TC-19 dari Pusdatin Kemenkes.</span>
          <span>
            <br>
            <br>
            Update Terakhir: {{ date_update }}
          </span>
          <br>
        </div>
        <div class="w-full md:w-3/6 lg:w-3/6 h-auto text-sm mr-10 row">
          <div class="flex flex-col md:flex-row h-auto text-left">
            <div class="w-full md:w-1/3 lg:w-1/3 pl-2 h-auto text-left">
              <div class="text-4xl">
                {{ Number(data.pcr.total).toLocaleString('id-ID') }}
              </div>
              <div class="text-sm">
                Jumlah PCR
                <div class="tooltip pl-1">
                  &#9432;
                  <span class="tooltiptext text-xs">Jumlah Polymerase Chain Reaction (PCR) yang telah dilakukan</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row h-auto text-left">
            <div class="w-full md:w-1/3 lg:w-1/3 pl-2 h-auto text-left">
              <div class="h-20 pt-3">
                <div class="mb-1">
                  <span class="text-2xl">{{ Number(data.pcr.positif).toLocaleString('id-ID') }}</span>
                  <span class="text-sm">({{ Number(data.pcr_persentase_by_total.positif.toFixed(2)).toLocaleString('id-ID') }}%)</span>
                </div>
                <div class="text-sm">
                  Positif
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 lg:w-1/3 pl-2 h-auto text-left">
              <div class="h-20 pt-3">
                <div class="mb-1">
                  <span class="text-2xl">{{ Number(data.pcr.negatif).toLocaleString('id-ID') }}</span>
                  <span class="text-sm">({{ Number(data.pcr_persentase_by_total.negatif.toFixed(2)).toLocaleString('id-ID') }}%)</span>
                </div>
                <div class="text-sm">
                  Negatif
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 lg:w-1/3 pl-2 h-auto text-left">
              <div class="h-20 pt-3">
                <div class="mb-1">
                  <span class="text-2xl">{{ Number(data.pcr.invalid).toLocaleString('id-ID') }}</span>
                  <span class="text-sm">({{ Number(data.pcr_persentase_by_total.invalid.toFixed(2)).toLocaleString('id-ID') }}%)</span>
                </div>
                <div class="text-sm">
                  Invalid
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { formatDateDayIndonesia } from '~/lib/date'

export default {
  name: 'DataPCR',
  components: {
    ContentLoader
  },
  data () {
    return {
      jsonDataKasusTotal: {},
      metadata: {},
      date_update: '',
      data: {
        pcr: {
          total: 0,
          positif: 0,
          negatif: 0,
          invalid: 0,
          jumlah_sampling: 0,
          tanggal: 0
        },
        pcr_persentase_by_total: {
          positif: 0,
          negatif: 0,
          invalid: 0
        }
      },
      showMore: true
    }
  },
  computed: {
    dataKasusTotal () {
      return this.$store.getters['data-kasus-total-v2/itemsMap']
    },
    dataKasusTotalMetadata () {
      return this.$store.getters['data-kasus-total-v2/metadataMap']
    },
    isLoading () {
      return this.$store.getters['data-kasus-total-v2/isLoading']
    }
  },
  watch: {
    dataKasusTotal (val) {
      this.jsonDataKasusTotal = val[0]
      this.data.pcr.total = this.jsonDataKasusTotal.pcr_total
      this.data.pcr.positif = this.jsonDataKasusTotal.pcr_positif
      this.data.pcr.negatif = this.jsonDataKasusTotal.pcr_negatif
      this.data.pcr.invalid = this.jsonDataKasusTotal.pcr_invalid
      this.data.pcr_persentase_by_total.positif = this.data.pcr.positif / this.data.pcr.total * 100
      this.data.pcr_persentase_by_total.negatif = this.data.pcr.negatif / this.data.pcr.total * 100
      this.data.pcr_persentase_by_total.invalid = this.data.pcr.invalid / this.data.pcr.total * 100
    },
    dataKasusTotalMetadata (val) {
      this.metadata = val
      this.date_update = formatDateDayIndonesia(this.metadata.last_update)
    }
  },
  mounted () {
  },
  methods: {
    clickShowMore () {
      this.showMore = !this.showMore
    }
  }
}

</script>

<style scoped>
  .pcr-main {
    background-color: #41A5DE;
  }
  /* Tooltip container */
  .tooltip {
    position: absolute;
    display: inline-block;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: white;
    color:#000;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
     width: 120px;
    top: 100%;
    left: 50%;
    margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14)
  }

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    bottom: 100%;  /* At the top of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
