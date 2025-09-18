# Student Dashboard with ML Analysis 📊

## Project Overview
The **Student Dashboard** is an interactive web application built with **Next.js** that visualizes student performance and cognitive skills.

It combines:  
- **Data analysis and machine learning** (Python / Colab notebook)  
- **Interactive charts and tables** (Recharts in Next.js)  
- **Clustering students into learning personas**

The dashboard helps teachers or analysts quickly understand **student performance patterns** and **cognitive skill correlations**.

---

## Live Demo
View the deployed dashboard here:  
[https://student-dashboard-sigma-seven.vercel.app/](https://student-dashboard-sigma-seven.vercel.app/)

---

## Project Structure

student-dashboard/

├─  app/ 

│   └─  page.js             

├─  public/

│   └─  student_data.json              

├─  analysis/

│   └─  Student_Dashboard_Analysis.ipynb           

├─  package.json

├─  next.config.js

└─  README.md


**Explanation:**  
- `app/page.js` → Contains the main dashboard layout, cards, charts, and table  
- `public/student_data.json` → Sample student dataset used in the dashboard  
- `analysis/Student_Dashboard_Analysis.ipynb` → Python notebook for correlation analysis, ML prediction, and clustering  

---

## Features

### 1. Overview Section
- Displays **average scores** (assessment, comprehension, attention, focus, retention, engagement time)  
- Quick statistics for overall student performance  

### 2. Visualizations
- **Bar Chart:** Comprehension vs Assessment Score  
- **Scatter Chart:** Attention vs Performance  
- **Radar Chart (optional):** Student cognitive profile  

### 3. Student Table
- **Searchable and sortable**  
- Selecting a student updates charts dynamically  

### 4. Machine Learning Insights
- **Correlation analysis** identifies which cognitive skills influence assessment scores most  
- **Linear Regression** predicts assessment scores from cognitive skills  
- **KMeans Clustering** groups students into **learning personas**  

---

## Dataset Format

The dashboard uses `student_data.json` with the following columns:

| student_id | name  | class | comprehension | attention | focus | retention | assessment_score | engagement_time |
|------------|-------|-------|---------------|----------|-------|-----------|-----------------|----------------|
| Student_1  | Alice | 10A   | 80            | 75       | 70    | 85        | 78              | 120            |

> You can replace it with your own JSON or CSV with the same column structure.  

---

## Setup Instructions

### 1. Clone Repository

git clone https://github.com/<your-username>/student-dashboard.git

cd student-dashboard

### 2. Install Dependencies

npm install

### 3. Run Dashboard Locally

npm run dev

Open http://localhost:3000 in your browser

## ML Analysis Notebook

Location: analysis/Student_Dashboard_Analysis.ipynb

### Contains:

Data import and preprocessing

Correlation heatmap between cognitive skills and performance

Linear Regression model to predict assessment_score

KMeans Clustering for learning personas

Visualizations for clusters and skill analysis

## Key Findings
### Correlation Insights
Comprehension and Focus have the strongest positive correlation with assessment scores

Attention contributes moderately

### ML Prediction
Linear Regression predicts assessment_score using cognitive skills

R² score shows model accuracy

### Clustering
Students grouped into 3 clusters:

Cluster 0: High attention, moderate comprehension

Cluster 1: Balanced skills

Cluster 2: High comprehension & focus

Helps identify learning personas for personalized teaching strategies

## Technologies Used
Frontend: Next.js, React, Recharts

Backend/Data: JSON/CSV dataset

Data Analysis / ML: Python, Pandas, Seaborn, scikit-learn

Deployment: Vercel

## Author
Tharun. U

GitHub: https://github.com/Tharun515
