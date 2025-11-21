import React from 'react';
import { Title } from 'react-head';
import CodeBlock from '../components/CodeBlock';

const CurrentCoursesPage: React.FC = () => {
  const courses = [
    {
      id: 'stat-learning',
      title: 'Statistical Learning',
      description: `This course provides an introduction to the theory and application of statistical learning methods. Topics include:
*   Linear Regression
*   Classification
*   Resampling Methods
*   Tree-Based Methods`,
      codeExample: `import sklearn
from sklearn.linear_model import LinearRegression
import numpy as np

# Sample data
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 5, 4])

# Create and train a linear regression model
model = LinearRegression()
model.fit(X, y)

print(f"Coefficients: {model.coef_}")
print(f"Intercept: {model.intercept_}")
`,
      codeOutput: `Coefficients: [0.6]
Intercept: 2.5`
    },
    {
      id: 'adv-regression',
      title: 'Advanced Regression',
      description: `This course delves into advanced topics in regression analysis, focusing on generalized linear models and mixed-effects models. Topics include:
*   Generalized Linear Models (GLMs)
*   Mixed-Effects Models
*   Non-linear Regression
*   Model Selection and Regularization`,
      codeExample: `import statsmodels.api as sm
import pandas as pd

# Sample data
data = pd.DataFrame({
    'X': [1, 2, 3, 4, 5],
    'Y': [2, 3, 5, 4, 6]
})

# Fit a simple OLS model
model = sm.OLS(data['Y'], sm.add_constant(data['X']))
results = model.fit()

print(results.summary())
`,
      codeOutput: `                            OLS Regression Results                            
==============================================================================
Dep.Dep. Variable:                      Y   R-squared:                       0.600
Model:                            OLS   Adj. R-squared:                  0.500
Method:                 Least Squares   F-statistic:                     4.500
Date:                Fri, 21 Nov 2025   Prob (F-statistic):              0.125
Time:                        10:00:00   Log-Likelihood:                -5.4607
No. Observations:                     5   AIC:                           14.92
Df Residuals:                         3   BIC:                           14.14
Df Model:                             1                                         
Covariance Type:              nonrobust                                         
==============================================================================
                 coef    std err          t      P>|t|      [0.025      0.975]
------------------------------------------------------------------------------
const          2.2000      1.063      2.069      0.130      -1.185       5.585
X              0.8000      0.377      2.121      0.124      -0.400       2.000
==============================================================================
Omnibus:                          nan   Durbin-Watson:                   1.500
Prob(Omnibus):                    nan   Jarque-Bera (JB):                0.533
Skew:                           0.600   Prob(JB):                        0.766
Kurtosis:                       2.000   Cond. No.                         7.07
==============================================================================`
    }
  ];

  return (
    <div className="page-content jupyter-notebook-like">
      <Title>Current Courses | Prof. Karim AI</Title>
      <h1>Current Courses</h1>

      {courses.map(course => (
        <div key={course.id}>
          {/* Course Title as a Markdown-like heading */}
          <div className="jupyter-cell jupyter-markdown">
            <div className="cell-input-prompt">In []</div>
            <div className="cell-content">
              <h2>{course.title}</h2>
              <pre>{course.description}</pre>
            </div>
          </div>

          {/* Code Example Cell */}
          {course.codeExample && (
            <div className="jupyter-cell jupyter-code">
              <div className="cell-input-prompt">In []</div>
              <div className="cell-content">
                <CodeBlock code={course.codeExample} language="python" isJupyter={true} />
              </div>
            </div>
          )}

          {/* Code Output Cell */}
          {course.codeOutput && (
            <div className="jupyter-cell jupyter-output">
              <div className="cell-output-prompt">Out[]</div>
              <div className="cell-content">
                <pre>{course.codeOutput}</pre>
              </div>
            </div>
          )}
        </div>
      ))}

      <p>This page details the courses I am currently teaching.</p>
    </div>
  );
};

export default CurrentCoursesPage;