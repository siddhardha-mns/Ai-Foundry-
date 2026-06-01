document.addEventListener('DOMContentLoaded', () => {
  
  // (Orbit feature removed)


  // ==========================================================================
  // 2. SCROLL TRIGGERED BOTTOM ACTION BAR
  // ==========================================================================
  const stickyActionBar = document.getElementById('sticky-action-bar') as HTMLElement | null;
  
  window.addEventListener('scroll', () => {
    if (stickyActionBar) {
      // Show bar when user scrolls past hero section (~280px)
      if (window.scrollY > 280) {
        stickyActionBar.classList.remove('hidden');
      } else {
        stickyActionBar.classList.add('hidden');
      }
    }
  });

  // ==========================================================================
  // 3. MULTI-STEP REGISTRATION MODAL
  // ==========================================================================
  const registerModal = document.getElementById('register-modal') as HTMLDialogElement | null;
  const qrTriggerBtn = document.getElementById('qr-trigger-btn') as HTMLElement | null;
  const barRegisterBtn = document.getElementById('bar-register-btn') as HTMLElement | null;
  const modalCloseBtn = document.getElementById('modal-close-btn') as HTMLElement | null;
  const modalBackdropClose = document.getElementById('modal-backdrop-close') as HTMLElement | null;
  
  const stepPanel1 = document.getElementById('step-panel-1') as HTMLElement | null;
  const stepPanel2 = document.getElementById('step-panel-2') as HTMLElement | null;
  const trackStep1 = document.getElementById('track-1') as HTMLElement | null;
  const trackStep2 = document.getElementById('track-2') as HTMLElement | null;
  
  const toStep2Btn = document.getElementById('to-step-2') as HTMLElement | null;
  const backToStep1Btn = document.getElementById('back-to-step-1') as HTMLElement | null;
  const registerForm = document.getElementById('register-form') as HTMLFormElement | null;
  
  const successToast = document.getElementById('success-toast') as HTMLElement | null;

  // Input fields for manual checking before wizard stepping
  const regNameInput = document.getElementById('reg-name') as HTMLInputElement | null;
  const regEmailInput = document.getElementById('reg-email') as HTMLInputElement | null;

  // Open modal triggers
  const openRegistration = (): void => {
    if (registerModal) {
      registerModal.showModal();
      resetWizard();
    }
  };

  if (qrTriggerBtn) qrTriggerBtn.addEventListener('click', openRegistration);
  if (barRegisterBtn) barRegisterBtn.addEventListener('click', openRegistration);

  // Close modal triggers
  const closeRegistration = (): void => {
    if (registerModal) registerModal.close();
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeRegistration);
  if (modalBackdropClose) modalBackdropClose.addEventListener('click', closeRegistration);

  // Reset wizard back to Step 1
  function resetWizard(): void {
    if (stepPanel1) stepPanel1.classList.add('active');
    if (stepPanel2) stepPanel2.classList.remove('active');
    if (trackStep1) trackStep1.classList.add('active');
    if (trackStep2) trackStep2.classList.remove('active');
  }

  // Wizard Step Navigation: 1 -> 2
  if (toStep2Btn) {
    toStep2Btn.addEventListener('click', () => {
      // Validate Step 1 Inputs
      if (regNameInput && !regNameInput.value.trim()) {
        regNameInput.reportValidity();
        return;
      }
      if (regEmailInput && !regEmailInput.validity.valid) {
        regEmailInput.reportValidity();
        return;
      }
      
      // Transition to Step 2
      if (stepPanel1) stepPanel1.classList.remove('active');
      if (stepPanel2) stepPanel2.classList.add('active');
      if (trackStep2) trackStep2.classList.add('active');
    });
  }

  // Wizard Step Navigation: 2 -> 1
  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', () => {
      if (stepPanel2) stepPanel2.classList.remove('active');
      if (stepPanel1) stepPanel1.classList.add('active');
      if (trackStep2) trackStep2.classList.remove('active');
    });
  }

  // Form Submit Action
  if (registerForm) {
    registerForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      
      closeRegistration();
      triggerSuccessToast();
      registerForm.reset();
    });
  }

  function triggerSuccessToast(): void {
    if (successToast) {
      successToast.classList.remove('hidden');
      
      // Auto hide toast after 4.5 seconds
      setTimeout(() => {
        successToast.classList.add('hidden');
      }, 4500);
    }
  }

  // ==========================================================================
  // 4. PLAYFUL STICKER MICRO-ANIMATIONS (REACTIVE WOBBLE)
  // ==========================================================================
  const stickyIdeas = document.getElementById('sticky-ideas') as HTMLElement | null;
  const stickerSmiley = document.getElementById('sticker-smiley') as HTMLElement | null;
  const stickerDark = document.querySelector('.circular-sticker') as HTMLElement | null;
  const stickerHolo = document.querySelector('.holographic-badge') as HTMLElement | null;

  function addWobbleEffect(element: HTMLElement | null, customRotate = '12deg'): void {
    if (element) {
      element.addEventListener('click', (e: Event) => {
        e.stopPropagation();
        element.style.transform = `scale(1.2) rotate(${customRotate})`;
        element.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        setTimeout(() => {
          element.style.transform = '';
        }, 350);
      });
    }
  }

  addWobbleEffect(stickyIdeas, '10deg');
  addWobbleEffect(stickerSmiley, '-15deg');
  addWobbleEffect(stickerDark, '12deg');
  addWobbleEffect(stickerHolo, '-20deg');

});
