"""Recalculate Project 3 synthetic shipment KPIs using only the Python standard library."""
from pathlib import Path
from collections import defaultdict
import csv
ROOT = Path(__file__).resolve().parent
with (ROOT / "shipments.csv").open(newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))
for row in rows:
    for col in ("units", "dispatch_delay_days", "delivered_on_time", "stockout"):
        row[col] = int(row[col])
    row["shipping_cost_gbp"] = float(row["shipping_cost_gbp"])

def metrics(group):
    n = len(group)
    return dict(shipments=n,
                on_time_pct=round(100 * sum(r["delivered_on_time"] for r in group) / n, 2),
                stockout_pct=round(100 * sum(r["stockout"] for r in group) / n, 2),
                avg_shipping_gbp=round(sum(r["shipping_cost_gbp"] for r in group) / n, 2),
                units=sum(r["units"] for r in group))

def export(column, filename):
    groups = defaultdict(list)
    for r in rows:
        key = r["date"][:7] if column == "month" else r[column]
        groups[key].append(r)
    result = [{column: key, **metrics(groups[key])} for key in sorted(groups)]
    with (ROOT / filename).open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=result[0].keys())
        writer.writeheader()
        writer.writerows(result)
    return result

print("Overall KPI metrics:", metrics(rows))
print("Warehouses:", export("warehouse", "warehouse_kpis.csv"))
print("Months:", export("month", "monthly_kpis.csv"))
