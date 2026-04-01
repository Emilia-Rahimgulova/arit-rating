document.addEventListener("DOMContentLoaded", ()=> {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", function (e) {

      let isValid = true;

      // Очистка
      form.querySelectorAll(".error-message").forEach(el => el.remove());
      form.querySelectorAll(".error").forEach(el => el.classList.remove("error"));

      const fields = form.querySelectorAll("input, textarea");

      fields.forEach(field => {

        const value = field.value.trim();
        const isRequired = field.hasAttribute("required");
        const dataType = field.dataset.type;

        const group =
            field.closest("[data-form-group]") ||
            field.closest("[data-form-group-checkbox]") ||
            field.parentNode;

        function showError(message) {
          isValid = false;

          field.classList.add("error");

          const error = document.createElement("div");
          error.className = "error-message";
          error.textContent = message;

          group.appendChild(error);
        }

        // === REQUIRED ===
        if (isRequired) {
          if (
              (field.type === "checkbox" && !field.checked) ||
              (field.type !== "checkbox" && value === "")
          ) {
            showError(field.dataset.requiredMessage || "Заполните поле");
            return;
          }
        }

        // если пустое и не required — пропускаем
        if (!value) return;

        // проходим по типам ===
        switch (dataType) {

          case "email": {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!pattern.test(value)) {
              showError(field.dataset.errorMessage || "Некорректный email");
            }
            break;
          }

          case "phone": {
            // оставляем только цифры
            const digits = value.replace(/\D/g, "");
            console.log(digits.length, 'value')
            // базовая проверка формата
            const pattern = /^[0-9+\-\s()]+$/;

            if (!pattern.test(value) || digits.length < 11) {
              showError(field.dataset.errorMessage || "Некорректный телефон");
            }

            break;
          }

          case "name": {
            // минимум 2 символа, буквы + пробелы (несколько слов)
            const pattern = /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,}$/;
            if (!pattern.test(value)) {
              showError(field.dataset.errorMessage || "Введите корректное имя");
            }
            break;
          }
          case "url": {
            let url = value;
            // если нет протокола — добавляем
            if (!/^https?:\/\//i.test(url)) {
              url = "https://" + url;
            }
            try {
              const parsed = new URL(url);
              const hostname = parsed.hostname;
              // проверка:
              // 1. есть точка
              // 2. не начинается/не заканчивается точкой
              // 3. после точки есть символы (доменная зона)
              const isValidDomain =
                  hostname.includes(".") &&
                  !hostname.startsWith(".") &&
                  !hostname.endsWith(".") &&
                  /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(hostname);

              if (!isValidDomain) {
                throw new Error("invalid");
              }

            } catch {
              showError(field.dataset.errorMessage || "Некорректный URL");
            }
            break;
          }

        }

      });

      if (!isValid) {
        e.preventDefault();
      }

    });
  });
})