<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import GrafoProva from './Prova.vue'
import GrafoProva2 from './Prova2.vue'

</script>

<template>
    
  <div>
    <div id="chart">
        <apexchart type="donut" :options="{
            chart: {
              type: 'donut',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]}" :series="[44, 55, 41, 17, 15]"></apexchart>
      </div>
  </div>
  

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Grafico prova2</template>

    <apexchart width="500" type="line" :options="{
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      }" :series="[{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]"></apexchart>
  </WelcomeItem>


  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Grafo prova 3</template>

    <template #default>
      <GrafoProva/>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Grafo prova 4</template>

    <template #default>
      <GrafoProva2 :series="[{
            name: 'Series 1',
            data: [80, 50, 30, 40, 100, 20],
          }, {
            name: 'Series 2',
            data: [20, 30, 40, 80, 20, 80],
          }, {
            name: 'Series 3',
            data: [44, 76, 78, 13, 43, 10],
          }]" :chart-options="{
            chart: {
              height: 350,
              type: 'radar',
              dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1
              }
            },
            title: {
              text: 'Radar Chart - Multi Series'
            },
            stroke: {
              width: 2
            },
            fill: {
              opacity: 0.1
            },
            markers: {
              size: 0
            },
            xaxis: {
              categories: ['2011', '2012', '2013', '2014', '2015', '2016']
            }
          }" />
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
    Discord server, or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a> and follow
    the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem>
</template>
