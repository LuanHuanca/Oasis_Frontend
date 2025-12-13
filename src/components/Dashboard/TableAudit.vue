<template>
  <div class="dashboard">
    <div class="dashboardTitle">
      <h1 style="font-size: 34px">Dashboard</h1>

    </div>
    <div class="row">
      <div class="chart-container large">
        <canvas ref="barChart"></canvas>
      </div>
      <div class="chart-container large">
        <canvas ref="lineChart"></canvas>
      </div>
    </div>
    <div class="row">
      <div class="chart-container">
        <canvas ref="pieChart"></canvas>
      </div>
      <div class="chart-container">
        <canvas ref="doughnutChart"></canvas>
      </div>
      <div class="chart-container">
        <canvas ref="radarChart"></canvas>
      </div>
    </div>
    <div class="total-registros">
      <h2>Datos de Auditoria</h2>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Actividad</th>
          <th>Correo</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>IP</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(auditoria, index) in auditorias" :key="index">
          <td>{{ auditoria.idAudit }}</td>
          <td>{{ auditoria.actividad }}</td>
          <td>{{ auditoria.correo }}</td>
          <td>{{ auditoria.fecha }}</td>
          <td>{{ auditoria.hora }}</td>
          <td>{{ auditoria.fechaInicio }}</td>
          <td>{{ auditoria.fechaFin }}</td>
          <td>{{ auditoria.ip }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/config/api';
import Chart from 'chart.js/auto';
export default {
  name: 'TableAudit',
  mounted() {
    this.getViajes();
    this.renderBarChart();
    this.renderLineChart();
    this.renderPieChart();
    this.renderDoughnutChart();
    this.renderRadarChart();
  },
  data() {
    return {
      auditorias: [],
      viajes: [],
      vuelos: [],
      reservasHotel: [],
    };
  },
  created() {

    this.getAuditorias();
    this.getViajes();
  },
  methods: {
    async getReservasHotel() {
      try {
        const response = await axios.get(`${API_URL}/reservahotel/reservas`);
        this.reservasHotel = response.data; // Acceder a la propiedad `result` en la respuesta
        console.log('Reservas cargadas exitosamente:', this.reservasHotel);
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      }
    },
    async getVuelos() {
      try {
        const response = await axios.get(`${API_URL}/vuelo/vuelos`);
        this.vuelos = response.data; // Acceder a la propiedad `result` en la respuesta
        console.log('Vuelos cargados exitosamente:', this.vuelos);
      } catch (error) {
        console.error('Error al cargar los vuelos:', error);
      }
    },
    async getViajes() {
      try {
        const response = await axios.get(`${API_URL}/viaje/viajes`);
        this.viajes = response.data; // Acceder a la propiedad `result` en la respuesta
        console.log('Viajes cargados exitosamente:', this.viajes);
      } catch (error) {
        console.error('Error al cargar los Viajes:', error);
      }
    },
    async getAuditorias(userId) {
      try {
        const response = await axios.get(`${API_URL}/auditoria`);
        this.auditorias = response.data.result; // Acceder a la propiedad 
        // `result` en la respuesta
        console.log('Auditorias cargadas exitosamente:', this.auditorias);
      } catch (error) {
        console.error('Error al cargar las auditorias:', error);
      }
    },
    async processDataForBarChart() {
      await this.getViajes();
      //console.log("OBTENCION");
      //console.log(this.viajes);
      const ciudadDestinoCount = this.viajes.reduce((acc, viajes) => {
        acc[viajes.ciudadDestino] = (acc[viajes.ciudadDestino] || 0) + 1;
        return acc;
      }, {});

      //console.log(ciudadDestinoCount);
      //console.log(Object.keys(ciudadDestinoCount));
      //console.log(Object.values(ciudadDestinoCount));
      return {
        labels: Object.keys(ciudadDestinoCount),
        data: Object.values(ciudadDestinoCount)
      };
    },
    async processDataForLineChart() {
      await this.getViajes();
      const reservasPorMes = this.viajes.reduce((acc, viajes) => {
        const month = new Date(viajes.fecha).getMonth();
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const data = new Array(12).fill(0);
      Object.keys(reservasPorMes).forEach(month => {
        data[month] = reservasPorMes[month];
      });

      return {
        labels: months,
        data: data
      };
    },
    async processDataForPieChart() {
      await this.getViajes();
      const paisDestinoCount = this.viajes.reduce((acc, viajes) => {
        acc[viajes.paisDestino] = (acc[viajes.paisDestino] || 0) + 1;
        return acc;
      }, {});

      return {
        labels: Object.keys(paisDestinoCount),
        data: Object.values(paisDestinoCount)
      };
    },
    async processDataForDoughnutChart() {
      await this.getReservasHotel();
      const hotelCount = this.reservasHotel.reduce((acc, reservaHotel) => {
        acc[reservaHotel.hotel] = (acc[reservaHotel.hotel] || 0) + 1;
        return acc;
      }, {});

      return {
        labels: Object.keys(hotelCount),
        data: Object.values(hotelCount)
      };
    },
    async processDataForRadarChart() {
      await this.getVuelos();
      const aerolineaCount = this.vuelos.reduce((acc, vuelo) => {
        acc[vuelo.aerolinea] = (acc[vuelo.aerolinea] || 0) + 1;
        return acc;
      }, {});

      return {
        labels: Object.keys(aerolineaCount),
        data: Object.values(aerolineaCount)
      };
    },
    async renderBarChart() {
      const barChartData = await this.processDataForBarChart();
      console.log("DATOS GRAFICA BARRAS");
      console.log(barChartData);
      const ctx = this.$refs.barChart.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: barChartData.labels,
          datasets: [{
            label: 'Visitas a Ciudades Destino',
            data: barChartData.data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Visitas a Ciudades Destino',
              fontSize: 18,
              fontColor: '#333',
              padding: 20
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: '#ccc'
              },
              ticks: {
                font: {
                  size: 12
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 12
                }
              }
            }
          }
        }
      });
    },
    async renderLineChart() {
      const lineChartData = await this.processDataForLineChart();
      console.log("DATOS GRAFICA Lineas")
      console.log(lineChartData);
      const ctx = this.$refs.lineChart.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: lineChartData.labels,
          datasets: [{
            label: 'Reservas Mensuales',
            data: lineChartData.data,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Reservas Mensuales',
              fontSize: 18,
              fontColor: '#333',
              padding: 20
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: '#ccc'
              },
              ticks: {
                font: {
                  size: 12
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 12
                }
              }
            }
          }
        }
      });
    },
    async renderPieChart() {
      const pieChartData = await this.processDataForPieChart();
      const ctx = this.$refs.pieChart.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: pieChartData.labels,
          datasets: [{
            label: 'Paises Visitados',
            data: pieChartData.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(199, 199, 199, 0.6)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Paises Visitados',
              fontSize: 18,
              fontColor: '#333',
              padding: 20
            },
            legend: {
              position: 'right',
              labels: {
                font: {
                  size: 12
                }
              }
            }
          }
        }
      });
    },
    async renderDoughnutChart() {
      const doughnutChartData = await this.processDataForDoughnutChart();
      const ctx = this.$refs.doughnutChart.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: doughnutChartData.labels,
          datasets: [{
            label: 'Hoteles Más Visitados',
            data: doughnutChartData.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(199, 199, 199, 0.6)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Hoteles Más Visitados',
              fontSize: 18,
              fontColor: '#333',
              padding: 20
            },
            legend: {
              position: 'right',
              labels: {
                font: {
                  size: 12
                }
              }
            }
          }
        }
      });
    },
    async renderRadarChart() {
      const radarChartData = await this.processDataForRadarChart();
      const ctx = this.$refs.radarChart.getContext('2d');
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: radarChartData.labels,
          datasets: [{
            label: 'Cantidad de Vuelos por Aerolínea',
            data: radarChartData.data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Cantidad de Vuelos por Aerolínea',
              fontSize: 18,
              fontColor: '#333',
              padding: 20
            },
            legend: {
              display: false
            }
          },
          scales: {
            r: {
              beginAtZero: true,
              angleLines: {
                color: '#ccc'
              },
              pointLabels: {
                font: {
                  size: 12
                }
              }
            }
          }
        }
      });
    },
  },

};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
.dashboardTitle{
  display: flex;
  flex-direction: row;
  padding-bottom: 50px;
}
.dashboardTitle button{
  margin-left: 30px;
  border-radius: 20px;
  border: 2px solid black;
  padding: 10px 20px;
  background-color: rgb(84, 84, 239); 
}

.dashboard {
  width: 95%;
  margin: 20px auto;
  text-align: left;
}
.enlacerouter{
  color: #fff;
}

.total-registros {
  background-color: #FCEEDA;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
  overflow-x: auto; /* Agregar desplazamiento horizontal en pantallas pequeñas */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #FFD28E;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #FFD28E;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.chart-container {
  width: 30%;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-container.large {
  width: 45%;
}

canvas {
  width: 100% !important;
  height: auto !important;
}
</style>
