let currentMenu = null;

function openOrderPrompt(name, price, image) {
    currentMenu = {
        name,
        price,
        image
    };

    document.getElementById("popupMenuName").innerText = `${name} • Rp ${price.toLocaleString("id-ID")}`;
    document.getElementById("orderPopup").classList.add("show");
}

function closeOrderPopup() {
    document.getElementById("orderPopup").classList.remove("show");
}

function confirmOrder() {
    const quantity = parseInt(document.getElementById("orderQuantity").value);

    if (!quantity || quantity < 1) {
        alert("Masukkan jumlah yang valid.");

        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    const existingOrder =orders.find(order => order.name === currentMenu.name);

    if (existingOrder) {
        existingOrder.quantity += quantity;
        existingOrder.total = existingOrder.price * existingOrder.quantity;
    } else {
        orders.push({
            name: currentMenu.name,
            price: currentMenu.price,
            image: currentMenu.image,
            quantity: quantity,
            total: currentMenu.price * quantity
        });
    }

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    closeOrderPopup();

    alert("Pesanan berhasil ditambahkan! 🎉");
}