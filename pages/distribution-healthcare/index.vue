<template>
  <div class="container mx-auto">
    <br>
    <header class="m-4 mb-8 md:m-8">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="lg md:auto sm:w-auto">
          <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
            Sebaran Faskes di Jawa Barat
          </h3>
        </div>
      </div>
    </header>
    <section class="m-4 md:m-8">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="w-full mb-6 lg lg:mr-6 lg:mb-0 bg-white rounded-lg mb-8 shadow-lg">
          <div>
            <h3 class="p-5 text-lg md:text">
              <b>Peta Sebaran Faskes di Jawa Barat</b>
            </h3>
            <hr>
          </div>
          <div class="p-6">
            <MapV4SebaranFaskes />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { analytics } from '~/lib/firebase'
export default {
  components: {
    MapV4SebaranFaskes: () => import('~/components/MapV4SebaranFaskes')
  },
  mounted () {
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('dashboard_view')
      }
    })
  },
  methods: {
  },
  head () {
    const title = 'Sebaran Faskes - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>

<style>
@import "leaflet-geosearch/assets/css/leaflet.css";
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";
.bg-green-100 {
  background-color: #5aaa4e;
}
.text-white {
  color: white;
}
.btn {
  border-radius: 0.25rem;
}

.container-map {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #ffffff;
}

.filter-layer {
  position: absolute;
  top: 0px;
  right: 10px;
  padding-right: 1em;
  padding-top: 1em;
}

.filter-layer .btn {
  font-size: 0.8em;
  padding: 2px 6px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
}

.filter-data {
  background: #fff;
  margin-top: 0.5em;
  padding: 0.6em;
  border-radius: 0.6em;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
}

.filter-layer li {
  list-style: none;
  opacity: 0.4;
  padding-bottom: 0.2em;
}

.filter-layer li:hover {
  cursor: pointer;
}

.filter-active {
  opacity: 1 !important;
}

.filter-data {
  background: #fff;
  color: black;
  margin-top: 0.5em;
  padding: 0.6em;
  border-radius: 0.6em;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
}

.legend-color {
  width: 1em;
  height: 1em;
  float: left;
  border-radius: 10px;
  margin-top: 4px;
}

.legend-data {
  background: rgb(255, 255, 2555);
  margin-top: 0.5em;
  padding: 0.6em;
  /* border-radius: 0.6em; */
  /* box-shadow: 0 1px 5px rgba(0,0,0,0.65); */
  line-height: 18px;
  color: #252525;
}

.legend-data ul {
  list-style: none;
  margin-bottom: 0px;
}

.legend-data li {
  padding: 3px;
}

.legend-data i {
  width: 13px;
  height: 13px;
  float: left;
  margin-right: 8px;
  border: white 1px solid;
}

.leaflet-div-icon {
  border: none !important;
  border-radius: 20px;
}

.backdrop {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: black;
  opacity: 0.5;
  border-radius: 1em;
}

.text-disclaimer {
  top: 15%;
  width: 100%;
  position: absolute;
  text-align: center;
  color: #fff;
}

.leaflet-top .leaflet-control-geosearch.bar,
.leaflet-bottom .leaflet-control-geosearch.bar {
  display: none;
}

.leaflet-control-geosearch.bar {
  position: relative;
  display: block;
  height: auto;
  width: 400px;
  margin: 10px auto 0;
  cursor: auto;
  z-index: 1000;
}

.leaflet-control-geosearch.bar form {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.leaflet-control-geosearch.bar form input {
  min-width: 100%;
  width: 100%;
}

.leaflet-control-geosearch.bar .results.active:after {
  opacity: 0.2;
}

.leaflet-right .leaflet-control-geosearch form {
  right: 28px;
  left: initial;
  border-radius: 4px 0 0 4px;
  border-left: inherit;
  border-right: none;
}

.leaflet-control-geosearch a.reset {
  color: black;
  position: absolute;
  line-height: 30px;
  padding: 0 8px;
  right: 0;
  top: 0;
  cursor: pointer;
  border: none;
}

.leaflet-control-geosearch a.reset:hover {
  background: #f5f5f5;
}

.title-map {
  position: absolute;
  top: 0;
  color: #ffffff;
}
</style>
