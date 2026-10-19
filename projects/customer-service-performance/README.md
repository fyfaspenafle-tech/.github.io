# Customer Service Performance Analysis

**Portfolio Project 2 — Python, pandas and matplotlib**

A reproducible analysis of **1,000 entirely synthetic support tickets** dated January–June 2026. No employer, customer, or personal data is used. This is a demonstration project, not real workplace experience.

## Questions
- What percentage of tickets were resolved?
- How long did resolution take on average?
- How does resolution time vary by contact channel?
- What is the average satisfaction score among responses?

## Verified results
- Tickets: **1,000**
- Resolution rate: **89.1%**
- Mean resolution time: **11.16 hours**
- Mean satisfaction among recorded responses: **3.06/5**
- Fastest channel by average resolution time: **Phone (7.22 hours)**

## Method
Load `tickets.csv` with pandas, coerce blank satisfaction entries to missing, calculate grouped KPIs, and render a matplotlib bar chart. Satisfaction excludes missing answers rather than treating them as zero.

## Reproduce
Install Python with `pandas` and `matplotlib`, then run `python analysis.py` from any directory. The script creates `channel_summary.csv` and `resolution_by_channel.png` in its own directory.

## Files
- `tickets.csv` — synthetic source dataset
- `analysis.py` — fully reproducible Python analysis
- `channel_summary.csv` — aggregated results
- `resolution_by_channel.png` — chart generated from data
- `index.html` — GitHub Pages project webpage

## Interpretation
Different channels have different average resolution times in this *simulated* dataset. This is descriptive, not evidence that one channel causes faster resolutions. A real business would also examine ticket complexity and staffing before making operational decisions.
