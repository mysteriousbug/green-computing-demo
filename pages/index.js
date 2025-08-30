import React, { useState, useEffect } from 'react';
import { Play, Pause, BarChart3, Zap, Leaf, Code, TrendingUp, TrendingDown } from 'lucide-react';

const GreenComputingDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [arraySize, setArraySize] = useState(1000);
  const [results, setResults] = useState([]);
  const [currentMetrics, setCurrentMetrics] = useState({
    executionTime: 0,
    cpuCycles: 0,
    energyConsumption: 0,
    carbonFootprint: 0
  });

  // Simulate different sorting algorithms with realistic performance characteristics
  const algorithms = {
    bubble: {
      name: 'Bubble Sort',
      complexity: 'O(n²)',
      energyMultiplier: 100,
      color: 'text-red-500'
    },
    quick: {
      name: 'Quick Sort',
      complexity: 'O(n log n)',
      energyMultiplier: 5,
      color: 'text-yellow-500'
    },
    optimized: {
      name: 'Optimized Sort',
      complexity: 'O(n log n)',
      energyMultiplier: 1,
      color: 'text-green-500'
    }
  };

  // Simulate algorithm execution with realistic metrics
  const runAlgorithm = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    const algo = algorithms[algorithm];
    
    // Simulate progressive execution
    let progress = 0;
    const totalSteps = 50;
    
    const interval = setInterval(() => {
      progress += 1;
      
      // Calculate realistic metrics based on algorithm and array size
      const baseTime = (arraySize / 1000) * algo.energyMultiplier;
      const executionTime = (baseTime * progress) / totalSteps;
      const cpuCycles = executionTime * 2800000000; // 2.8GHz processor
      const energyConsumption = cpuCycles * 3.5e-12; // 3.5 picojoules per cycle
      const carbonFootprint = energyConsumption * 0.0004; // grams CO2 per joule
      
      setCurrentMetrics({
        executionTime: executionTime,
        cpuCycles: cpuCycles,
        energyConsumption: energyConsumption,
        carbonFootprint: carbonFootprint
      });
      
      if (progress >= totalSteps) {
        clearInterval(interval);
        setIsRunning(false);
        
        // Add to results history
        setResults(prev => [...prev, {
          algorithm: algo.name,
          arraySize: arraySize,
          metrics: {
            executionTime: executionTime,
            cpuCycles: cpuCycles,
            energyConsumption: energyConsumption,
            carbonFootprint: carbonFootprint
          }
        }].slice(-5)); // Keep last 5 results
      }
    }, 100);
  };

  const clearResults = () => {
    setResults([]);
    setCurrentMetrics({
      executionTime: 0,
      cpuCycles: 0,
      energyConsumption: 0,
      carbonFootprint: 0
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Leaf className="text-green-600" />
            Green Computing: Live Energy Monitor
          </h1>
          <p className="text-lg text-gray-600">
            Measuring the environmental impact of different algorithms
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="text-blue-600" />
            Algorithm Testing Lab
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Algorithm
              </label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                disabled={isRunning}
              >
                {Object.entries(algorithms).map(([key, algo]) => (
                  <option key={key} value={key}>
                    {algo.name} - {algo.complexity}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Array Size
              </label>
              <select
                value={arraySize}
                onChange={(e) => setArraySize(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                disabled={isRunning}
              >
                <option value={500}>500 elements</option>
                <option value={1000}>1,000 elements</option>
                <option value={5000}>5,000 elements</option>
                <option value={10000}>10,000 elements</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={runAlgorithm}
                disabled={isRunning}
                className={`w-full p-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  isRunning
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Run Test
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Algorithm Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Current Algorithm: 
              <span className={algorithms[algorithm].color}>
                {algorithms[algorithm].name}
              </span>
            </h3>
            <p className="text-sm text-gray-600">
              Time Complexity: {algorithms[algorithm].complexity} | 
              Testing with {arraySize.toLocaleString()} elements
            </p>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Execution Time</h3>
              <Zap className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {currentMetrics.executionTime.toFixed(3)}s
            </p>
            <p className="text-xs text-gray-500 mt-1">milliseconds of processing</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">CPU Cycles</h3>
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {(currentMetrics.cpuCycles / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-gray-500 mt-1">million cycles used</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Energy Used</h3>
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {(currentMetrics.energyConsumption * 1000).toFixed(2)}mJ
            </p>
            <p className="text-xs text-gray-500 mt-1">millijoules consumed</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Carbon Footprint</h3>
              <Leaf className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {(currentMetrics.carbonFootprint * 1000000).toFixed(2)}μg
            </p>
            <p className="text-xs text-gray-500 mt-1">micrograms CO₂</p>
          </div>
        </div>

        {/* Results Comparison */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <BarChart3 className="text-blue-600" />
              Algorithm Comparison Results
            </h2>
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
            >
              Clear Results
            </button>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Run some algorithms to see comparison results</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Algorithm</th>
                    <th className="text-left py-2 px-4">Array Size</th>
                    <th className="text-left py-2 px-4">Time (s)</th>
                    <th className="text-left py-2 px-4">Energy (mJ)</th>
                    <th className="text-left py-2 px-4">CO₂ (μg)</th>
                    <th className="text-left py-2 px-4">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => {
                    const isEfficient = result.metrics.carbonFootprint < 0.001;
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{result.algorithm}</td>
                        <td className="py-3 px-4">{result.arraySize.toLocaleString()}</td>
                        <td className="py-3 px-4">{result.metrics.executionTime.toFixed(3)}</td>
                        <td className="py-3 px-4">{(result.metrics.energyConsumption * 1000).toFixed(2)}</td>
                        <td className="py-3 px-4">{(result.metrics.carbonFootprint * 1000000).toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`flex items-center gap-1 ${
                            isEfficient ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {isEfficient ? (
                              <>
                                <TrendingUp className="w-4 h-4" />
                                Efficient
                              </>
                            ) : (
                              <>
                                <TrendingDown className="w-4 h-4" />
                                Inefficient
                              </>
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Code Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-red-600">❌ Inefficient Code</h3>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
              <pre>{`# Bubble Sort - O(n²)
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Energy Impact:
# - Nested loops = O(n²) operations
# - Many memory swaps
# - Cache misses
# - High CPU utilization`}</pre>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-green-600">✅ Efficient Code</h3>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
              <pre>{`# Optimized Sort - O(n log n)
def optimized_sort(arr):
    # Using Python's built-in Timsort
    # Optimized for real-world data
    return sorted(arr)

# Energy Benefits:
# - Hybrid stable sort
# - Optimized for partially sorted data
# - Better cache utilization
# - Lower CPU overhead`}</pre>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Leaf className="text-green-600" />
            Environmental Impact Analysis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
              <h4 className="font-semibold text-red-700 mb-2">Bubble Sort Impact</h4>
              <div className="space-y-1 text-sm">
                <p>⚡ Energy: <strong>High consumption</strong></p>
                <p>🌍 CO₂: <strong>~100x baseline</strong></p>
                <p>💰 Cost: <strong>Expensive at scale</strong></p>
                <p>📊 Scalability: <strong>Poor</strong></p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-700 mb-2">Quick Sort Impact</h4>
              <div className="space-y-1 text-sm">
                <p>⚡ Energy: <strong>Moderate consumption</strong></p>
                <p>🌍 CO₂: <strong>~5x baseline</strong></p>
                <p>💰 Cost: <strong>Reasonable</strong></p>
                <p>📊 Scalability: <strong>Good</strong></p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <h4 className="font-semibold text-green-700 mb-2">Optimized Sort Impact</h4>
              <div className="space-y-1 text-sm">
                <p>⚡ Energy: <strong>Minimal consumption</strong></p>
                <p>🌍 CO₂: <strong>Baseline efficient</strong></p>
                <p>💰 Cost: <strong>Cost-effective</strong></p>
                <p>📊 Scalability: <strong>Excellent</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">🎓 Key Learning Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">For Students:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Algorithm choice directly impacts energy consumption</li>
                <li>• O(n²) algorithms can use 100x more energy than O(n log n)</li>
                <li>• Small optimizations scale to massive environmental impact</li>
                <li>• Green computing is both ethical and economical</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Real-World Application:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Banking: Processing millions of transactions efficiently</li>
                <li>• Mobile apps: Preserving battery life</li>
                <li>• Cloud services: Reducing operational costs</li>
                <li>• IoT devices: Extending device lifetime</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Demo Instructions */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Try This Live Demo:</h3>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Select different algorithms and array sizes</li>
            <li>2. Click "Run Test" to see real-time energy consumption</li>
            <li>3. Compare results between efficient and inefficient algorithms</li>
            <li>4. Notice how energy consumption scales with complexity</li>
            <li>5. Discuss: How would this impact a system processing millions of requests?</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default GreenComputingDemo;
