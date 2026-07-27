**Project Overview**

This project is a **Chagee Sales Data Analysis and Visualization Platform** adopting an **integrated frontend-backend** architecture: Python Flask serves as the backend while also hosting static frontend files; the frontend renders multi-dimensional sales charts via ECharts. The dataset covers **15 cities** and **8 real in‑menu products** with full-year 2025 sales records, incorporating multiple analytical dimensions such as weather, season, holidays, marketing campaigns, and member share.

**Main Features**

| Module | Description |
| ------ | ----------- |
| **KPI Dashboard** | Four core metrics: total sales volume, total revenue, record count, and average member share |
| **Monthly Trends** | Dual‑axis chart (line + bar) showing sales and revenue trends across the year |
| **Product Ranking** | Horizontal bar chart comparing annual total sales by product |
| **Category Share** | Donut pie chart displaying sales distribution across four major categories |
| **City Ranking** | Bar chart ranking revenue across 15 cities |
| **Seasonal Comparison** | Sales differences across the four seasons |
| **Weather Impact** | Average sales comparison under different weather conditions |
| **Marketing Campaigns** | Average sales performance during various campaign types |
| **City × Product Heatmap** | 2D heatmap visualizing cross‑sales between cities and products |
| **Holiday Comparison** | Dual‑dimension comparison of sales and revenue between holidays and weekdays |
| **Discount Analysis** | Impact of different discount levels on sales |

**Tech Stack**

| Technology | Role |
| ---------- | ---- |
| **Python 3** | Runtime environment |
| **Flask 3** | Backend framework providing REST APIs and hosting frontend static assets |
| **SQLite** | Lightweight embedded database (no separate installation required; automatically created on application startup) |
| **CSV** | Raw data source, imported into SQLite once at startup |
| **HTML5 / CSS3** | Frontend page structure and styling |
| **ECharts 5** | Baidu open‑source charting library, loaded via CDN, rendering all visualisations |
| **Fetch API** | Native browser HTTP requests (no additional dependencies) to call backend APIs for data |

**Project Structure**

```
bawangchaji-viz/
├── backend/
│   └── app.py                # Flask backend (API + static hosting)
├── data/
│   └── bawangchaji_sales.csv   # Raw sales data
├── frontend/
│   ├── index.html              # Main page
│   ├── css/
│   │   └── style.css           # Stylesheet
│   └── js/
│       └── charts.js           # ECharts chart logic
│   
└── requirements.txt            # Python dependencies
```
<img width="1312" height="1097" alt="image" src="https://github.com/user-attachments/assets/4948d9e9-7ea6-456b-a2bb-c0fe4ed05a0f" />
