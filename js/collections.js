document.addEventListener('DOMContentLoaded', () => {
  // Page is ready
});

(function () {
  const TEMPLATE = `
    <div class="absolute inset-0 bg-black/60" onclick="closeProductModal()" aria-hidden="true"></div>
    <div class="relative mx-auto my-6 md:my-10 w-[min(95vw,1200px)] h-[min(90vh,900px)]">
      <div class="bg-white rounded-2xl shadow-xl w-full h-full overflow-hidden flex flex-col md:flex-row">
        <button type="button"
                class="absolute top-3 right-3 bg-black/80 text-white rounded-full w-9 h-9 grid place-items-center hover:bg-black focus:outline-none"
                aria-label="Close"
                onclick="closeProductModal()">&#10005;</button>

        <div class="flex-1 bg-gray-50 flex items-center justify-center p-3 md:p-6">
          <img id="pmImg" class="max-w-full max-h-full object-contain" src="" alt="">
        </div>

        <div class="w-full md:w-[380px] p-6 overflow-auto border-t md:border-t-0 md:border-l border-gray-200">
          <h3 id="pmTitle" class="text-2xl font-bold mb-2"></h3>
          <div id="pmCat" class="text-sm text-gray-600 mb-4"></div>
          <p id="pmDesc" class="text-gray-700"></p>
        </div>
      </div>
    </div>
  `;

  function ensureModal() {
    let modal = document.getElementById('productModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'productModal';
      modal.className = 'fixed inset-0 z-[80] hidden';
      modal.innerHTML = TEMPLATE;
      document.body.appendChild(modal);
      return modal;
    }


    if (
      !modal.querySelector('#pmImg') ||
      !modal.querySelector('#pmTitle') ||
      !modal.querySelector('#pmDesc') ||
      !modal.querySelector('#pmCat')
    ) {
      modal.className = 'fixed inset-0 z-[80] hidden';
      modal.innerHTML = TEMPLATE;
    }
    return modal;
  }

  function show(cardEl) {
    if (!cardEl) return;

    const img = cardEl.querySelector('img');
    const title = cardEl.querySelector('h3')?.textContent?.trim() || 'Product';
    const category = cardEl.querySelector('p')?.textContent?.trim() || '';
    const desc = cardEl.dataset.desc?.trim() || '';

    const modal = ensureModal();
    const imgEl = modal.querySelector('#pmImg');
    const titleEl = modal.querySelector('#pmTitle');
    const catEl = modal.querySelector('#pmCat');
    const descEl = modal.querySelector('#pmDesc');

    imgEl.src = (img?.currentSrc || img?.src || '');
    imgEl.alt = title;
    titleEl.textContent = title;
    catEl.textContent = category;
    descEl.textContent = desc;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    const modal = document.getElementById('productModal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }


  window.showProductModal = show;
  window.closeProductModal = close;

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();