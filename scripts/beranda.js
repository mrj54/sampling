 // Initialize GSAP animations
 window.addEventListener('DOMContentLoaded', () => {
    gsap.from(".menu-item", {
        duration: 0.4,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        onComplete() {
            gsap.set(".menu-item", { clearProps: "all" });
        }
    });
  });

  // Add click event listeners
  document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', function() {
          gsap.to(this, {
              scale: 0.95,
              duration: 0.1,
              yoyo: true,
              repeat: 1
          });
          console.log('Clicked:', this.querySelector('span').textContent);
      });
  });
    // Menampilkan sapaan dengan nama pengguna yang login
    const username = localStorage.getItem('username');
  if (username) {
      document.getElementById('welcomeMessage').innerText = username;
  } else {
      document.getElementById('welcomeMessage').innerText = 'Pengguna';
  }

  // Fungsi logout untuk menghapus data username dan kembali ke halaman login
  function logout() {
      localStorage.removeItem('username');
      window.location.href = 'login.html';}