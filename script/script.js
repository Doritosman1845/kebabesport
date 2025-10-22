

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    // La browser utføre HTML5-validering først
    if (!form.checkValidity()) return;

    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (res.ok) {
        
        alert('Takk — meldingen er sendt!');
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Noe gikk galt ved sending. Prøv igjen.');
      }
    } catch (err) {
      console.error('Feil ved sending:', err);
      alert('Nettverksfeil. Prøv igjen senere.');
    } finally {
      if (btn) btn.disabled = false;
    }
  });
});
