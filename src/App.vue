<template>
  <div class="app-container">
    <form class="form" @submit.prevent="getResult">
      <div class="result-and-input-row">
        <div class="input-column">
          <UiField label="Ip Address">
            <UiInput class="ipInput" v-model="ip" placeholder="192.168.0.1" @input="onInputChange" />
          </UiField>
          <UiSelect class="maskSelect" v-model="mask" :options="subnetMasks" placeholder="Mask change..." />
        </div>
        
        <div class="result-section">
          <div v-if="isIpAndMaskValid && isShowResult" class="result-content">
            <div>Address: {{ ip }}</div>
            <div>Mask: {{ mask }}</div>
            <div>Subnet address: {{ address }}</div>
            <div>Address count: {{ count }}</div>
          </div>
          <div v-else class="result-blank">Enter IPv4 data</div>
        </div>
      </div>
      <div class="btn-row">
        <UiButton :disabled="!isIpAndMaskValid" type="submit" layout="primary" 
          @click.prevent="getResult" class="btn-calculate" >
            Рассчитать
        </UiButton>
          <UiButton type="button" layout="secondary" @click="resetForm" class="btn-reset" >
            Сбросить
          </UiButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { isIpValid, getNetworkAddress, getAddressesCount } from '@/utils/subnetUtils'
import UiInput from './components/UiInput.vue'
import UiSelect from './components/UiSelect.vue'
import UiButton from './components/UiButton.vue'
import UiField from './components/UiField.vue'

const ip = ref('')
const mask = ref('')
const isShowResult = ref(false)

const subnetMasks = [
  "0.0.0.0", "128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0",
  "248.0.0.0", "252.0.0.0", "254.0.0.0", "255.0.0.0", "255.128.0.0",
  "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0",
  "255.252.0.0", "255.254.0.0", "255.255.0.0", "255.255.128.0",
  "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0",
  "255.255.252.0", "255.255.254.0", "255.255.255.0", "255.255.255.128",
  "255.255.255.192", "255.255.255.224", "255.255.255.240",
  "255.255.255.248", "255.255.255.252", "255.255.255.254",
  "255.255.255.255"
]

const isIpAndMaskValid = computed(() => isIpValid(ip.value) && !!mask.value)

const address = computed(() => getNetworkAddress(ip.value, mask.value))
const count = computed(() => getAddressesCount(mask.value))

function getResult() {
  isShowResult.value = true
}
function onInputChange() {
  isShowResult.value = false
}

function resetForm() {
  ip.value = ''
  mask.value = ''
}
</script>

<style scooped>
:root{
    --color-primary: #1a77a3;
    --color-primary-dark: #288d9a;
    --color-primary-light: #74c6d1;
    --color-white: #ffffff;
    --color-gray-light: #e3e3e3;
    --color-gray: #b2b2b2;
    --color-gray-dark: #777777;
    --color-gray-darker: #242424;
    --color-black: #000000;
}

.app-container {
  display: flex;
  justify-content: center;
}

.form {
  width: 500px;
  height: 300px;
  padding: 45px;
  background-color: var(--color-gray-darker);
  border: 5px solid var(--color-gray-light);
  border-radius: 15px;
}

.result-and-input-row{
  display: flex;
  flex-direction: row-reverse;
  gap: 79px;
}

.input-column{
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.ipInput{
  display: flex;
  flex-direction: column;
  font-size: 20px;
}

.maskSelect {
  display: flex;
  flex-direction: column;
  font-size: 20px;
}

.result-section {
  width: 220px;
  height: 220px;
  text-align: left;
  background-color: var(--color-primary-dark);
  padding: 12px;
  border-radius: 4px;
  color: var(--color-white);
  font-family: monospace;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
}
.result-blank{
  text-align: center;
  padding: 95px 0;
}
.result-content{
  padding: 10px;
}

.btn-row{
  padding: 30px 0px;
  display: flex;
  flex-direction: row-reverse;
  gap: 266px;
  
}
.btn-calculate {
  font-size: 18px;
  display: flex;
  flex-direction: row;
}

.btn-reset {
  font-size: 18px;
  display: flex;
  flex-direction: row;
}

.btn-calculate:disabled {
  cursor: not-allowed;
}

</style>