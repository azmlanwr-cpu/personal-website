// Toggle menu mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Tutup menu saat link diklik (khusus mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Reveal section saat discroll ke area layar
const revealTargets = document.querySelectorAll('.section-inner, .hero-inner');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// Deteksi otomatis foto karya: jika karya1.jpg, karya2.jpg, dst berhasil
// ditemukan di folder yang sama, gambar itu otomatis dipasang menggantikan
// kotak "+ Karya". Kamu tidak perlu edit HTML sama sekali — cukup upload
// foto dengan nama yang persis sama (karya1.jpg, karya2.jpg, karya3.jpg, karya4.jpg).
const galleryMap = { g1: 'karya1.jpg', g2: 'karya2.jpg' };

Object.entries(galleryMap).forEach(([id, filename]) => {
  const slot = document.getElementById(id);
  if (!slot) return;
  const testImg = new Image();
  testImg.onload = () => {
    slot.classList.remove('placeholder');
    slot.innerHTML = '';
    const img = document.createElement('img');
    img.src = filename;
    img.alt = 'Karya gambar oleh Muhammad Azmil Anwar';
    slot.appendChild(img);
  };
  testImg.onerror = () => { /* foto belum ada, biarkan placeholder */ };
  testImg.src = filename;
});