"""Reproducible customer support KPI analysis. Synthetic data only."""
from pathlib import Path
import pandas as pd
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parent
df = pd.read_csv(ROOT / "tickets.csv", parse_dates=["date"])
df["csat"] = pd.to_numeric(df["csat"], errors="coerce")
print("Tickets:", len(df))
print("Resolution rate:", round(df.resolved.mean() * 100, 1), "%")
print("Average resolution hours:", round(df.resolution_hours.mean(), 2))
print("Average CSAT (answered only):", round(df.csat.mean(), 2))
summary = df.groupby("channel").agg(tickets=("ticket_id", "count"), resolution_rate=("resolved", "mean"), avg_resolution_hours=("resolution_hours", "mean"), avg_csat=("csat", "mean"))
summary.to_csv(ROOT / "channel_summary.csv")
print(summary.round(2))
fig, ax = plt.subplots(figsize=(8, 4.5))
summary["avg_resolution_hours"].plot(kind="bar", ax=ax)
ax.set_title("Average resolution time by channel")
ax.set_ylabel("Hours")
ax.set_xlabel("Channel")
plt.xticks(rotation=0)
plt.tight_layout()
fig.savefig(ROOT / "resolution_by_channel.png", dpi=160)
