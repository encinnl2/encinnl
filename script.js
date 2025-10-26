
// Allow inspect/right-click only for images (temporary flag)
(function() {
  let allowInspectForImage = false;
  let allowTimer = null;

  // If user right-clicks or clicks on an <img>, enable inspect for a short time
  document.addEventListener('mousedown', (e) => {
    const target = e.target;
    if (target && target.tagName === 'IMG') {
      allowInspectForImage = true;
      clearTimeout(allowTimer);
      // beri window 3 detik untuk buka context menu / inspect
      allowTimer = setTimeout(() => { allowInspectForImage = false; }, 3000);
    }
  }, true);

  // Context menu: hanya izinkan pada <img>
  document.addEventListener('contextmenu', (e) => {
    const target = e.target;
    if (target && target.tagName === 'IMG') {
      // biarkan default (gambar boleh di inspect/save)
      return;
    }
    // cegah context menu di elemen lain
    e.preventDefault();
  }, true);

  // Keyboard shortcuts: blokir F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+J
  document.addEventListener('keydown', (e) => {
    // jika flag on (baru aja klik gambar) -> allow
    if (allowInspectForImage) return;

    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I or Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U (view source) or Ctrl+S (save)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // Optional: cegah drag gambar buat nyontek / tarik ke tab baru
  document.addEventListener('dragstart', (e) => {
    if (e.target && e.target.tagName === 'IMG') {
      // kalau mau izinkan drag gambar hapus baris ini
      e.preventDefault();
    }
  });

})();









document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });