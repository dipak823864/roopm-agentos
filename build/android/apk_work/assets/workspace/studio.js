var drawerOpen = false;
var projectCounter = 0;
var canvasArtMode = 0;

function toggleStudioDrawer() {
    drawerOpen = !drawerOpen;
    var dr = document.getElementById('st-sidebar-drawer');
    var bd = document.getElementById('st-drawer-backdrop');
    if (dr) dr.classList.toggle('closed');
    if (bd) bd.classList.toggle('closed');
}

function selectCategory(catName, btnId) {
    var ids = ['cat-all', 'cat-social', 'cat-doc', 'cat-video'];
    for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (el) el.classList.remove('active');
    }
    var target = document.getElementById(btnId);
    if (target) target.classList.add('active');

    var banner = document.getElementById('st-status-msg');
    if (banner) {
        banner.textContent = '✓ Filtered Category: ' + catName + ' • Ready to Customize';
    }
}

function createCanvasFormat(fmtName, dimText) {
    projectCounter++;
    localStorage.setItem('last_format', fmtName + ' (' + dimText + ')');
    var banner = document.getElementById('st-status-msg');
    if (banner) {
        banner.textContent = '✓ Created #' + projectCounter + ': ' + fmtName + ' (' + dimText + ') [Saved to localStorage]';
    }
}

function drawVectorCanvasArt(mode) {
    canvasArtMode = mode;
    var bIds = ['cv-btn-0', 'cv-btn-1', 'cv-btn-2'];
    for (var bi = 0; bi < 3; bi++) {
        var btn = document.getElementById(bIds[bi]);
        if (btn) {
            if (bi === mode) btn.classList.add('active');
            else btn.classList.remove('active');
        }
    }

    var cv = document.getElementById('st-vector-canvas');
    if (!cv) return;
    var ctx = cv.getContext('2d');
    var W = 680, H = 160;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);

    if (mode === 0) {
        // 🌟 Mode 0: 100% Standard W3C Canvas2D Bezier Waves & Glowing Orbs (Blend2D 16x AA!)
        ctx.fillStyle = '#312e81';
        ctx.beginPath();
        ctx.moveTo(0, 130);
        ctx.bezierCurveTo(180, 30, 340, 150, 520, 45);
        ctx.lineTo(W, 85);
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#4f46e5';
        ctx.beginPath();
        ctx.moveTo(0, 145);
        ctx.bezierCurveTo(160, 65, 360, 145, 540, 60);
        ctx.lineTo(W, 95);
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        ctx.moveTo(0, 130);
        ctx.bezierCurveTo(180, 30, 340, 150, 520, 45);
        ctx.lineTo(W, 85);
        ctx.stroke();

        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(165, 68, 26, 0, 6.283);
        ctx.fill();

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(485, 54, 20, 0, 6.283);
        ctx.fill();

        ctx.font = 'bold 14px Inter';
        ctx.fillStyle = '#f8fafc';
        ctx.fillText('Blend2D 16x Anti-Aliased Vector Path & Text Engine', 24, 30);
    } else if (mode === 1) {
        // 🌟 Mode 1: 100% Standard W3C Canvas2D Multi-Channel Analytics Chart + Trend Line
        var heights = [52, 96, 70, 118, 84, 128, 102, 114];
        var cols = ['#4f46e5', '#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#06b6d4', '#f59e0b', '#3b82f6'];
        for (var i = 0; i < 8; i++) {
            var bh = heights[i];
            var bx = 36 + i * 78;
            var by = 144 - bh;
            ctx.fillStyle = cols[i];
            ctx.fillRect(bx, by, 46, bh);

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(bx + 23, by - 10, 5.5, 0, 6.283);
            ctx.fill();
        }
    } else {
        // 🌟 Mode 2: 100% Standard W3C Canvas2D Concentric Vector Radar Rings
        var cx = 340, cy = 80;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        ctx.arc(cx, cy, 64, 0, 6.283);
        ctx.stroke();

        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        ctx.arc(cx, cy, 42, 0, 6.283);
        ctx.stroke();

        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(cx, cy, 20, 0, 6.283);
        ctx.fill();
    }

    var st = document.getElementById('st-status-msg');
    if (st) {
        var names = ['HD Bezier Vector Curves', 'Multi-Channel Bar Chart', 'Concentric Radar Rings'];
        st.textContent = '✓ Blend2D 16x Anti-Aliased Canvas2D Rendered: ' + names[mode];
    }
}

function syncQualitySlider() {
    var sl = document.getElementById('st-qual-slider');
    var pr = document.getElementById('st-qual-prog');
    var lb = document.getElementById('st-qual-badge');
    if (sl) {
        if (pr) pr.value = sl.value;
        if (lb) lb.textContent = 'DPI Quality: ' + sl.value + '%';
    }
}

function onFormatDropdownChange() {
    var sel = document.getElementById('st-export-select');
    var st = document.getElementById('st-status-msg');
    if (sel && st) {
        localStorage.setItem('saved_export_fmt', sel.value);
        st.textContent = '✓ Selected Export Format: ' + sel.value + ' (Saved in localStorage)';
    }
}

function saveBrandSettings() {
    projectCounter++;
    var inp = document.getElementById('st-brand-input');
    var sel = document.getElementById('st-export-select');
    var gnum = document.getElementById('st-grid-num');
    var bcol = document.getElementById('st-brand-col');
    var qsl = document.getElementById('st-qual-slider');
    var notes = document.getElementById('st-brand-notes');
    var st = document.getElementById('st-status-msg');

    var name = inp ? inp.value : 'RoopM Brand';
    if (inp) localStorage.setItem('saved_brand_name', inp.value);
    if (sel) localStorage.setItem('saved_export_fmt', sel.value);
    if (gnum) localStorage.setItem('saved_grid_num', gnum.value);
    if (bcol) localStorage.setItem('saved_brand_col', bcol.value);
    if (qsl) localStorage.setItem('saved_dpi_qual', qsl.value);
    if (notes) localStorage.setItem('saved_brand_notes', notes.value);

    if (st) {
        st.textContent = '✓ Saved All Brand Preferences for "' + name + '" to Disk (.localstorage.txt)!';
        st.style.cssText = 'background-color: #eef2ff; color: #312e81; border-radius: 10px;';
    }
}

function resetBrandSettings() {
    localStorage.removeItem('saved_brand_name');
    localStorage.removeItem('saved_export_fmt');
    localStorage.removeItem('saved_grid_num');
    localStorage.removeItem('saved_brand_col');
    localStorage.removeItem('saved_dpi_qual');
    localStorage.removeItem('saved_brand_notes');
    var lb = document.getElementById('st-qual-badge');
    if (lb) lb.textContent = 'DPI Quality: 90%';
    var st = document.getElementById('st-status-msg');
    if (st) {
        st.textContent = '↺ All Brand Settings Reset to Original Defaults!';
        st.style.cssText = 'background-color: #ecfdf5; color: #065f46; border-radius: 9px;';
    }
}

function initStudioPage() {
    drawVectorCanvasArt(0);
    var savedBrand = localStorage.getItem('saved_brand_name');
    var inp = document.getElementById('st-brand-input');
    if (savedBrand && inp) inp.value = savedBrand;

    var savedFmt = localStorage.getItem('saved_export_fmt');
    var sel = document.getElementById('st-export-select');
    if (savedFmt && sel) sel.value = savedFmt;

    var savedGrid = localStorage.getItem('saved_grid_num');
    var gnum = document.getElementById('st-grid-num');
    if (savedGrid && gnum) gnum.value = savedGrid;

    var savedCol = localStorage.getItem('saved_brand_col');
    var bcol = document.getElementById('st-brand-col');
    if (savedCol && bcol) bcol.value = savedCol;

    var savedQual = localStorage.getItem('saved_dpi_qual');
    var qsl = document.getElementById('st-qual-slider');
    var qpr = document.getElementById('st-qual-prog');
    var qlb = document.getElementById('st-qual-badge');
    if (savedQual && qsl) {
        qsl.value = savedQual;
        if (qpr) qpr.value = savedQual;
        if (qlb) qlb.textContent = 'DPI Quality: ' + savedQual + '%';
    }

    var savedNotes = localStorage.getItem('saved_brand_notes');
    var notes = document.getElementById('st-brand-notes');
    if (savedNotes && notes) notes.value = savedNotes;

    if (savedBrand && inp) {
        var st = document.getElementById('st-status-msg');
        if (st) st.textContent = '✓ Loaded Saved Brand Kit ("' + savedBrand + '") from Disk (.localstorage.txt)!';
    }
}

setTimeout(initStudioPage, 15);

var logCounter = 6;

function toggleInspectorHud() {
    if (typeof __toggleInspector === 'function') {
        __toggleInspector();
    }
    var st = document.getElementById('st-status-msg');
    if (st) {
        st.textContent = '✓ Visual Box-Model Inspector Toggled (Hover over any element or press F12)!';
    }
}

function appendDynamicLogEntry() {
    logCounter++;
    var logBox = document.getElementById('st-log-container');
    var firstItem = document.getElementById('log-item-1');
    if (logBox && firstItem) {
        var cloned = firstItem.cloneNode(true);
        cloned.textContent = '★ [0' + logCounter + '] Dynamic DOM cloneNode() + insertBefore() at Top!';
        cloned.style.cssText = 'background-color: #eef2ff; color: #312e81; border-color: #818cf8;';
        logBox.insertBefore(cloned, firstItem);
    }
    var st = document.getElementById('st-status-msg');
    if (st) {
        st.textContent = '✓ Inserted Dynamic Log Entry #' + logCounter + ' via cloneNode() & insertBefore()!';
    }
}

function runLiveVfsFetch() {
    fetch('studio.css').then(function(r) {
        return r.text();
    }).then(function(cssText) {
        var st = document.getElementById('st-status-msg');
        if (st) {
            st.textContent = '✓ VFS fetch("studio.css") Resolved: ' + cssText.length + ' Bytes Read Live from Disk!';
        }
    });
}

document.addEventListener('keydown', function(e) {
    var st = document.getElementById('st-status-msg');
    if (st && e.keyCode) {
        st.textContent = '⌨️ Keydown Event Dispatched: key="' + e.key + '" (keyCode=' + e.keyCode + ')';
    }
});
