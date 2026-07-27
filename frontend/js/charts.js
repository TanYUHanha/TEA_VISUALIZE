/**
 * 霸王茶姬销量数据分析 - ECharts 图表
 */

const purple = "#7c3aed";
const orange = "#f97316";
const palette = ["#7c3aed","#f97316","#06b6d4","#10b981","#f43f5e","#8b5cf6","#eab308","#ec4899","#14b8a6","#6366f1"];

function fmt(n) { return n == null ? "--" : Number(n).toLocaleString("zh-CN"); }

// ── KPI ────────────────────────────────────────
fetch("/api/summary").then(r=>r.json()).then(d=>{
    document.querySelector("#kpi-qty .kpi-value").textContent = fmt(d.total_qty);
    document.querySelector("#kpi-rev .kpi-value").textContent = fmt(d.total_revenue);
    document.querySelector("#kpi-records .kpi-value").textContent = fmt(d.total_records);
    document.querySelector("#kpi-member .kpi-value").textContent = d.avg_member != null ? d.avg_member.toFixed(1) + "%" : "--";
});

// ── 月度趋势 ──────────────────────────────────
fetch("/api/monthly").then(r=>r.json()).then(d=>{
    const c = echarts.init(document.getElementById("chart-monthly"));
    c.setOption({
        tooltip: { trigger: "axis" },
        legend: { data: ["销量(杯)", "营收(元)"] },
        xAxis: { type: "category", data: d.map(r=>r.month), axisLabel:{rotate:30} },
        yAxis: [
            { type: "value", name: "销量" },
            { type: "value", name: "营收" }
        ],
        series: [
            { name:"销量(杯)", type:"line", data:d.map(r=>r.qty), smooth:true, itemStyle:{color:purple} },
            { name:"营收(元)", type:"bar", yAxisIndex:1, data:d.map(r=>r.revenue), itemStyle:{color:orange}, barWidth:24 }
        ],
        grid: { left:60, right:60, bottom:50, top:50 }
    });
    window.addEventListener("resize", ()=>c.resize());
});

// ── 产品排名 ──────────────────────────────────
fetch("/api/product_rank").then(r=>r.json()).then(d=>{
    const c = echarts.init(document.getElementById("chart-product"));
    c.setOption({
        tooltip: { trigger:"axis" },
        xAxis: { type:"value" },
        yAxis: { type:"category", data:d.map(r=>r.product).reverse(), axisLabel:{width:80,overflow:"truncate"} },
        series: [{ type:"bar", data:d.map(r=>r.qty).reverse(), itemStyle:{color:purple}, barWidth:18, label:{show:true,position:"right",formatter:"{c}"} }],
        grid: { left:110, right:60, top:10, bottom:20 }
    });
    window.addEventListener("resize", ()=>c.resize());
});

// ── 类别饼图 ──────────────────────────────────
fetch("/api/category_pie").then(r=>r.json()).then(d=>{
    const c = echarts.init(document.getElementById("chart-category"));
    c.setOption({
        tooltip: { trigger:"item", formatter:"{b}: {c}杯 ({d}%)" },
        series: [{
            type:"pie", radius:["40%","70%"], center:["50%","55%"],
// radius: ["40%", "70%"]
// 饼图的半径。数组表示内半径和外半径，形成一个环形图（甜甜圈图）。
// 内半径 40%，外半径 70%，使中间留有空白区域，视觉效果更现代。
// center: ["50%", "55%"]
// 饼图的圆心位置。
// "50%" — 水平方向居中
// "55%" — 垂直方向略偏下（留出上方空间给标题或图例），单位相对于容器高宽比例。
            data: d.map((r,i)=>({ name:r.category, value:r.qty, itemStyle:{color:palette[i]} })),
            label: { formatter:"{b}\n{d}%" }
        }]
    });
    window.addEventListener("resize", ()=>c.resize());
});

// ── 城市排名 ──────────────────────────────────
fetch("/api/city_rank").then(r=>r.json()).then(d=>{
    const c = echarts.init(document.getElementById("chart-city"));
    c.setOption({
        tooltip: { trigger:"axis" },
        xAxis: { type:"category", data:d.map(r=>r.city), axisLabel:{rotate:35} },
        yAxis: { type:"value", name:"营收(元)" },
        series: [{ type:"bar", data:d.map(r=>r.revenue), itemStyle:{color:purple}, barWidth:20, label:{show:true,position:"top",fontSize:10} }],
        grid: { left:60, right:20, bottom:50, top:30 }
    });
    window.addEventListener("resize", ()=>c.resize());
});

// ── 季节对比 ──────────────────────────────────
fetch("/api/season").then(r=>r.json()).then(d=>{
    const c = echarts.init(document.getElementById("chart-season"));
    const order = ["春季","夏季","秋季","冬季"];
    d.sort((a,b)=>order.indexOf(a.season)-order.indexOf(b.season));
    c.setOption({
        tooltip: { trigger:"axis" },
        xAxis: { type:"category", data:d.map(r=>r.season) },
        yAxis: { type:"value" },
        series: [{
            type:"bar", data:d.map((r,i)=>({ value:r.qty, itemStyle:{color:palette[i]} })),
            barWidth:40, label:{show:true,position:"top",formatter:"{c}杯"}
        }],
        grid: { left:60, right:20, bottom:20, top:30 }
    });
    window.addEventListener("resize", ()=>c.resize());
});

// ── 天气影响 ──────────────────────────────────
fetch("/api/weather").then(r=>r.json()).then(d=>{
    const c = echarts.init(document.getElementById("chart-weather"));
    c.setOption({
        tooltip: { trigger:"axis" },
        xAxis: { type:"category", data:d.map(r=>r.weather) },
        yAxis: { type:"value", name:"平均销量" },
        series: [{ type:"bar", data:d.map((r,i)=>({ value:Math.round(r.avg_qty), itemStyle:{color:palette[i%palette.length]} })), barWidth:28, label:{show:true,position:"top"} }],
        grid: { left:50, right:20, bottom:20, top:30 }
    });
    window.addEventListener("resize", ()=>c.resize());
});

// ── 营销活动 ──────────────────────────────────
fetch("/api/campaign").then(r=>r.json()).then(d=>{
    const c = echarts.init(document.getElementById("chart-campaign"));
    c.setOption({
        tooltip: { trigger:"axis" },
        xAxis: { type:"category", data:d.map(r=>r.campaign), axisLabel:{rotate:35,fontSize:11} },
        yAxis: { type:"value", name:"平均销量" },
        series: [{ type:"bar", data:d.map((r,i)=>({ value:Math.round(r.avg_qty), itemStyle:{color:palette[i%palette.length]} })), barWidth:24, label:{show:true,position:"top"} }],
        grid: { left:50, right:20, bottom:70, top:30 }
    });
    window.addEventListener("resize", ()=>c.resize());
});

// ── 热力图 ────────────────────────────────────
fetch("/api/city_product").then(r=>r.json()).then(d=>{
    const c = echarts.init(document.getElementById("chart-heatmap"));
    const max = Math.max(...d.data.map(v=>v[2]));
    c.setOption({
        tooltip: { formatter: p => `${d.cities[p.data[1]]} - ${d.products[p.data[0]]}<br/>销量: ${p.data[2]}杯` },
        xAxis: { type:"category", data:d.products, axisLabel:{rotate:30,fontSize:11}, splitArea:{show:true} },
        yAxis: { type:"category", data:d.cities, splitArea:{show:true} },
        visualMap: { min:0, max, calculable:true, orient:"horizontal", left:"center", bottom:0, inRange:{ color:["#f3e8ff",purple,"#3b0764"] } },
        series: [{ type:"heatmap", data:d.data, label:{show:true,fontSize:10}, emphasis:{itemStyle:{shadowBlur:10,shadowColor:"rgba(0,0,0,.5)"}} }],
// emphasis
// 设置鼠标悬停时的高亮样式。
// itemStyle 里：
// shadowBlur: 10 — 添加阴影模糊程度（10px），让格子看起来浮起。
// shadowColor: "rgba(0,0,0,.5)" — 半透明黑色阴影，增强立体感。
        grid: { left:80, right:20, bottom:90, top:10 }
    });
    window.addEventListener("resize", ()=>c.resize());
});

// ── 节假日对比 ────────────────────────────────
fetch("/api/holiday").then(r=>r.json()).then(d=>{
    const c = echarts.init(document.getElementById("chart-holiday"));
    c.setOption({
        tooltip: { trigger:"axis" },
        legend: { bottom:0 },
        xAxis: { type:"category", data:d.map(r=>r.is_holiday==="是"?"节假日":"工作日") },
        yAxis: [
            { type:"value", name:"平均销量" },
            { type:"value", name:"平均营收" }
        ],
        series: [
            { name:"平均销量", type:"bar", data:d.map(r=>Math.round(r.avg_qty)), itemStyle:{color:purple}, barWidth:36 },
            { name:"平均营收", type:"bar", yAxisIndex:1, data:d.map(r=>Math.round(r.avg_revenue)), itemStyle:{color:orange}, barWidth:36 }
        ],
        grid: { left:60, right:60, bottom:30, top:30 }
    });
    window.addEventListener("resize", ()=>c.resize());
});

// ── 折扣分析 ──────────────────────────────────
fetch("/api/discount").then(r=>r.json()).then(d=>{
    const c = echarts.init(document.getElementById("chart-discount"));
    c.setOption({
        tooltip: { trigger:"axis" },
        xAxis: { type:"category", data:d.map(r=> r.discount===0?"原价":Math.round((1-r.discount)*10)+"折"), axisLabel:{rotate:20} },
        yAxis: { type:"value", name:"平均销量" },
        series: [{ type:"bar", data:d.map((r,i)=>({ value:Math.round(r.avg_qty), itemStyle:{color:palette[i]} })), barWidth:36, label:{show:true,position:"top"} }],
        grid: { left:50, right:20, bottom:30, top:30 }
    });
    window.addEventListener("resize", ()=>c.resize());
});

