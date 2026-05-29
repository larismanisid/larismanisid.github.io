const orderWrapper = document.getElementById("orderWrapper");
const totalPrice = document.getElementById("totalPrice");

let orders = JSON.parse(localStorage.getItem("orders")) || [];

function renderOrders() {
    orderWrapper.innerHTML = "";

    if (orders.length === 0) {
        orderWrapper.innerHTML = `

            <div class="empty-orders">

                <h3><i class="fa-solid fa-cart-shopping"></i> Belum ada pesanan</h3>

                <p>
                    Tambahkan menu dari halaman menu
                </p>

            </div>
        `;

        totalPrice.innerHTML = `<h3><strong>Total Harga: Rp 0</strong></h3>`;

        return;
    }

    let total = 0;

    totalPrice.innerHTML = "";

    orders.forEach((order, index) => {
        total += order.total;

        orderWrapper.innerHTML += `

            <div class="card">

                <div class="card-img">

                    <img
                        src="${order.image}"
                        alt="${order.name}"
                        loading="lazy">

                </div>

                <div class="card-content">

                    <h3>${order.name}</h3>

                    <div class="price">

                        <i class="fa-solid fa-tag"></i>

                        Rp ${order.price.toLocaleString("id-ID")}

                    </div>

                    <div class="desc">

                        Total:
                        Rp ${order.total.toLocaleString("id-ID")}

                    </div>

                    <input
                        type="number"
                        min="1"
                        value="${order.quantity}"
                        onchange="updateQuantity(${index}, this.value)"
                    >

                    <button
                        class="remove-btn"
                        onclick="removeOrder(${index})">

                        <i class="fa-solid fa-trash"></i>

                        Hapus Pesanan

                    </button>

                </div>

            </div>
        `;

        totalPrice.innerHTML += `<strong>${order.name} x ${order.quantity}</strong> = Rp ${order.total.toLocaleString("id-ID")}<br>`;
    });

    totalPrice.innerHTML += `<h3><strong>Total Harga: Rp ${total.toLocaleString("id-ID")}</strong></h3>`;
}

function updateQuantity(index, value) {
    const quantity = parseInt(value);

    if (!quantity || quantity < 1) {
        removeOrder(index);

        return;
    }

    orders[index].quantity = quantity;
    orders[index].total = orders[index].price * quantity;

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    renderOrders();
}

function removeOrder(index) {
    orders.splice(index, 1);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    renderOrders();
}

renderOrders();