-- Dataset: synthetic e-commerce orders, generated for this portfolio.
-- Revenue is counted only for completed orders. Returns/cancellations excluded.

-- 1. Overall performance
SELECT COUNT(*) AS completed_orders,
       ROUND(SUM(order_value_gbp),2) AS revenue_gbp,
       ROUND(AVG(order_value_gbp),2) AS average_order_value_gbp
FROM sales WHERE order_status = 'Completed';

-- 2. Monthly sales trend
SELECT SUBSTR(order_date,1,7) AS month,
       COUNT(*) AS completed_orders,
       ROUND(SUM(order_value_gbp),2) AS revenue_gbp
FROM sales WHERE order_status = 'Completed'
GROUP BY SUBSTR(order_date,1,7) ORDER BY month;

-- 3. Product category contribution
SELECT category, COUNT(*) AS orders,
       ROUND(SUM(order_value_gbp),2) AS revenue_gbp
FROM sales WHERE order_status = 'Completed'
GROUP BY category ORDER BY revenue_gbp DESC;

-- 4. Regional performance
SELECT region, COUNT(*) AS orders,
       ROUND(SUM(order_value_gbp),2) AS revenue_gbp
FROM sales WHERE order_status = 'Completed'
GROUP BY region ORDER BY revenue_gbp DESC;

-- 5. Order status quality check
SELECT order_status, COUNT(*) AS orders,
       ROUND(100.0*COUNT(*)/(SELECT COUNT(*) FROM sales),2) AS pct_orders
FROM sales GROUP BY order_status ORDER BY orders DESC;
