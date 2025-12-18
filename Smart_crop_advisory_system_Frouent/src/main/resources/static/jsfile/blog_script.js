/* =========================================================
   KRISHI SAHAYAK BLOG - FINAL CLEAN JS
   Farmer’s Corner + Expert Insights (NO ERRORS)
   ========================================================= */

/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initMobileMenu();
    initLanguageToggle();
    initProfileModal();

    initFarmersCornerLoadMore();   // Farmer only
    showExpertInsightsAlways();    // Expert always visible

    initCategoryFilter();          // Farmer only
    initSearchFunctionality();     // Farmer only

    initReadPostModal();           // Read Post / Read Article
    initArticleModalClose();
    initNewsletter();
    initCreatePost();
});

/* ================= HEADER ================= */
function initHeader() {
    const header = document.querySelector(".blog-header-section");
    if (!header) return;

    window.addEventListener("scroll", () => {
        header.style.boxShadow =
            window.scrollY > 50
                ? "0 4px 15px rgba(0,0,0,.15)"
                : "0 2px 15px rgba(0,0,0,.05)";
    });
}

/* ================= MOBILE MENU ================= */
function initMobileMenu() {
    const toggle = document.getElementById("mobileToggle");
    const menu = document.getElementById("mobileMenu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        document.body.style.overflow = menu.classList.contains("active")
            ? "hidden"
            : "";

        toggle.querySelector("i").className =
            menu.classList.contains("active")
                ? "fas fa-times"
                : "fas fa-bars";
    });
}

/* ================= LANGUAGE ================= */
function initLanguageToggle() {
    const wrapper = document.getElementById("modernLangToggle");
    if (!wrapper) return;

    const btn = wrapper.querySelector(".modern-lang-btn");

    btn.addEventListener("click", e => {
        e.stopPropagation();
        wrapper.classList.toggle("active");
    });

    document.addEventListener("click", () =>
        wrapper.classList.remove("active")
    );
}

/* ================= PROFILE ================= */
function initProfileModal() {
    const wrapper = document.querySelector(".blog-profile-wrapper");
    const btn = document.getElementById("profileBtn");

    if (!wrapper || !btn) return;

    btn.addEventListener("click", e => {
        e.stopPropagation();
        wrapper.classList.toggle("active");
    });

    document.addEventListener("click", () =>
        wrapper.classList.remove("active")
    );
}

/* =========================================================
   FARMER’S CORNER LOAD MORE (MAIN REQUIREMENT)
   ========================================================= */
function initFarmersCornerLoadMore() {
    const farmerPosts = Array.from(
        document.querySelectorAll(".farmer-post")
    );
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    if (!farmerPosts.length || !loadMoreBtn) return;

    const STEP = 3;
    let visible = STEP;

    // Initial
    farmerPosts.forEach((post, index) => {
        post.style.display = index < visible ? "block" : "none";
    });

    if (farmerPosts.length <= STEP) {
        loadMoreBtn.style.display = "none";
        return;
    }

    loadMoreBtn.addEventListener("click", () => {
        visible += STEP;

        farmerPosts.forEach((post, index) => {
            if (index < visible) post.style.display = "block";
        });

        if (visible >= farmerPosts.length) {
            loadMoreBtn.style.display = "none";
        }
    });
}

/* ================= EXPERT INSIGHTS ================= */
function showExpertInsightsAlways() {
    document
        .querySelectorAll(".expert-articles-section .blog-post-card")
        .forEach(post => (post.style.display = "block"));
}

/* ================= CATEGORY FILTER (Farmer only) ================= */
function initCategoryFilter() {
    const categories = document.querySelectorAll(".blog-category-card");
    const farmerPosts = document.querySelectorAll(".farmer-post");

    if (!categories.length || !farmerPosts.length) return;

    categories.forEach(cat => {
        cat.addEventListener("click", () => {
            categories.forEach(c => c.classList.remove("active"));
            cat.classList.add("active");

            const key = cat.innerText.toLowerCase();

            farmerPosts.forEach(post => {
                const postCat = post.dataset.category || "";
                post.style.display =
                    key.includes("all") || postCat.includes(key)
                        ? "block"
                        : "none";
            });
        });
    });
}

/* ================= SEARCH (Farmer only) ================= */
function initSearchFunctionality() {
    const input = document.querySelector(".blog-search-box input");
    const btn = document.querySelector(".blog-search-btn");
    const farmerPosts = document.querySelectorAll(".farmer-post");

    if (!input || !btn || !farmerPosts.length) return;

    const search = () => {
        const term = input.value.toLowerCase();

        farmerPosts.forEach(post => {
            post.style.display = post.innerText
                .toLowerCase()
                .includes(term)
                ? "block"
                : "none";
        });
    };

    btn.addEventListener("click", search);
    input.addEventListener("keyup", e => e.key === "Enter" && search());
}

/* =========================================================
   READ POST / READ ARTICLE → MODAL (FINAL FIX)
   ========================================================= */
function initReadPostModal() {
    const modal = document.getElementById("articleModal");
    if (!modal) return;

    const modalTitle = document.getElementById("modalArticleTitle");
    const modalContent = document.getElementById("modalArticleContent");
    const modalImage = document.getElementById("modalPostImage");
    const modalAuthor = document.getElementById("modalAuthorName");
    const modalRole = document.getElementById("modalAuthorRole");
    const modalAuthorImg = document.getElementById("modalAuthorImg");

    document.querySelectorAll(".blog-read-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();

            modalTitle.textContent = btn.dataset.title || "Post";
            modalContent.textContent = btn.dataset.content || "";

            if (btn.dataset.image) {
                modalImage.src = btn.dataset.image;
                modalImage.style.display = "block";
            } else {
                modalImage.style.display = "none";
            }

            modalAuthor.textContent = btn.dataset.author || "Author";
            modalRole.textContent = btn.dataset.role || "";
            modalAuthorImg.src =
                "https://randomuser.me/api/portraits/men/85.jpg";

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });
}

/* ================= MODAL CLOSE ================= */
function initArticleModalClose() {
    const modal = document.getElementById("articleModal");
    if (!modal) return;

    modal.querySelector(".blog-modal-close").addEventListener("click", close);
    modal.addEventListener("click", e => e.target === modal && close);

    function close() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

/* ================= NEWSLETTER ================= */
function initNewsletter() {
    document
        .querySelectorAll(".blog-newsletter-form, .blog-footer-newsletter")
        .forEach(form => {
            form.addEventListener("submit", e => {
                e.preventDefault();
                alert("Subscribed successfully!");
                form.reset();
            });
        });
}

/* ================= CREATE POST MODAL ================= */
function initCreatePost() {
    const modal = document.getElementById("createPostModal");
    if (!modal) return;

    document.getElementById("headerCreateBtn")?.addEventListener("click", open);
    document.getElementById("sectionCreateBtn")?.addEventListener("click", open);
    document
        .getElementById("closeCreateModal")
        ?.addEventListener("click", close);
    document
        .getElementById("cancelCreateBtn")
        ?.addEventListener("click", close);

    function open() {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function close() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}
