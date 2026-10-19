# Supply Chain BI Dashboard — Project 3

**Interactive portfolio dashboard | JavaScript, Python, CSV | Synthetic data only**

## Overview
This browser-based business intelligence dashboard analyses **1,800 fictional 2025 UK warehouse shipments**. It runs on GitHub Pages without a server and does not require any account or paid BI software.

This is **not a Power BI report**. It demonstrates BI thinking: defining KPIs, grouping data, segment filters, trend visualisation and communicating limitations.

## Business questions
1. What share of shipments were delivered on time?
2. How does this rate vary by warehouse and month?
3. Which warehouses have a higher rate of stockout incidents?
4. What is the average shipping cost per shipment?

## Metrics for the unfiltered dataset (calculated from included CSV)
- Shipments: **1,800**
- On-time delivery rate: **71.6%**
- Stockout incident rate: **12.9%**
- Average shipping cost: **£10.55**
- Highest on-time rate warehouse: **Birmingham (71.8%)**
- Lowest on-time rate warehouse: **Bristol (70.7%)**

## Data
`shipments.csv` contains synthetic shipments with 2025 dates, four UK warehouse labels, product category, units, dispatch delay, on-time flag, stockout flag and shipping costs. No employer information, personal data or real customer data is used.

**Generating synthetic records:** fixed random seed `20261019`; simulated stockout rates vary by warehouse/category; on-time is set to true only if delay <= 2 days and no stockout. These constructed relationships are illustration only, **not observational evidence**.

## Technical implementation
- `index.html`: dashboard layout and accessible filter controls
- `dashboard.js`: warehouse/category filters, metric calculations, SVG trend chart, bar comparison, table
- `data.js`: packed shipment records generated from CSV, allowing static hosting and offline browsing
- `shipments.csv`: synthetic source data
- `analysis.py`: independent Python standard-library reproduction of dashboard summaries
- `monthly_kpis.csv`, `warehouse_kpis.csv`: validated grouped KPI exports

## Reproduce
1. Open `index.html` in a browser; filters and interactive charts run with the bundled `data.js`.
2. Run `python analysis.py` with Python 3 (no extra packages required) to regenerate summary CSVs from `shipments.csv`.
3. Host the folder as `projects/supply-chain-bi-dashboard/` within a GitHub Pages repository.

## Interpretation and limitations
The Birmingham warehouse has the highest simulated on-time rate in this dataset. This is descriptive only; real decisions would require actual SLA performance, service areas, carrier constraints, lead times, and comparable shipment mix. No causal conclusions should be drawn from the synthetic patterns.
