function setupHorizontalScroll(wrapperId, leftBtnId, rightBtnId) {
    const wrapper = document.getElementById(wrapperId);

    if (!wrapper) return;

    const leftBtn = document.getElementById(leftBtnId);
    const rightBtn = document.getElementById(rightBtnId);
    
    if(leftBtn) {
        leftBtn.addEventListener("click", () => {
            wrapper.scrollBy({ left: -300, behavior: "smooth" });
        });
    }
    if(rightBtn) {
        rightBtn.addEventListener("click", () => {
            wrapper.scrollBy({ left: 300, behavior: "smooth" });
        });
    }
}