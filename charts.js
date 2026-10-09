/* ==========================================================================
   GEETHANJALI N PORTFOLIO - CHARTS & PERFORMANCE METRICS (Chart.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initContentMixChart();
    initCompetencyChart();
});

function getChartColors() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    return {
        text: isDark ? '#94A3B8' : '#475569',
        grid: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
        emerald: '#10B981',
        emeraldBg: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.3)',
        gold: '#F59E0B',
        indigo: '#6366F1',
        violet: '#8B5CF6',
        cyan: '#06B6D4'
    };
}

// 1. Content Format & Platform Distribution (Doughnut Chart)
let mixChartInstance = null;
function initContentMixChart() {
    const ctx = document.getElementById('contentMixChart');
    if (!ctx) return;

    const colors = getChartColors();

    mixChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'SEO & Technical Blogs',
                'Website & Landing Page Copy',
                'Editorial SEO Metadata',
                'Reels & Video Scripts',
                'Brand & Paid Ad Copy',
                'Social Storytelling'
            ],
            datasets: [{
                data: [30, 22, 18, 12, 10, 8],
                backgroundColor: [
                    colors.emerald,
                    colors.indigo,
                    colors.gold,
                    colors.violet,
                    colors.cyan,
                    '#EC4899'
                ],
                borderWidth: 2,
                borderColor: document.documentElement.getAttribute('data-theme') !== 'light' ? '#0E1626' : '#FAF7F2'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: colors.text,
                        font: { family: 'Plus Jakarta Sans', size: 11 }
                    }
                }
            }
        }
    });
}

// 2. Skill & Strategy Radar Chart
let competencyChartInstance = null;
function initCompetencyChart() {
    const ctx = document.getElementById('competencyChart');
    if (!ctx) return;

    const colors = getChartColors();

    competencyChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Website Copywriting',
                'SEO Content & Keywords',
                'Brand & Campaign Copy',
                'Content Strategy',
                'Scripts & Video Storytelling',
                'Digital Publishing & Metadata'
            ],
            datasets: [{
                label: 'Strategic Expertise',
                data: [98, 96, 94, 95, 92, 97],
                fill: true,
                backgroundColor: colors.emeraldBg,
                borderColor: colors.emerald,
                pointBackgroundColor: colors.emerald,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colors.emerald
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                r: {
                    angleLines: { color: colors.grid },
                    grid: { color: colors.grid },
                    pointLabels: {
                        color: colors.text,
                        font: { family: 'Plus Jakarta Sans', size: 10, weight: '600' }
                    },
                    ticks: { display: false, stepSize: 20 }
                }
            }
        }
    });
}
