// ML Deconstructed - Interactive Learning Hub
// Main JavaScript file for handling navigation, math rendering, and visualizations

// Modal and dynamic details
let algorithmsData = null;

async function loadAlgorithmsData() {
    try {
        const res = await fetch('data/algorithms.json');
        if (!res.ok) return;
        algorithmsData = await res.json();
    } catch (e) {
        // noop
    }
}

// Bind all algorithm anchors from the nav to open modal
function bindAllAlgoAnchors() {
    const mapping = {
        '#logistic-regression': 'logistic',
        '#knn': 'knn',
        '#decision-trees': 'decision_tree',
        '#svm': 'svm',
        '#linear-regression': 'linear_regression',
        '#kmeans': 'kmeans',
        '#pca': 'pca'
    };
    Object.entries(mapping).forEach(([selector, key]) => {
        document.querySelectorAll(`a[href='${selector}']`).forEach(a => {
            a.classList.add('algo-link');
            a.setAttribute('data-tech', key);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadAlgorithmsData().then(() => bindAllAlgoAnchors());
    setupModal();
});

function setupModal() {
    const modal = document.getElementById('algo-modal');
    const closeBtn = document.getElementById('algo-modal-close');
    if (!modal || !closeBtn) return;
    closeBtn.addEventListener('click', () => hideModal());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });
}

function bindAlgorithmLinks() {
    document.querySelectorAll('.algo-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tech = link.getAttribute('data-tech');
            if (tech) openAlgorithmDetails(tech);
        });
    });
}

function showModal() {
    const modal = document.getElementById('algo-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function hideModal() {
    const modal = document.getElementById('algo-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function openAlgorithmDetails(techId) {
    if (!algorithmsData) return;
    const sup = algorithmsData.supervised.techniques;
    const unsup = algorithmsData.unsupervised.techniques;
    const tech = sup[techId] || unsup[techId];
    if (!tech) return;

    const title = document.getElementById('algo-modal-title');
    const content = document.getElementById('algo-modal-content');
    if (!title || !content) return;

    title.textContent = tech.name;

    const types = (tech.types || []).map(t => `<div class="bg-gray-800 rounded p-4"><div class="font-medium">${t.name}</div><div class="text-gray-300 text-sm mt-1">${t.description || ''}</div></div>`).join('');
    const hyperparamsList = (tech.hyperparameters || []).map(h => `<li><code>${h.key}</code> - ${h.desc}</li>`).join('');
    const advantagesList = (tech.advantages || []).map(a => `<li>${a}</li>`).join('');
    const disadvantagesList = (tech.disadvantages || []).map(a => `<li>${a}</li>`).join('');
    const usesList = (tech.uses || []).map(a => `<li>${a}</li>`).join('');

    let kernelsList = '';
    if (tech.kernels) {
        kernelsList = `<div class="bg-gray-800 rounded p-4"><h5 class="font-semibold mb-2 text-blue-400">Kernel Functions</h5><ul class="list-disc list-inside space-y-1 text-gray-200">${tech.kernels.map(k => `<li><span class='font-medium text-blue-300'>${k.name}</span>: <span class='katex'>${k.formula}</span></li>`).join('')}</ul></div>`;
    }

    const mathBlock = tech.math ? `<div class="bg-gray-800 rounded p-4"><h5 class="font-semibold mb-2 text-yellow-400">Mathematics</h5>${Object.values(tech.math).map(m => `<div class='text-gray-200 mb-1'><span class='katex'>${m}</span></div>`).join('')}</div>` : '';

    content.innerHTML = `
        <div class="space-y-6">
            ${(tech.types && tech.types.length) ? `<div><h4 class="text-lg font-semibold text-yellow-400 mb-2">Types</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4">${types}</div></div>` : ''}

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                ${kernelsList}
                ${(tech.hyperparameters && tech.hyperparameters.length) ? `<div class="bg-gray-800 rounded p-4"><h5 class="font-semibold mb-2 text-blue-400">Key Hyperparameters</h5><ul class="list-disc list-inside space-y-1 text-gray-200">${hyperparamsList}</ul></div>` : ''}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                ${(tech.advantages && tech.advantages.length) ? `<div class="bg-gray-800 rounded p-4"><h5 class="font-semibold mb-2 text-green-400">Advantages</h5><ul class="list-disc list-inside space-y-1 text-gray-200">${advantagesList}</ul></div>` : ''}
                ${(tech.disadvantages && tech.disadvantages.length) ? `<div class="bg-gray-800 rounded p-4"><h5 class="font-semibold mb-2 text-red-400">Disadvantages</h5><ul class="list-disc list-inside space-y-1 text-gray-200">${disadvantagesList}</ul></div>` : ''}
                ${(tech.uses && tech.uses.length) ? `<div class="bg-gray-800 rounded p-4"><h5 class="font-semibold mb-2 text-purple-400">Typical Uses</h5><ul class="list-disc list-inside space-y-1 text-gray-200">${usesList}</ul></div>` : ''}
            </div>

            ${mathBlock}

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-gray-800 rounded p-4">
                    <h5 class="font-semibold mb-2 text-blue-400">Plot A</h5>
                    <div id="plot-a" class="h-64"></div>
                </div>
                <div class="bg-gray-800 rounded p-4">
                    <h5 class="font-semibold mb-2 text-blue-400">Plot B</h5>
                    <div id="plot-b" class="h-64"></div>
                </div>
            </div>
        </div>
    `;

    if (typeof renderMathInElement === 'function') {
        renderMathInElement(content, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true}
            ],
            throwOnError: false
        });
    }

    showModal();

    setTimeout(() => {
        renderAlgoPlots(techId);
    }, 0);
}

function renderConfusionMatrix(matrix, containerId) {
    if (typeof Plotly === 'undefined') return;
    const z = matrix;
    const data = [{
        z,
        x: ['Pred 0','Pred 1'],
        y: ['True 0','True 1'],
        type: 'heatmap',
        colorscale: 'Blues'
    }];
    const layout = {
        xaxis: { side: 'top' },
        yaxis: { automargin: true },
        margin: { t: 30, r: 10, b: 30, l: 60 },
        plot_bgcolor: '#1F2937', paper_bgcolor: '#1F2937', font: { color: '#F3F4F6' }
    };
    Plotly.newPlot(containerId, data, layout, {displayModeBar: false, responsive: true});
}

function renderSVRFit(sample, containerId) {
    if (typeof Plotly === 'undefined') return;
    const x = sample.x;
    const y = sample.y;
    const scatter = { x, y, mode: 'markers', type: 'scatter', name: 'Data', marker: { color: '#60A5FA' } };
    // simple smoothing for demo curve
    const xs = Array.from({length: 200}, (_, i) => -3 + i * (6/199));
    const ys = xs.map(v => Math.tanh(v) * 3 + 0.2 * v);
    const line = { x: xs, y: ys, mode: 'lines', name: 'SVR (demo)', line: { color: '#10B981', width: 3 } };
    const layout = { margin: { t: 20, r: 10, b: 40, l: 40 }, plot_bgcolor: '#1F2937', paper_bgcolor: '#1F2937', font: { color: '#F3F4F6' } };
    Plotly.newPlot(containerId, [scatter, line], layout, {displayModeBar: false, responsive: true});
}

function renderResiduals(yTrue, yPred, containerId) {
    const residuals = yTrue.map((y, i) => y - yPred[i]);
    const scatter = { x: yPred, y: residuals, mode: 'markers', type: 'scatter', name: 'Residuals', marker: { color: '#F59E0B' } };
    const layout = { xaxis: { title: 'Predicted' }, yaxis: { title: 'Residual' }, plot_bgcolor: '#1F2937', paper_bgcolor: '#1F2937', font: { color: '#F3F4F6' }, margin: { t: 20, r: 10, b: 40, l: 40 } };
    Plotly.newPlot(containerId, [scatter], layout, {displayModeBar: false, responsive: true});
}

function renderElbow(elbow, containerId) {
    const line = { x: elbow.k, y: elbow.inertia, mode: 'lines+markers', line: { color: '#3B82F6' }, marker: { color: '#3B82F6' } };
    const layout = { xaxis: { title: 'k' }, yaxis: { title: 'Inertia' }, plot_bgcolor: '#1F2937', paper_bgcolor: '#1F2937', font: { color: '#F3F4F6' }, margin: { t: 20, r: 10, b: 40, l: 40 } };
    Plotly.newPlot(containerId, [line], layout, {displayModeBar: false, responsive: true});
}

function renderClusters2D(cl, containerId) {
    const trace = { x: cl.x, y: cl.y, mode: 'markers', type: 'scatter', marker: { color: cl.labels, colorscale: 'Viridis', size: 10 }, text: cl.labels, name: 'Clusters' };
    const layout = { xaxis: { title: 'x1' }, yaxis: { title: 'x2' }, plot_bgcolor: '#1F2937', paper_bgcolor: '#1F2937', font: { color: '#F3F4F6' }, margin: { t: 20, r: 10, b: 40, l: 40 } };
    Plotly.newPlot(containerId, [trace], layout, {displayModeBar: false, responsive: true});
}

function renderExplainedVariance(exp, containerId) {
    const bar = { x: exp.components.map(n => `PC${n}`), y: exp.variance, type: 'bar', marker: { color: '#10B981' } };
    const layout = { xaxis: { title: 'Components' }, yaxis: { title: 'Explained Variance Ratio' }, plot_bgcolor: '#1F2937', paper_bgcolor: '#1F2937', font: { color: '#F3F4F6' }, margin: { t: 20, r: 10, b: 40, l: 40 } };
    Plotly.newPlot(containerId, [bar], layout, {displayModeBar: false, responsive: true});
}

function renderMetricsPanel(techId) {
    if (!algorithmsData) return '';
    const sup = algorithmsData.supervised.techniques;
    const unsup = algorithmsData.unsupervised.techniques;
    const tech = sup[techId] || unsup[techId];
    if (!tech) return '';

    const metricsCards = [];

    if (tech.examples && tech.examples.confusion_matrix) {
        const cm = tech.examples.confusion_matrix;
        const tn = cm[0][0], fp = cm[0][1], fn = cm[1][0], tp = cm[1][1];
        const accuracy = (tp + tn) / (tp + tn + fp + fn);
        const precision = tp + fp === 0 ? 0 : tp / (tp + fp);
        const recall = tp + fn === 0 ? 0 : tp / (tp + fn);
        const f1 = (precision + recall) === 0 ? 0 : 2 * precision * recall / (precision + recall);
        metricsCards.push({ label: 'Accuracy', value: accuracy });
        metricsCards.push({ label: 'Precision', value: precision });
        metricsCards.push({ label: 'Recall', value: recall });
        metricsCards.push({ label: 'F1', value: f1 });
    }

    if (tech.examples && tech.examples.residuals) {
        const y = tech.examples.residuals.y_true;
        const yhat = tech.examples.residuals.y_pred;
        const n = y.length;
        const mse = y.reduce((s, yi, i) => s + Math.pow(yi - yhat[i], 2), 0) / n;
        const mae = y.reduce((s, yi, i) => s + Math.abs(yi - yhat[i]), 0) / n;
        const rmse = Math.sqrt(mse);
        const ybar = y.reduce((s, v) => s + v, 0) / n;
        const sst = y.reduce((s, yi) => s + Math.pow(yi - ybar, 2), 0);
        const ssr = y.reduce((s, yi, i) => s + Math.pow(yi - yhat[i], 2), 0);
        const r2 = 1 - ssr / sst;
        metricsCards.push({ label: 'MAE', value: mae });
        metricsCards.push({ label: 'MSE', value: mse });
        metricsCards.push({ label: 'RMSE', value: rmse });
        metricsCards.push({ label: 'R²', value: r2 });
    }

    if (!metricsCards.length) return '';

    return `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${metricsCards.map(m => `
                <div class="bg-gray-800 rounded p-4 text-center">
                    <div class="text-sm text-gray-400">${m.label}</div>
                    <div class="text-2xl font-semibold">${(typeof m.value === 'number') ? m.value.toFixed(3) : m.value}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function repositoryLinkNote() {
    return `<div class="bg-gray-800 rounded p-3 text-sm text-gray-300">For full notebooks and implementations, see <a href="https://github.com/Aditya7615/Machine-Learning-Toolkit" target="_blank" rel="noopener" class="text-blue-400 hover:text-blue-300 underline">Machine-Learning-Toolkit</a>.</div>`;
}

// Inject metrics panel into modal after building content
const _openAlgorithmDetails = openAlgorithmDetails;
openAlgorithmDetails = function(techId) {
    _openAlgorithmDetails(techId);
    const content = document.getElementById('algo-modal-content');
    if (!content) return;
    const panel = document.createElement('div');
    panel.className = 'bg-gray-900 border border-gray-800 rounded p-4';
    panel.innerHTML = `<h5 class="font-semibold mb-3 text-blue-400">Metrics</h5>${renderMetricsPanel(techId)}`;
    content.insertBefore(panel, content.firstChild);
    const note = document.createElement('div');
    note.innerHTML = repositoryLinkNote();
    content.appendChild(note);
};


if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.body, {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
        ],
        throwOnError: false
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

initializeVisualizations();
addScrollEffects();
enhanceMobileExperience();
lazyLoadVisualizations();

function initializeVisualizations() {
    createLogisticRegressionViz();
}

function createLogisticRegressionViz() {
    const container = document.getElementById('logistic-viz');
    if (!container || typeof Plotly === 'undefined') return;

    const x = Array.from({length: 200}, (_, i) => (i - 100) / 10);
    const y = x.map(val => 1 / (1 + Math.exp(-val)));

    const trace = {
        x,
        y,
        type: 'scatter',
        mode: 'lines',
        name: 'Sigmoid Function',
        line: { color: '#3B82F6', width: 3 }
    };

    const layout = {
        title: 'Logistic Regression: Sigmoid Function',
        xaxis: { title: 'Input (z)', gridcolor: '#374151' },
        yaxis: { title: 'Probability σ(z)', gridcolor: '#374151', range: [0, 1] },
        plot_bgcolor: '#1F2937',
        paper_bgcolor: '#1F2937',
        font: { color: '#F3F4F6' },
        margin: { t: 50, b: 50, l: 60, r: 30 }
    };

    Plotly.newPlot(container, [trace], layout, { responsive: true });
}

function addScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.gradient-bg');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card-hover, .bg-gray-700').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function enhanceMobileExperience() {
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) navigateToNextSection();
            else navigateToPreviousSection();
        }
    });
}

function navigateToNextSection() {
    const sections = ['home', 'statistics', 'algorithms'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    document.querySelector(`#${sections[nextIndex]}`).scrollIntoView({ behavior: 'smooth' });
}

function navigateToPreviousSection() {
    const sections = ['home', 'statistics', 'algorithms'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
    document.querySelector(`#${sections[prevIndex]}`).scrollIntoView({ behavior: 'smooth' });
}

function getCurrentSection() {
    const sections = ['home', 'statistics', 'algorithms'];
    for (const section of sections) {
        const element = document.querySelector(`#${section}`);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) return section;
    }
    return 'home';
}

function lazyLoadVisualizations() {
    const options = { root: null, rootMargin: '50px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const vizType = container.dataset.vizType;
                if (vizType === 'logistic') createLogisticRegressionViz();
                observer.unobserve(container);
            }
        });
    }, options);

    document.querySelectorAll('[data-viz-type]').forEach(container => {
        observer.observe(container);
    });
}
