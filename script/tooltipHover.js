document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll("[data-tooltip-button]");

  buttons.forEach(button => {
    const tooltip = button.querySelector("[data-tooltip-content]");

    if (!tooltip) return;

    button.addEventListener("mouseenter", () => {
      positionTooltip(button, tooltip);
    });

    button.addEventListener("mouseleave", () => {
      resetTooltip(tooltip);
    });

    window.addEventListener("resize", () => {
      if (button.matches(":hover")) {
        positionTooltip(button, tooltip);
      }
    });
  });

  function positionTooltip(button, tooltip) {
    const padding = 70;

    const buttonRect = button.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let left = buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;

    // ограничение слева
    if (left < padding) {
      left = padding;
    }

    // ограничение справа
    if (left + tooltipRect.width > window.innerWidth - padding) {
      left = window.innerWidth - padding - tooltipRect.width;
    }

    // позиционируем относительно кнопки
    const offsetLeft = left - buttonRect.left;

    tooltip.style.left = `${offsetLeft}px`;
    tooltip.style.transform = "none";
  }

  function resetTooltip(tooltip) {
    // tooltip.style.left = "";
    // tooltip.style.transform = "";
    // tooltip.style.removeProperty("--arrow-offset");
  }

});