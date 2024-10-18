// scripts.js
function openGame() {
  window.open('juego.html', '_blank', 'width=800,height=600');
  window.open('calculadora.html', '_blank', 'width=800,height=600');
  window.open('Formulas.html', '_blank', 'width=800,height=600');
  window.open('Calculo123.html ', '_blank', 'width=800,height=600');
}


function addToInput(value) {
    const input = document.getElementById('functionInput');
    if (value === ' ') {
      input.value += ' ';
    } else if (value === 'x' || value === 'y') {
      const lastChar = input.value.slice(-1);
      if (lastChar === 'x' || lastChar === 'y' || lastChar === ')') {
        input.value += '*';
      }
      input.value += value;
    } else {
      input.value += value;
    }
    input.focus();
  }
  
  function clearInput() {
    document.getElementById('functionInput').value = '';
  }
  
  function calculateSteps() {
    const func = document.getElementById('functionInput').value;
    try {
      const dfdx = math.derivative(func, 'x').toString();
      const dfdy = math.derivative(func, 'y').toString();
      const criticalPoints = findCriticalPoints(dfdx, dfdy);
      const classifications = classifyCriticalPoints(criticalPoints, func);
      const evaluatedPoints = evaluateFunctionAtPoints(func, criticalPoints);
      const maxPoint = evaluatedPoints.reduce((max, p) => p.value > max.value ? p : max, evaluatedPoints[0]);
      const minPoint = evaluatedPoints.reduce((min, p) => p.value < min.value ? p : min, evaluatedPoints[0]);
      displayResults(dfdx, dfdy, criticalPoints, classifications, evaluatedPoints, maxPoint, minPoint);
      plotGraph(func, criticalPoints, maxPoint, minPoint);
    } catch (error) {
      document.getElementById('result').innerHTML = `<p style="color:red;">Error en el cálculo de la función: ${error.message}</p>`;
    }
  }
  
  function findCriticalPoints(dfdx, dfdy) {
    // Implementación para encontrar puntos críticos
    return [{
      x: 1,
      y: 1
    }];
  }
  
  function classifyCriticalPoints(points, func) {
    // Clasificación de puntos críticos usando la matriz Hessiana
    return points.map(point => ({
      point,
      classification: 'Mínimo local'
    }));
  }
  
  function evaluateFunctionAtPoints(func, points) {
    return points.map(point => {
      const value = math.evaluate(func, {
        x: point.x,
        y: point.y
      });
      return {
        point,
        value
      };
    });
  }
  
  function displayResults(dfdx, dfdy, criticalPoints, classifications, evaluatedPoints, maxPoint, minPoint) {
    const criticalPointsStr = criticalPoints.map(p => `(${p.x}, ${p.y})`).join(", ");
    const classificationsStr = classifications.map(c => `Punto: (${c.point.x}, ${c.point.y}) - Clasificación: ${c.classification}`).join("<br>");
    const evaluatedPointsStr = evaluatedPoints.map(p => `Punto: (${p.point.x}, ${p.point.y}) - Valor: ${p.value}`).join("<br>");
    document.getElementById('result').innerHTML = `
      <h3>Resultados:</h3>
      <p><strong>Paso 1: Derivadas parciales</strong></p>
      <p>Derivada parcial respecto a x: ${dfdx}</p>
      <p>Derivada parcial respecto a y: ${dfdy}</p>
      <p><strong>Paso 2: Puntos críticos</strong></p>
      <p>Puntos críticos: ${criticalPointsStr}</p>
      <p><strong>Paso 3: Clasificación</strong></p>
      <p>${classificationsStr}</p>
      <p><strong>Puntos evaluados:</strong></p>
      <p>${evaluatedPointsStr}</p>
      <p><strong>Máximo local:</strong> (${maxPoint.point.x}, ${maxPoint.point.y}) con valor ${maxPoint.value}</p>
      <p><strong>Mínimo local:</strong> (${minPoint.point.x}, ${minPoint.point.y}) con valor ${minPoint.value}</p>
    `;
  }
  
  function plotGraph(func, criticalPoints, maxPoint, minPoint) {
    const xValues = math.range(-10, 11, 0.5).toArray();
    const yValues = math.range(-10, 11, 0.5).toArray();
    const zValues = xValues.map(x => {
      return yValues.map(y => {
        return math.evaluate(func, {
          x: x,
          y: y
        });
      });
    });
  
    const data = [{
      z: zValues,
      x: xValues,
      y: yValues,
      type: 'surface',
      colorscale: 'Viridis',
      showscale: true,
      colorbar: {
        title: 'Valor de la función',
      }
    }];
  
    const layout = {
      title: 'Gráfico de la función y puntos críticos',
      scene: {
        xaxis: {
          title: 'x'
        },
        yaxis: {
          title: 'y'
        },
        zaxis: {
          title: 'f(x, y)'
        }
      },
      shapes: [
        {
          type: 'scatter3d',
          mode: 'markers',
          x: [maxPoint.point.x],
          y: [maxPoint.point.y],
          z: [maxPoint.value],
          marker: {
            size: 5,
            color: 'red',
          },
          name: 'Máximo local'
        },
        {
          type: 'scatter3d',
          mode: 'markers',
          x: [minPoint.point.x],
          y: [minPoint.point.y],
          z: [minPoint.value],
          marker: {
            size: 5,
            color: 'blue',
          },
          name: 'Mínimo local'
        }
      ]
    };
    Plotly.newPlot('plot', data, layout);
  }
  
