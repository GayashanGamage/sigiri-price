<template>
    <div class="w-[200px] h-[200px]">
        <button @click="loadChart">Click me</button>
        <div>
            <div>
                <div>
                    <canvas ref="chartCanvas"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Chart } from 'chart.js';
import { ref } from 'vue';

const chartCanvas = ref(null);

const loadChart = () => {
    new Chart(chartCanvas.value, {
        type: 'line',
        data: {
            labels: [2,3,54,5,20],
            datasets: [{
                label: [10, 20, 30, 40, 50],
                data: [65, 59, 80, 81, 56],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
            }
    })
}

</script>