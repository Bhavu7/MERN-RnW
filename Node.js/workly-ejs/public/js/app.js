document.addEventListener('DOMContentLoaded', () => {
  const flashData = document.body.dataset.flash ? JSON.parse(document.body.dataset.flash) : null;
  const toastContainer = document.getElementById('toastContainer');
  const modal = document.getElementById('confirmModal');
  const modalTitle = document.getElementById('confirmModalTitle');
  const modalText = document.getElementById('confirmModalText');
  const modalConfirm = document.getElementById('confirmModalConfirm');
  const modalCancelButtons = document.querySelectorAll('[data-modal-cancel]');
  let pendingForm = null;

  const showToast = (message, type = 'success') => {
    if (!toastContainer || !message) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '!' : 'i'}</div>
      <div class="toast-copy">
        <strong>${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
        <span>${message}</span>
      </div>
    `;
    toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  };

  if (flashData?.text) showToast(flashData.text, flashData.type || 'success');

  document.querySelectorAll('.custom-select-wrapper').forEach((wrapper) => {
    const nativeSelect = wrapper.querySelector('select');
    const trigger = wrapper.querySelector('.custom-select-trigger');
    const value = wrapper.querySelector('.custom-select-value');
    const menu = wrapper.querySelector('.custom-select-menu');
    const options = [...wrapper.querySelectorAll('.custom-option')];

    const syncValue = () => {
      const selected = nativeSelect.options[nativeSelect.selectedIndex];
      value.textContent = selected ? selected.textContent : 'Select option';
      options.forEach((option) => {
        option.classList.toggle('selected', option.dataset.value === nativeSelect.value);
      });
    };

    syncValue();

    trigger.addEventListener('click', () => {
      document.querySelectorAll('.custom-select-wrapper.open').forEach((openWrapper) => {
        if (openWrapper !== wrapper) openWrapper.classList.remove('open');
      });
      wrapper.classList.toggle('open');
    });

    options.forEach((option) => {
      option.addEventListener('click', () => {
        nativeSelect.value = option.dataset.value;
        nativeSelect.dispatchEvent(new Event('change'));
        syncValue();
        wrapper.classList.remove('open');
      });
    });

    nativeSelect.addEventListener('change', syncValue);
  });

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.custom-select-wrapper.open').forEach((wrapper) => {
      if (!wrapper.contains(event.target)) wrapper.classList.remove('open');
    });
  });

  document.querySelectorAll('form[data-confirm]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      pendingForm = form;
      modalTitle.textContent = form.dataset.confirmTitle || 'Please confirm';
      modalText.textContent = form.dataset.confirmMessage || 'Are you sure you want to continue?';
      modal.classList.add('open');
      document.body.classList.add('modal-active');
    });
  });

  modalCancelButtons.forEach((button) => {
    button.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.classList.remove('modal-active');
      pendingForm = null;
    });
  });

  modal?.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('open');
      document.body.classList.remove('modal-active');
      pendingForm = null;
    }
  });

  modalConfirm?.addEventListener('click', () => {
    if (pendingForm) pendingForm.submit();
  });
});
