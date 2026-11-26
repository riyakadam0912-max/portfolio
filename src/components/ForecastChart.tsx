import { useEffect, useRef } from 'react'
import { LineChart } from 'echarts/charts'
import { AriaComponent, GridComponent, MarkLineComponent, TooltipComponent } from 'echarts/components'
import { init, use, type ECharts, type EChartsCoreOption } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'

use([LineChart, GridComponent, TooltipComponent, MarkLineComponent, AriaComponent, SVGRenderer])

const days = ['Jul 01', 'Jul 04', 'Jul 07', 'Jul 10', 'Jul 13', 'Jul 16', 'Jul 19', 'Jul 22', 'Jul 25', 'Jul 28']
const actual = [118, 124, 121, 137, 145, 151, null, null, null, null]
const forecast = [null, null, null, null, null, 151, 158, 164, 161, 172]

export default function ForecastChart() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const chart: ECharts = init(containerRef.current, undefined, { renderer: 'svg' })
    const option: EChartsCoreOption = {
      animation: !reduceMotion,
      animationDuration: 650,
      aria: { enabled: true, decal: { show: false }, description: 'Synthetic daily FMCG demand. Actual demand rises from 118 to 151 units, followed by a forecast reaching 172 units.' },
      grid: { left: 48, right: 20, top: 32, bottom: 42 },
      tooltip: { trigger: 'axis', valueFormatter: (value: unknown) => `${value} units` },
      xAxis: { type: 'category', boundaryGap: false, data: days, axisLine: { lineStyle: { color: '#9d8f91' } }, axisLabel: { color: '#71686a', hideOverlap: true } },
      yAxis: { type: 'value', min: 100, name: 'Units', nameTextStyle: { color: '#71686a' }, axisLabel: { color: '#71686a' }, splitLine: { lineStyle: { color: '#e2d8ce' } } },
      series: [
        { name: 'Actual', type: 'line', data: actual, symbolSize: 7, lineStyle: { width: 3, color: '#231f20' }, itemStyle: { color: '#231f20' }, emphasis: { focus: 'series' } },
        { name: 'Forecast', type: 'line', data: forecast, symbolSize: 7, lineStyle: { width: 3, type: 'dashed', color: '#74324f' }, itemStyle: { color: '#74324f' }, emphasis: { focus: 'series' }, markLine: { silent: true, symbol: 'none', label: { formatter: 'Forecast begins', color: '#74324f', position: 'insideEndTop' }, lineStyle: { color: '#74324f', type: 'dotted', width: 2 }, data: [{ xAxis: 'Jul 16' }] } },
      ],
    }
    chart.setOption(option)
    const observer = new ResizeObserver(() => chart.resize())
    observer.observe(containerRef.current)
    return () => { observer.disconnect(); chart.dispose() }
  }, [])

  return (
    <section className="forecast-figure" aria-labelledby="forecast-title">
      <div className="forecast-heading"><div><p className="eyebrow">Interactive forecast</p><h3 id="forecast-title">Actual demand, then what comes next.</h3></div><div className="forecast-legend" aria-label="Chart legend"><span><i className="actual-key" />Actual</span><span><i className="forecast-key" />Forecast</span></div></div>
      <p className="forecast-summary">Synthetic daily units show demand rising from 118 to 151 before the forecast cutoff, then trending toward 172 units with a small mid-horizon dip.</p>
      <div ref={containerRef} className="forecast-chart" role="img" aria-label="Synthetic actual and forecast FMCG demand line chart. Hover or focus points for values." />
      <details className="forecast-data"><summary>Read the synthetic data</summary><table><thead><tr><th>Date</th><th>Actual units</th><th>Forecast units</th></tr></thead><tbody>{days.map((day, index) => <tr key={day}><th>{day}</th><td>{actual[index] ?? '—'}</td><td>{forecast[index] ?? '—'}</td></tr>)}</tbody></table></details>
    </section>
  )
}
