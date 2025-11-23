<template>
  <div class="app-container">
    <div class="card">
      <!-- Форма занимает верхнюю 1/5 -->
      <form class="form" @submit.prevent="getResult">
        <input class="ipInput" v-model="ip" type="text" placeholder="192.168.0.1" />
        <select class="maskSelect" v-model="mask">
          <option value="" disabled>Выберите маску</option>
          <option
            v-for="subnetMask in subnetMasks"
            :key="subnetMask"
            :value="subnetMask"
          >
            {{ subnetMask }}
          </option>
        </select>
        
      </form>

      <!-- Результат слева, занимает ~1/3 ширины -->
      <div class="result-section">
        <div v-if="isIpAndMaskValid" class="result-content">
          <div>Address: {{ ip }}</div>
          <div>Mask: {{ mask }}</div>
          <div>Subnet address: {{ address }}</div>
          <div>Address count: {{ count }}</div>
        </div>
        <div v-else class="result-blank">Enter data</div>
      </div>
      <button
          :disabled="!isIpAndMaskValid"
          type="submit"
          class="btn-calculate"
        >
          Рассчитать
        </button>
        <button type="button" @click="resetForm" class="btn-reset">
          Сбросить
        </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { isIpValid, getNetworkAddress, getAddressesCount } from '@/utils/subnetUtils'

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

function resetForm() {
  ip.value = ''
  mask.value = ''
  isShowResult.value = false
}
</script>

<style>
/* Обертка для центрирования */
.app-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

/* Подложка: прямоугольник с padding: 7px */
.card {
  width: 800px;
  height: 500px;
  padding: 7px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Форма — верхняя 1/5 */
.form {
  height: 20%; /* 1/5 от общей высоты */
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 10px;
  position: relative;
}

.ipInput,
.maskSelect {
  color: blue;
}

/* Кнопки — абсолютно спозиционированы внизу формы */
.btn-calculate,
.btn-calculate {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.btn-reset {
  position: absolute;
  left: 10px;
  bottom: 10px;
}

.btn-calculate:disabled {
  cursor: not-allowed;
}

/* Результат — левая треть подложки */
.result-section {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
}

.result-content,
.result-blank {
  width: calc(100% / 3); /* ~33.3% */
  background-color: cadetblue;
  padding: 12px;
  border-radius: 4px;
  color: white;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.4;
}
</style>