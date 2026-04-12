function toEmbedUrl(url) {
  if (!url) return "";
  const ytShort = url.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}?autoplay=1&rel=0`;
  const ytLong = url.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (ytLong) return `https://www.youtube.com/embed/${ytLong[1]}?autoplay=1&rel=0`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return url;
}

function renderWorks() {
  const grid = document.getElementById("worksGrid");
  if (!grid || !window.PROJECTS) return;

  grid.innerHTML = window.PROJECTS.map((project, index) => `
    <button class="work-card cinematic-card" data-index="${index}" aria-label="Open ${project.title}">
      <span class="work-thumb"><img src="${project.image}" alt="${project.title}"></span>
      <span class="card-overlay"></span>
      <span class="play-badge">Play</span>
      <span class="work-meta">
        <span class="work-title">${project.title}</span>
        <span class="work-role">${project.role || "Project"}</span>
      </span>
    </button>
  `).join("");
}

function setupModal() {
  const modal = document.getElementById("videoModal");
  if (!modal) return;

  const iframe = document.getElementById("modalIframe");
  const title = document.getElementById("modalTitle");
  const role = document.getElementById("modalRole");
  const note = document.getElementById("modalNote");
  const closeBtn = document.getElementById("modalClose");
  const backdrop = document.getElementById("modalBackdrop");

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    iframe.src = "";
    document.body.classList.remove("modal-open");
  }

  function openModal(project) {
    iframe.src = toEmbedUrl(project.videoUrl);
    title.textContent = project.title || "Untitled";
    role.textContent = project.role || "Project";
    note.textContent = project.note || "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  document.addEventListener("click", (event) => {
    const card = event.target.closest(".work-card[data-index]");
    if (!card) return;
    const project = window.PROJECTS[Number(card.dataset.index)];
    if (project) openModal(project);
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

renderWorks();
setupModal();
